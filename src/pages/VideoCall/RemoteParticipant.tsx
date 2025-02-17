import { AspectRatio, Badge, Box, Flex, Icon, Text } from "@chakra-ui/react";
import { IRoomUsersInfo } from "@nepMeds/hooks/useVideoCall";
import { colors } from "@nepMeds/theme/colors";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdMicOff, MdVideocamOff } from "react-icons/md";
import { RemoteParticipant } from "twilio-video";
import { appendServerUrl } from "@nepMeds/utils/getImageUrl";

// Here <Participants> and <Remoteparticipant> have same code
// It was not possible to make a common component for both of them
// because there is no distiction between remote pariticipant and local participant

const RemoteParticipants = ({
  participant,
  isAudioEnabled,
  isVideoEnabled,
  setIsAudioEnabled,
  setIsVideoEnabled,
  videoRef,
  usersInfo,
  isDoctor,
  isPrescriptionOpen,
}: {
  participant: RemoteParticipant;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  setIsAudioEnabled: Dispatch<SetStateAction<boolean>>;
  setIsVideoEnabled: Dispatch<SetStateAction<boolean>>;
  usersInfo: IRoomUsersInfo | undefined;
  isDoctor?: boolean;
  isPrescriptionOpen?: boolean;
}) => {
  const [videoTracks, setVideoTracks] = useState<any>([]);
  const [audioTracks, setAudioTracks] = useState<any>([]);

  //Reference to the video and audio element and attach the track to the element
  const audioRef = useRef(null);

  // We need to handle the fact that TrackPublication objects, obtained from the participant's videoTracks and audioTracks properties,
  // don't have immediate access to their corresponding track objects until they are subscribed. Therefore, we create a function that performs the following tasks:
  // 1. Maps from TrackPublications to Tracks, aiming to access the actual track objects.
  // 2. Filters out any tracks that may be null or non-existent during this process.

  const trackpubsToTracks = (trackMap: any) =>
    Array.from(trackMap.values())
      .map((publication: any) => publication.track)
      .filter(track => track !== null);

  useEffect(() => {
    // Check if the participant is connect and check if the track is video or audio
    // and add track to the state
    const trackSubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks: any) => [...videoTracks, track]);
      } else {
        setAudioTracks((audioTracks: any) => [...audioTracks, track]);
      }
    };

    // Check if the participant is disconnected and check if the track is video or audio
    // and remove track from the state
    const trackUnsubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks: any) =>
          videoTracks.filter((v: any) => v !== track)
        );
      } else {
        setAudioTracks((audioTracks: any) =>
          audioTracks.filter((a: any) => a !== track)
        );
      }
    };
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    // Listen on the participant for the trackSubscribed and trackUnsubscribed events
    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);
    participant.on("trackDisabled", e => {
      if (e.kind === "video") {
        setIsVideoEnabled(!isVideoEnabled);
      } else if (e.kind === "audio") {
        setIsAudioEnabled(!isAudioEnabled);
      }
    });
    participant.on("trackEnabled", e => {
      if (e.kind === "video") {
        setIsVideoEnabled(true);
      } else if (e.kind === "audio") {
        setIsAudioEnabled(true);
      }
    });

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];

    // Attach the video track to the videoRef element
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];

    // Attach the audio track to the audioRef element
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <Box>
      <AspectRatio
        ratio={16 / 9}
        width={isPrescriptionOpen ? "36vw" : "45vw"}
        borderRadius={"10px"}
        overflow={"hidden"}
      >
        <video
          ref={videoRef}
          autoPlay={true}
          poster={appendServerUrl(
            (!isDoctor
              ? usersInfo?.doctor?.profile_picture
              : usersInfo?.patient?.profile_picture) ?? ""
          )}
        />
      </AspectRatio>

      <Flex flexDirection={"column"} alignItems={"end"} gap={1}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          {!isDoctor ? usersInfo?.doctor.doctor_name : usersInfo?.patient.name}
        </Text>

        {!isDoctor && (
          <Box display={"flex"} gap={3} alignItems={"center"}>
            <Text fontWeight={"bold"}>NMC Number:</Text>
            <Text fontSize={"xl"}>{usersInfo?.doctor.nmc_number}</Text>
          </Box>
        )}
        <Box>
          {!isDoctor &&
            usersInfo?.doctor.specialization.map(e => (
              <Badge
                key={e}
                borderRadius={"lg"}
                colorScheme={"green"}
                px={2}
                m={1}
              >
                {e}
              </Badge>
            ))}
        </Box>

        <Flex gap={5}>
          {!isVideoEnabled && (
            <Icon
              cursor={"pointer"}
              as={MdVideocamOff}
              color={colors.white}
              fontSize={"50"}
              bg={colors.primary_blue}
              borderRadius={"50%"}
              p={"2"}
            />
          )}

          {!isAudioEnabled && (
            <Icon
              cursor={"pointer"}
              as={MdMicOff}
              color={colors.white}
              fontSize={"50"}
              bg={colors.primary_blue}
              borderRadius={"50%"}
              p={"2"}
            />
          )}
        </Flex>
      </Flex>
      <audio ref={audioRef} autoPlay={true} />
    </Box>
  );
};

export default RemoteParticipants;
