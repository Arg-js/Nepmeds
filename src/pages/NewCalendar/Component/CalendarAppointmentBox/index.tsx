import { Box } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

interface ICalendarAppointmentBox {
  handleEdit: (id: number) => void;
  handleDeleteModal: (id: number) => void;
  leftPosition: string;
  time: string;
  timeObject:
    | {
        id: 0 | undefined;
        timeFrame: string[] | undefined;
      }
    | undefined;
}
const CalendarAppointmentBox: React.FC<ICalendarAppointmentBox> = ({
  handleEdit,
  leftPosition,
  timeObject,
}) => {
  const isAvailableBlock = Object.keys(timeObject ?? {}).length > 0;

  return (
    <Box
      height={"138px"}
      bg={isAvailableBlock ? colors.sky_blue : "transparent"}
      border={`1px solid ${colors.gray}`}
      display={"flex"}
      flexDirection={"column"}
      position="absolute"
      width={"25%"}
      left={leftPosition}
      alignItems={"center"}
      justifyContent={"center"}
      onClick={() => isAvailableBlock && handleEdit(timeObject?.id ?? 0)}
      style={{ cursor: isAvailableBlock ? "pointer" : "default" }}
    />
  );
};

export default CalendarAppointmentBox;
