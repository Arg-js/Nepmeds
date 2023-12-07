import { IGetDoctorAvailability } from "@nepMeds/service/nepmeds-doctor-availability";
import { isSameDay, parseISO } from "date-fns";

export const boxPositions = ["0", "25%", "50%", "75%"];

export const minuteTime = {
  "0": "00",
  "25%": "15",
  "50%": "30",
  "75%": "45",
};

export const ListOfTimeObject = (
  availabilityData: IGetDoctorAvailability[] | undefined,
  selectedFullDate: string
) => {
  return availabilityData
    ?.filter(event => {
      if (event.date) {
        const todayEvent = isSameDay(
          parseISO(event.date),
          parseISO(selectedFullDate)
        );

        return todayEvent;
      } else if (event.frequency === "Daily") {
        return true;
      }

      return false;
    })
    .flatMap(item => {
      return {
        id: item?.id,
        timeFrame: item?.child_time_frames?.map(childFrame =>
          childFrame?.from_time.slice(0, -3)
        ),
      };
    });
};

export const ListOfChildTimeFrame = (
  availabilityData: IGetDoctorAvailability[] | undefined,
  selectedFullDate: string
): IGetDoctorAvailability["child_time_frames"] | undefined => {
  return availabilityData
    ?.filter(event => {
      if (event.date) {
        const todayEvent = isSameDay(
          parseISO(event.date),
          parseISO(selectedFullDate)
        );

        return todayEvent;
      } else if (event.frequency === "Daily") {
        return true;
      }

      return false;
    })
    .map(e => e.child_time_frames)[0];
};
