import { AspectRatio, Badge, Box, Flex, Text } from "@chakra-ui/react";
import { IRoomUsersInfo } from "@nepMeds/hooks/useVideoCall";
import { useEffect, useRef, useState } from "react";
import { LocalParticipant } from "twilio-video";

const Participant = ({
  participant,
  usersInfo,
  isDoctor,
}: {
  participant: LocalParticipant;
  isDoctor?: boolean;
  usersInfo: IRoomUsersInfo | undefined;
}) => {
  const [videoTracks, setVideoTracks] = useState<any>([]);
  const [audioTracks, setAudioTracks] = useState<any>([]);

  //Reference to the video and audio element and attach the track to the element
  const videoRef = useRef(null);
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

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.videoTracks.forEach(publication => {
        publication.track.stop();
        publication.unpublish();
      });
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
        width={"45vw"}
        borderRadius={"10px"}
        overflow={"hidden"}
      >
        <video ref={videoRef} autoPlay={true} />
      </AspectRatio>
      <Flex flexDirection={"column"} justifyContent={"start"}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          {isDoctor ? usersInfo?.doctor.doctor_name : usersInfo?.patient.name}
        </Text>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          {isDoctor && usersInfo?.doctor.nmc_number}
        </Text>
        <Box>
          {isDoctor &&
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
      </Flex>

      <audio ref={audioRef} autoPlay={true} />
    </Box>
  );
};

export default Participant;
