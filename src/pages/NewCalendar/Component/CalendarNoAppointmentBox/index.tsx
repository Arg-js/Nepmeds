import { Box } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

const boxes: React.ReactNode[] = [];
const boxCount = 4;
const boxWidth = "25%";

const boxStyle: React.CSSProperties = {
  height: "145px",
  backgroundColor: "transparent",
  border: `1px solid ${colors.gray}`,
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  width: boxWidth,
  alignItems: "center",
  justifyContent: "center",
};

const CalendarNoAppointmentBox = ({ uniqueId }: { uniqueId: number }) => {
  for (let i = 0; i < boxCount; i++) {
    boxes.push(
      <Box style={{ ...boxStyle, left: `${i * 25}%` }} key={uniqueId} />
    );
  }

  return <>{boxes}</>;
};

export default CalendarNoAppointmentBox;
