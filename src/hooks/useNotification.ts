import { NotificationType } from "@nepMeds/config/enum";
import { PUSHER_KEY, PUSHER_SUBSCRIBE_CHANNEL } from "@nepMeds/config/index";
import pusherJs from "pusher-js";

export interface IPusherNotification {
  message: string;
  id: string;
  notification_type: NotificationType;
  room_name?: string;
  doctor?: {
    doctor_name: string;
    doctor_image: string | null;
  };
  is_missed?: boolean;
}

export const useNotification = () => {
  const pusher = new pusherJs(PUSHER_KEY, {
    cluster: "ap2",
  });
  const channel = pusher.subscribe(PUSHER_SUBSCRIBE_CHANNEL);

  return channel;
};
