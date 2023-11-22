import { useRef, useState } from "react";
import Video from "twilio-video";
import { IRoomUsersInfo, IVideoCallInitiateResponse } from "./useVideoCall";

const useVideoCallState = ({ state }: { state?: any }) => {
  const [participants, setParticipants] = useState<Video.RemoteParticipant[]>(
    []
  );
  const [room, setRoom] = useState<Video.Room | null>();

  const [roomDetail, setRoomDetail] = useState<IVideoCallInitiateResponse>({
    call_start_time: "",
    room_name: state?.room_name ?? "",
    token: ""
  });

  const [showVideo, setShowVideo] = useState(true);
  const [showAudio, setShowAudio] = useState(true);

  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const [usersInfo, setUsersInfo] = useState<IRoomUsersInfo | undefined>();

  const videoRef = useRef<HTMLVideoElement>(null);

  return {
    participants,
    setParticipants,
    room,
    setRoom,
    roomDetail,
    setRoomDetail,
    videoRef,
    showVideo,
    setShowVideo,
    showAudio,
    setShowAudio,

    isAudioEnabled,
    isVideoEnabled,
    setIsAudioEnabled,
    setIsVideoEnabled,

    setUsersInfo,
    usersInfo
  };
};

export default useVideoCallState;
