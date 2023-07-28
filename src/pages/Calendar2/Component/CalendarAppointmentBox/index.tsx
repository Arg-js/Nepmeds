import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { getHour, getMinutes } from "@nepMeds/helper/checkTimeRange";
import { IGetDoctorAvailability } from "@nepMeds/service/nepmeds-doctor-availability";
import { colors } from "@nepMeds/theme/colors";
import React from "react";

interface ICalendarAppointmentBox {
  eventData: IGetDoctorAvailability;
  handleEdit: (id: number) => void;
  handleDeleteModal: (id: number) => void;
  //   TODO: set an enum
  leftPosition: string;
}
const CalendarAppointmentBox: React.FC<ICalendarAppointmentBox> = ({
  eventData,
  handleEdit,
  handleDeleteModal,
  leftPosition,
}) => {
  const minutes = getMinutes(eventData.to_time as string).toString();
  const fromMinutes = getMinutes(eventData.from_time as string).toString();
  const fromHour = getHour(eventData.from_time as string);

  const showBox =
    (["15", "30", "45", "0"].includes(minutes) &&
      ["0"].includes(fromMinutes) &&
      leftPosition === "0") ||
    (["30", "45", "0"].includes(minutes) &&
      ["0", "15"].includes(fromMinutes) &&
      leftPosition === "25%") ||
    (["45", "0"].includes(minutes) &&
      ["0", "15", "30"].includes(fromMinutes) &&
      leftPosition === "50%") ||
    (fromHour !== getHour(eventData.to_time as string) &&
      leftPosition === "75%") ||
    (["0"].includes(minutes) &&
      ["0", "15", "30", "45"].includes(fromMinutes) &&
      leftPosition === "75%");

  if (!showBox) {
    return null;
  }

  return (
    <Box
      height={"145px"}
      bg={colors.sky_blue}
      border={`1px solid ${colors.gray}`}
      display={"flex"}
      flexDirection={"column"}
      position="absolute"
      width={"25%"}
      left={leftPosition}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Text
        mt={2}
        fontSize={"12px"}
        lineHeight={"15px"}
        color={colors.grey_dark}
      >
        {eventData.from_time}........{eventData.to_time}
      </Text>
      <Box position={"absolute"} top={2} right={2}>
        <EditIcon
          color={colors.green_button}
          cursor={"pointer"}
          onClick={() => handleEdit(eventData.id ?? 0)}
        />
        <DeleteIcon
          cursor={"pointer"}
          color={colors?.red}
          marginLeft={2}
          onClick={() => handleDeleteModal(eventData.id ?? 0)}
        />
      </Box>
    </Box>
  );
};

export default CalendarAppointmentBox;
