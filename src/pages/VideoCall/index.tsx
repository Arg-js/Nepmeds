import { Badge, Box, Flex, Icon, Tooltip } from "@chakra-ui/react";
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
import { useEffect } from "react";
import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import * as Video from "twilio-video";
import Participant from "./Participants";

const VideoCall = () => {
  const {
    getCallerToken,
    getReceiverToken,
    endCallForUsers,
    sendCallNotification,
  } = useVideoCallToken();
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
  } = useVideoCallState({ state });
  const navigate = useNavigate();
  const second = useTimerFromTime(new Date(call_start_time));

  const remoteParticipants = participants.map(
    (participant: Video.RemoteParticipant, i: number) => (
      <Participant key={participant.sid + i} participant={participant} />
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
      if (state?.appointment_id) {
        const res = await getCallerToken({
          ...state,
        });

        setRoomDetail(res.data);
      } else {
        const res = await getReceiverToken({
          receiver_user: state?.receiver_user,
          room_name: room_name,
          call_state: CallState.ACCEPTED,
        });
        setRoomDetail(res.data);
      }
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

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    if (room && state?.appointment_id) {
      sendNotification();
    }
  }, [room, state?.appointment_id]);

  useEffect(() => {
    if (second === 900 && room) {
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
    <Box>
      <Flex justifyContent={"flex-start"} pb={"15px"} pr={"50px"} mt={"1%"}>
        <svgs.logo />
      </Flex>

      {!room && <CenterLoader h="100vh" alignItems={"center"} />}
      <Flex justifyContent={"center"} gap={10}>
        <Box>
          {room && (
            <Participant
              key={room.localParticipant.sid}
              participant={room.localParticipant}
            />
          )}
        </Box>
        <Box>{remoteParticipants}</Box>
      </Flex>
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
          {formatSecondsToMinuteAndSeconds(second)}
        </Badge>
      </Flex>

      {room && (
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
                    room.localParticipant.videoTracks.forEach(publication => {
                      publication.track.disable();
                    });
                    setShowVideo(false);
                  } else {
                    room.localParticipant.videoTracks.forEach(publication => {
                      publication.track.enable();
                    });
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
                    room.localParticipant.audioTracks.forEach(publication => {
                      publication.track.disable();
                    });
                    setShowAudio(false);
                  } else {
                    room.localParticipant.audioTracks.forEach(publication => {
                      publication.track.enable();
                    });
                    setShowAudio(true);
                  }
                }}
              />
            </span>
          </Tooltip>
        </Flex>
      )}
    </Box>
  );
};

export default VideoCall;
