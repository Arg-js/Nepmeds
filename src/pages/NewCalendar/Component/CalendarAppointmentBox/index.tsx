import { Badge, Box } from "@chakra-ui/react";
import { IAvailabilityBookingInfo } from "@nepMeds/service/nepmeds-doctor-availability";
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
  bookingInfo: IAvailabilityBookingInfo | undefined;
}

const blockGap = {
  "0": "5px",
  "25%": "30px",
  "50%": "65.5px",
  "75%": "99px",
};

const CalendarAppointmentBox: React.FC<ICalendarAppointmentBox> = ({
  handleEdit,
  leftPosition,
  timeObject,
  bookingInfo,
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
      onClick={() => isAvailableBlock && handleEdit(timeObject?.id ?? 0)}
      style={{ cursor: isAvailableBlock ? "pointer" : "default" }}
    >
      {isAvailableBlock && bookingInfo && (
        <Badge
          color={"white"}
          bg={!bookingInfo?.is_appointment ? colors.primary : colors.main}
          marginX={1}
          height={"32px"}
          alignItems={"center"}
          mt={` ${blockGap[leftPosition as keyof typeof blockGap]}`}
        >
          {bookingInfo?.patient_name}
        </Badge>
      )}
    </Box>
  );
};

export default CalendarAppointmentBox;
