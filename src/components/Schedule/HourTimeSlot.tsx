import { GridItem, List, ListItem, Divider } from "@chakra-ui/layout";
import { colors } from "@nepMeds/theme/colors";

const HourTimeSlot: React.FC<{ timeSlot: string }> = ({ timeSlot }) => {
  return (
    <GridItem colSpan={1} mb={"30px"}>
      <List spacing={"30px"}>
        <ListItem fontSize={"xs"} color={colors.grey_dark} mt={-2}>
          {timeSlot}
        </ListItem>
        <ListItem>
          <Divider
            width={2}
            borderWidth={1}
            borderColor={colors.dark_grey}
            orientation="horizontal"
          />
        </ListItem>
        <ListItem>
          <Divider
            width={5}
            borderWidth={1}
            borderColor={colors.dark_grey}
            orientation="horizontal"
          />
        </ListItem>
        <ListItem>
          <Divider
            width={2}
            borderWidth={1}
            borderColor={colors.dark_grey}
            orientation="horizontal"
          />
        </ListItem>
      </List>
    </GridItem>
  );
};

export default HourTimeSlot;
