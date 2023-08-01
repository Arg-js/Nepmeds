import { Box } from "@chakra-ui/react";
import {
  findTimeRange,
  getHour,
  getMinutes,
  splitTimeRange,
} from "@nepMeds/helper/checkTimeRange";
import { IGetDoctorAvailability } from "@nepMeds/service/nepmeds-doctor-availability";
import { colors } from "@nepMeds/theme/colors";

// TODO
const boxStyle: React.CSSProperties = {
  height: "138px",
  backgroundColor: "transparent",
  border: `1px solid ${colors.gray}`,
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  width: "25%",
  alignItems: "center",
  justifyContent: "center",
};
interface ICalendarAppointmentBox {
  eventData: IGetDoctorAvailability;
  handleEdit: (id: number) => void;
  handleDeleteModal: (id: number) => void;
  //   TODO: set an enum
  leftPosition: string;
  time: string;
}
const CalendarAppointmentBox: React.FC<ICalendarAppointmentBox> = ({
  eventData,
  handleEdit,
  leftPosition,
  time,
}) => {
  let showBox;
  let timeRange: string[] = [];

  const timeInterval = splitTimeRange(
    eventData.from_time as string,
    eventData.to_time as string
  );
  timeRange = findTimeRange(time, timeInterval) as string[];

  if (timeRange?.length) {
    const fromHour = getHour(timeRange[0] as string);
    // const toHour = getHour(timeRange[1] as string);

    const minutes = getMinutes(timeRange[1] as string).toString();
    const fromMinutes = getMinutes(timeRange[0] as string).toString();
    showBox =
      (["0"].includes(fromMinutes) &&
        ["15", "30", "45", "0"].includes(minutes) &&
        leftPosition === "0") ||
      (["0", "15"].includes(fromMinutes) &&
        ["30", "45", "0"].includes(minutes) &&
        leftPosition === "25%") ||
      (["0", "15", "30"].includes(fromMinutes) &&
        ["45", "0"].includes(minutes) &&
        leftPosition === "50%") ||
      (fromHour !== getHour(timeRange[1] as string) &&
        leftPosition === "75%") ||
      (["0", "15", "30", "45"].includes(fromMinutes) &&
        ["0"].includes(minutes) &&
        leftPosition === "75%");
  }

  if (!showBox) {
    return (
      <Box
        style={{ ...boxStyle, left: leftPosition }}
        key={Math.random() + new Date().getTime()}
      />
    );
  }

  return (
    <Box
      height={"138px"}
      bg={colors.sky_blue}
      border={`1px solid ${colors.gray}`}
      display={"flex"}
      flexDirection={"column"}
      position="absolute"
      width={"25%"}
      left={leftPosition}
      alignItems={"center"}
      justifyContent={"center"}
      onClick={() => handleEdit(eventData.id ?? 0)}
    />
  );
};

export default CalendarAppointmentBox;
