import { Stack, Image, Box, List, ListItem, Text } from "@chakra-ui/react";
import {
  Calendar,
  Call,
  Category,
  Paper,
  TimeCircle,
  Wallet,
  Work,
} from "react-iconly";

import { images } from "@nepMeds/assets/images";
import { colors } from "@nepMeds/theme/colors";
type IconSet = "two-tone" | "light" | "bold" | "bulk" | "broken" | "curved";
interface ISidebarOption {
  icon: React.ElementType;
  set: IconSet;
  text: string;
}
const sidebarOptions: ISidebarOption[] = [
  {
    icon: Category,
    set: "two-tone",
    text: "Dashboard",
  },
  {
    icon: TimeCircle,
    set: "light",
    text: "Appoinments",
  },
  {
    icon: Call,
    set: "light",
    text: "Follow Up",
  },
  {
    icon: Paper,
    set: "light",
    text: "Patient's History",
  },
  {
    icon: Calendar,
    set: "light",
    text: "Calender",
  },
  {
    icon: Work,
    set: "light",
    text: "Bank Details",
  },
  {
    icon: Wallet,
    set: "light",
    text: "Payment",
  },
];

const Sidebar = () => {
  return (
    <Box>
      <Stack h={"100vh"} py={3.75} px={3.75} background="white">
        <Image mb={"47px"} src={images?.logo} alt="nepmeds logo" h={20} />
        <Box p={"0 8px"}>
          <List ml={8} spacing={8}>
            {sidebarOptions.map(sidebarOption => {
              return (
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  key={sidebarOption.text.trim()}
                >
                  <sidebarOption.icon
                    set={sidebarOption.set}
                    primaryColor={colors?.black_50}
                    size={20}
                  />
                  <Text
                    fontWeight={"400"}
                    fontSize={"14px"}
                    lineHeight={"17px"}
                    color={colors?.black_50}
                    ml={"18px"}
                  >
                    {sidebarOption?.text}
                  </Text>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Stack>
    </Box>
  );
};

export default Sidebar;
