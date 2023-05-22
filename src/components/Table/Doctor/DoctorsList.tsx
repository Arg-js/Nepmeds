import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import ApprovedDocList from "./ApprovedDocList";
import RegisteredDocList from "./RegisteredDocList";
import PendingDocList from "./PendingDocList";
import DashboardWrapper from "@nepMeds/components/Wrapper/DashboardWrapper";
const DoctorsList = () => {
  return (
    <DashboardWrapper>
      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab>Registered Doctors</Tab>
          <Tab>Pending Approval</Tab>
          <Tab>Approved</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
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
        </TabPanels>
      </Tabs>
    </DashboardWrapper>
  );
};

export default DoctorsList;
