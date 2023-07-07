import {
  Button,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ApprovedDocList from "./ApprovedDocList";
import PendingDocList from "./PendingDocList";
import RegisteredDocList from "./RegisteredDocList";
import RejectedDocList from "./RejectedDocList";
import { colors } from "@nepMeds/theme/colors";

const DoctorsList = () => {
  return (
    <>
      <Tabs>
        <TabList border="none" mb={4} p={4}>
          <Tab>Registered Doctors</Tab>
          <Tab>Pending Approval</Tab>
          <Tab>Approved</Tab>
          <Tab>Rejected</Tab>
          <Stack justifyContent={"center"} ml={"48%"}>
            <Button
              bg={colors.primary_blue}
              color={colors.white}
              sx={{
                "&:hover": {
                  bgColor: colors.primary_blue,
                  color: colors.white,
                },
              }}
            >
              Add Doctor
            </Button>
          </Stack>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RegisteredDocList />
          </TabPanel>
          <TabPanel>
            <PendingDocList />
          </TabPanel>
          <TabPanel>
            <ApprovedDocList />
          </TabPanel>
          <TabPanel>
            <RejectedDocList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default DoctorsList;
