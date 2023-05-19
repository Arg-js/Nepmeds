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

const Sidebar = () => {
  return (
    <Box>
      <Stack h={"100vh"} py={3.75} px={3.75} background="white">
        <Image mb={"47px"} src={images?.logo} alt="nepmeds logo" h={20} />
        <Box p={"0 8px"}>
          <List ml={8} spacing={8}>
            <ListItem display={"flex"} alignItems={"center"}>
              <Category set="two-tone" primaryColor="black" />
              <Text ml={"18px"}>Dashboard</Text>
            </ListItem>

            <ListItem display={"flex"} alignItems={"center"}>
              <TimeCircle set="light" primaryColor="black" />
              <Text ml={"18px"}>Appoinments</Text>
            </ListItem>

            <ListItem display={"flex"} alignItems={"center"}>
              <Call set="light" primaryColor="black" />
              <Text ml={"18px"}>Follow Up</Text>
            </ListItem>

            <ListItem display={"flex"} alignItems={"center"}>
              <Paper set="light" primaryColor="black" />
              <Text ml={"18px"}>Patient’s History</Text>
            </ListItem>

            <ListItem display={"flex"} alignItems={"center"}>
              <Calendar set="light" primaryColor="black" />
              <Text ml={"18px"}>Calender</Text>
            </ListItem>

            <ListItem display={"flex"} alignItems={"center"}>
              <Work set="light" primaryColor="black" />
              <Text ml={"18px"}>Bank Details</Text>
            </ListItem>

            <ListItem display={"flex"} alignItems={"center"}>
              <Wallet set="light" primaryColor="black" />
              <Text ml={"18px"}>Payment</Text>
            </ListItem>
          </List>
        </Box>
      </Stack>
    </Box>
  );
};

export default Sidebar;
