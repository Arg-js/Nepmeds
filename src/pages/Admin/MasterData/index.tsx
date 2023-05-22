import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Specializations from "./Specialist";
import Symptoms from "./Symptoms";

const MasterData = () => {
  return (
    <Tabs>
      <TabList border="none" mb={4} p={4}>
        <Tab>Symptoms</Tab>
        <Tab>Specialist</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Symptoms />
        </TabPanel>
        <TabPanel>
          <Specializations />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MasterData;
