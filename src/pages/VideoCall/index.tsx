import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import CenterLoader from "@nepMeds/components/Common/Loader";
import { toastInfo } from "@nepMeds/components/Toast";
import { CallState } from "@nepMeds/config/enum";
import { useTimerFromTime } from "@nepMeds/hooks/useTimer";
import useVideoCallToken from "@nepMeds/hooks/useVideoCall";
import useVideoCallState from "@nepMeds/hooks/useVideoCallState";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { toastFail } from "@nepMeds/service/service-toast";
import { colors } from "@nepMeds/theme/colors";
import { formatSecondsToMinuteAndSeconds } from "@nepMeds/utils/time";
import { useCallback, useEffect, useState } from "react";
import {
  MdCallEnd,
  MdFullscreen,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdOutlineUpload,
  MdAddCircleOutline,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import * as Video from "twilio-video";
import Participant from "./Participants";
import "./VideoPlayer.css";
import RemoteParticipants from "./RemoteParticipant";
import PrescriptionImageModal from "./Prescription/PrescriptionImageModal";
import ViewPatientDetails from "./Prescription/ViewPatientDetails";
import PrescriptionModal from "./Prescription/PrescriptionModal";

const VideoCall = () => {
  const {
    getCallerToken,
    getReceiverToken,
    endCallForUsers,
    sendCallNotification,
    getDoctorPatientInfo,
    getCallerTokenFollowUp,
  } = useVideoCallToken();

  // TODO: Remove any type with location type
  const { state }: any = useLocation();

  const {
    participants,
    room,
    roomDetail: { call_start_time, room_name, token },
    setRoomDetail,
    setParticipants,
    setRoom,
    setShowVideo,
    showVideo,
    setShowAudio,
    showAudio,
    isAudioEnabled,
    isVideoEnabled,
    setIsAudioEnabled,
    setIsVideoEnabled,
    videoRef,
    setUsersInfo,
    usersInfo,
  } = useVideoCallState({ state });
  const navigate = useNavigate();
  const second = useTimerFromTime(new Date(call_start_time));
  const [modalOpen, setModalOpen] = useState({
    prescriptionSet: false,
    prescriptionImage: false,
    prescriptionView: false,
    oldPrescription: false,
  });

  const isPatient = !state?.appointment_id && !state?.follow_up_id;
  const isDoctor = !!state?.appointment_id || !!state?.follow_up_id;

  const closePrescriptionModal = useCallback(() => {
    setModalOpen({
      prescriptionSet: false,
      prescriptionImage: false,
      prescriptionView: false,
      oldPrescription: false,
    });
  }, [modalOpen]);

  const openPrescriptionModal = (
    modalType: "view" | "add" | "image" | "old"
  ) => {
    // only make give state true and other state false
    const initialState = {
      prescriptionSet: false,
      prescriptionImage: false,
      prescriptionView: false,
      oldPrescription: false,
    };

    if (modalType === "view") {
      setModalOpen({ ...initialState, prescriptionView: true });
    } else if (modalType === "add") {
      setModalOpen({ ...initialState, prescriptionSet: true });
    } else if (modalType === "image") {
      setModalOpen({ ...initialState, prescriptionImage: true });
    } else if (modalType === "old") {
      setModalOpen({ ...initialState, oldPrescription: true });
    }
  };

  const remoteParticipants = participants.map(
    (participant: Video.RemoteParticipant, i: number) => (
      <RemoteParticipants
        key={participant.sid + i}
        participant={participant}
        isAudioEnabled={isAudioEnabled}
        isVideoEnabled={isVideoEnabled}
        setIsAudioEnabled={setIsAudioEnabled}
        setIsVideoEnabled={setIsVideoEnabled}
        videoRef={videoRef}
        usersInfo={usersInfo}
        isDoctor={isDoctor}
        isPrescriptionOpen={Object.values(modalOpen).includes(true)}
      />
    )
  );

  const participantConnected = (participant: Video.RemoteParticipant) => {
    setParticipants(prevParticipants => [...prevParticipants, participant]);
  };
  const participantDisconnected = (participant: Video.RemoteParticipant) => {
    setParticipants(prevParticipants =>
      prevParticipants.filter(p => p !== participant)
    );
  };

  const endCall = async (room: Video.Room) => {
    // Need to set state as false because when ending call, the modal still remains open
    setModalOpen({
      prescriptionImage: false,
      prescriptionSet: false,
      prescriptionView: false,
      oldPrescription: false,
    });
    try {
      setRoom(null);
      setParticipants([]);
      await endCallForUsers({
        call_state: CallState.COMPLETED,
        room_name: room_name,
      });
      room.disconnect();
    } catch (error) {
      console.error(error);
    }
  };

  const apiCall = async () => {
    try {
      let room_detail = state?.room_name;

      if (state?.appointment_id && !state?.follow_up_id) {
        const res = await getCallerToken({
          ...state,
        });

        setRoomDetail(() => res.data);
        room_detail = res.data.room_name;
      } else if (isPatient) {
        const res = await getReceiverToken({
          receiver_user: state?.receiver_user,
          room_name: room_name,
          call_state: CallState.ACCEPTED,
        });
        setRoomDetail(() => res.data);
        room_detail = res.data.room_name;
      } else if (state?.follow_up_id && !state?.appointment_id) {
        const res = await getCallerTokenFollowUp({
          ...state,
        });
        setRoomDetail(() => res.data);
        room_detail = res.data.room_name;
      }
      const res = await getDoctorPatientInfo({ room_name: room_detail });
      setUsersInfo(res.data.data);
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
      navigate(-1);
    }
  };

  const sendNotification = async () => {
    try {
      await sendCallNotification({
        caller_user: state?.caller_user,
        receiver_user: state?.receiver_user,
        room_name: room_name,
      });
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
  };

  // Toggle full screen video
  const toggleFullScreen = () => {
    const video = videoRef.current;

    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    if (room && (state?.appointment_id || state?.follow_up_id)) {
      sendNotification();
    }
  }, [room, state?.appointment_id, state?.follow_up_id]);

  useEffect(() => {
    if (second === 899 && room && state?.appointment_id) {
      endCall(room);
    } else if (second === 780) {
      toastInfo("Call about to end!!");
    }
  }, [second]);

  useEffect(() => {
    if (room_name && token) {
      Video.connect(token, { name: room_name }).then(
        room => {
          setRoom(room);

          room.on("participantConnected", participantConnected);
          room.on("participantDisconnected", participantDisconnected);
          room.participants.forEach(participantConnected);

          room.on("disconnected", () => {
            navigate(-1);
          });
        },
        error => {
          console.error(`Unable to connect to Room: ${error.message}`);
        }
      );
    }

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [room_name, token]);

  return (
    <Box
      position={"relative"}
      overflowX={"hidden"}
      display={"flex"}
      flexDirection={"column"}
      height={"100vh"}
    >
      <Flex justifyContent={"flex-start"} pb={"15px"} pr={"50px"} mt={"1%"}>
        <svgs.logo />
      </Flex>
      {!room && <CenterLoader h="100vh" alignItems={"center"} />}

      <Flex
        gap={5}
        justifyContent={"center"}
        maxW={Object.values(modalOpen).includes(true) ? "100%" : "90%"}
        margin={"auto"}
      >
        {room && (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            usersInfo={usersInfo}
            isDoctor={isDoctor}
            isPrescriptionOpen={Object.values(modalOpen).includes(true)}
          />
        )}
        {remoteParticipants}
        {modalOpen.oldPrescription && (
          <PrescriptionModal
            onClose={closePrescriptionModal}
            isEditable={false}
          />
        )}
        {modalOpen.prescriptionSet && (
          <PrescriptionModal onClose={closePrescriptionModal} />
        )}
        {modalOpen.prescriptionImage && (
          <PrescriptionImageModal onClose={closePrescriptionModal} />
        )}
        {modalOpen.prescriptionView && (
          <ViewPatientDetails
            userDetail={usersInfo}
            onClose={closePrescriptionModal}
          />
        )}
      </Flex>

      <Box marginTop={"auto"}>
        <Flex justifyContent={"center"} my={"3"}>
          <Badge
            justifyContent={"center"}
            textAlign={"center"}
            rounded="2xl"
            fontWeight={"bold"}
            fontSize={"xl"}
            variant="outline"
            colorScheme="green"
          >
            {formatSecondsToMinuteAndSeconds(second < 0 ? 0 : second) ||
              "00:00"}
          </Badge>
        </Flex>

        {room && (
          <Grid templateColumns={"repeat(3,1fr)"}>
            <GridItem colStart={1}>
              {remoteParticipants.length > 0 && isDoctor && (
                <Flex gap={1} justifyContent={"end"} mt={1} mr={"4%"}>
                  <Button
                    onClick={() => openPrescriptionModal("add")}
                    backgroundColor={colors.primary}
                    gap={2}
                  >
                    <MdOutlineUpload fontSize={"md"} />
                    <Text fontSize={"md"} fontWeight={400}>
                      Add Prescription
                    </Text>
                  </Button>

                  <Button
                    onClick={() => openPrescriptionModal("image")}
                    backgroundColor={colors.primary}
                    gap={2}
                  >
                    <MdAddCircleOutline fontSize={"md"} />
                    <Text fontSize={"md"} fontWeight={400}>
                      Add Prescription Image
                    </Text>
                  </Button>
                </Flex>
              )}
            </GridItem>
            <GridItem colStart={2}>
              <Flex justifyContent={"center"} gap={6} mt={3}>
                <Tooltip label="End Call" fontSize="md" hasArrow>
                  <span>
                    <Icon
                      as={MdCallEnd}
                      color={colors.white}
                      fontSize={"50"}
                      bg={"red"}
                      borderRadius={"50%"}
                      p={"2"}
                      cursor={"pointer"}
                      onClick={() => endCall(room)}
                    />
                  </span>
                </Tooltip>

                <Tooltip
                  label={showVideo ? "Turn Camera Off" : "Turn Camera On"}
                  fontSize="md"
                  hasArrow
                >
                  <span>
                    <Icon
                      cursor={"pointer"}
                      as={showVideo ? MdVideocam : MdVideocamOff}
                      color={colors.white}
                      fontSize={"50"}
                      bg={colors.primary_blue}
                      borderRadius={"50%"}
                      p={"2"}
                      onClick={() => {
                        if (showVideo) {
                          room.localParticipant.videoTracks.forEach(
                            publication => {
                              publication.track.disable();
                            }
                          );
                          setShowVideo(false);
                        } else {
                          room.localParticipant.videoTracks.forEach(
                            publication => {
                              publication.track.enable();
                            }
                          );
                          setShowVideo(true);
                        }
                      }}
                    />
                  </span>
                </Tooltip>

                <Tooltip
                  label={showAudio ? "Mute Audio" : "Unmute Audio"}
                  fontSize="md"
                  hasArrow
                >
                  <span>
                    <Icon
                      cursor={"pointer"}
                      color={colors.white}
                      fontSize={"50"}
                      bg={colors.primary_blue}
                      borderRadius={"50%"}
                      p={"2"}
                      as={showAudio ? MdMic : MdMicOff}
                      onClick={() => {
                        if (showAudio) {
                          room.localParticipant.audioTracks.forEach(
                            publication => {
                              publication.track.disable();
                            }
                          );
                          setShowAudio(false);
                        } else {
                          room.localParticipant.audioTracks.forEach(
                            publication => {
                              publication.track.enable();
                            }
                          );
                          setShowAudio(true);
                        }
                      }}
                    />
                  </span>
                </Tooltip>

                {remoteParticipants.length > 0 && (
                  <Tooltip label="Full Screen" fontSize="md" hasArrow>
                    <span>
                      <Icon
                        as={MdFullscreen}
                        color={colors.black}
                        fontSize={"50"}
                        borderRadius={"50%"}
                        p={"2"}
                        cursor={"pointer"}
                        onClick={toggleFullScreen}
                      />
                    </span>
                  </Tooltip>
                )}
              </Flex>
            </GridItem>
            <GridItem colStart={3}>
              {remoteParticipants.length > 0 && isDoctor && (
                <Flex gap={1} mt={1} mr={"4%"} justifyContent={"flex-end"}>
                  {!!state?.follow_up_id && (
                    <Button
                      onClick={() => openPrescriptionModal("old")}
                      gap={2}
                      variant={"primaryOutline"}
                    >
                      <MdOutlineRemoveRedEye fontSize={"md"} />
                      <Text fontSize={"md"} fontWeight={400}>
                        View Prescription
                      </Text>
                    </Button>
                  )}
                  <Button
                    onClick={() => openPrescriptionModal("view")}
                    gap={2}
                    variant={"primaryOutline"}
                  >
                    <MdOutlineRemoveRedEye fontSize={"md"} />
                    <Text fontSize={"md"} fontWeight={400}>
                      View Symptoms
                    </Text>
                  </Button>
                </Flex>
              )}
            </GridItem>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default VideoCall;
