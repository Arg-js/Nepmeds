import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import InstantConsult from "./InstantConsult";

const Appointment: React.FC = () => {
  return (
    <WrapperBox style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}>
      <Tabs variant="unstyled" fontSize="16px" fontWeight="400">
        <TabList>
          <Tab>All</Tab>
          <Tab>Pending Appointment</Tab>
          <Tab>Approved</Tab>
          <Tab>Rejected</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="4px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel px={0}>
            <InstantConsult />
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </WrapperBox>
  );
};

export default Appointment;
