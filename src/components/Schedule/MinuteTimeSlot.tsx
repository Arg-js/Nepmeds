import { Grid, GridItem } from "@chakra-ui/layout";
import { colors } from "@nepMeds/theme/colors";
const timeSlots = [
  "0 - 15 minute",
  "15 - 30 minute",
  "30 - 45 minute",
  "45 - 60 minute",
];
const MinuteTImeSlot = () => {
  return (
    <Grid
      templateColumns={"5% repeat(4, 1fr)"}
      gap={0}
      textAlign={"center"}
      //
      color={colors.black_40}
      fontWeight={500}
      fontSize={"14px"}
    >
      <GridItem></GridItem>
      {timeSlots.map(item => (
        <GridItem key={item} border={`1px solid ${colors.gray}`}>
          {item}
        </GridItem>
      ))}
    </Grid>
  );
};

export default MinuteTImeSlot;
