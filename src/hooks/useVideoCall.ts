import { CallState } from "@nepMeds/config/enum";
import { NepMedsResponse, api } from "@nepMeds/service/service-api";
import { HttpClient } from "@nepMeds/service/service-axios";
import { sendCallNotification } from "@nepMeds/service/nepmeds-notification";

//MOVE THESE TO SERVICE FILE
export interface IVideoCallInitiateResponse {
  token: string; // Twilio generated caller token
  room_name: string; // Twilio generated room name
  call_start_time: string; // Appointment time
}

const useVideoCall = () => {
  const getCallerToken = async (data: {
    caller_user: string;
    receiver_user: string;
    appointment_id: string;
    call_state: CallState;
  }) => {
    const response = await HttpClient.post<
      NepMedsResponse<IVideoCallInitiateResponse>
    >(api.videoCall.initiate(), data);
    return response.data;
  };

  const getReceiverToken = async (data: {
    receiver_user: string;
    room_name: string;
    call_state: CallState;
  }) => {
    const response = await HttpClient.post<
      NepMedsResponse<IVideoCallInitiateResponse>
    >(api.videoCall.receive(), data);
    return response.data;
  };

  const endCallForUsers = async (data: {
    room_name: string;
    call_state: CallState;
  }) => {
    await HttpClient.post<NepMedsResponse<IVideoCallInitiateResponse>>(
      api.videoCall.end(),
      data
    );
  };
  const rejectCall = async (data: {
    room_name: string;
    call_state: CallState;
  }) => {
    await HttpClient.post<NepMedsResponse<IVideoCallInitiateResponse>>(
      api.videoCall.reject(),
      data
    );
  };

  return {
    getCallerToken,
    getReceiverToken,
    endCallForUsers,
    rejectCall,
    sendCallNotification,
  };
};

export default useVideoCall;
