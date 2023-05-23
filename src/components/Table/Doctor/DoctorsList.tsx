import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ApprovedDocList from "./ApprovedDocList";
import PendingDocList from "./PendingDocList";
import RegisteredDocList from "./RegisteredDocList";

const DoctorsList = () => {
  return (
    <Tabs>
      <TabList border="none" mb={4} p={4}>
        <Tab>Registered Doctors</Tab>
        <Tab>Pending Approval</Tab>
        <Tab>Approved</Tab>
      </TabList>
      {/* <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" /> */}
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
  );
};

export default DoctorsList;
