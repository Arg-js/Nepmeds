import { CallState } from "@nepMeds/config/enum";
import { NepMedsResponse, api } from "@nepMeds/service/service-api";
import { HttpClient } from "@nepMeds/service/service-axios";
import { sendCallNotification } from "@nepMeds/service/nepmeds-notification";
import { generatePath } from "react-router-dom";

//MOVE THESE TO SERVICE FILE
export interface IVideoCallInitiateResponse {
  token: string; // Twilio generated caller token
  room_name: string; // Twilio generated room name
  call_start_time: string; // Appointment time
}

export interface IRoomUsersInfo {
  patient: {
    name: string;
    profile_picture: string;
  };
  doctor: {
    doctor_name: string;
    profile_picture: string;
    specialization: string[];
    nmc_number: string;
  };
  symptoms: string[];
  description: string;
  old_reports: string;
  follow_up: string;
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

  const getDoctorPatientInfo = async (data: { room_name: string }) => {
    return await HttpClient.get<NepMedsResponse<IRoomUsersInfo>>(
      generatePath(api.videoCall.getRoomInfo(), { id: data.room_name })
    );
  };

  return {
    getCallerToken,
    getReceiverToken,
    endCallForUsers,
    rejectCall,
    sendCallNotification,
    getDoctorPatientInfo,
  };
};

export default useVideoCall;
