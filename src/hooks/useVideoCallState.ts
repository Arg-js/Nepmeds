import { useState } from "react";
import Video from "twilio-video";
import { IVideoCallInitiateResponse } from "./useVideoCall";

const useVideoCallState = ({ state }: { state?: any }) => {
  const [participants, setParticipants] = useState<Video.RemoteParticipant[]>(
    []
  );
  const [room, setRoom] = useState<Video.Room | null>();

  const [roomDetail, setRoomDetail] = useState<IVideoCallInitiateResponse>({
    call_start_time: "",
    room_name: state?.room_name ?? "",
    token: "",
  });

  const [showVideo, setShowVideo] = useState(true);
  const [showAudio, setShowAudio] = useState(true);

  return {
    participants,
    setParticipants,
    room,
    setRoom,
    roomDetail,
    setRoomDetail,

    showVideo,
    setShowVideo,
    showAudio,
    setShowAudio,
  };
};

export default useVideoCallState;
