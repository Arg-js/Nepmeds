import { IVideoCallInitiateResponse } from "@nepMeds/hooks/useVideoCall";
import { NepMedsResponse, PaginatedResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";
import { NotificationType } from "@nepMeds/config/enum";
import { useQuery } from "react-query";

const sendCallNotification = async (data: {
  caller_user: string;
  receiver_user: string;
  room_name: string;
}) => {
  await HttpClient.post<NepMedsResponse<IVideoCallInitiateResponse>>(
    api.notification.sendCallNotification(),
    data,
  );
};

export interface INotification {
  call_notification?: {
    is_callable: boolean;
    room_name: string;
  }[];
  id: number;
  user: string;
  content: string;
  created_at: string;
  type: NotificationType;
}

const getAllNotification = async () => {
  const response = await HttpClient.get<PaginatedResponse<INotification>>(
    api.notification.getAll(),
  );
  return response.data;
};

const useGetAllNotification = () => {
  return useQuery([api.notification.getAll()], getAllNotification, {
    select: data => data.data.results,
  });
};

export { sendCallNotification, useGetAllNotification };
