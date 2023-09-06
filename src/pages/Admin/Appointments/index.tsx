import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import BoxWrapper from "@nepMeds/components/Wrapper/BoxWrapper";
import { useState } from "react";
import Appointment from "./appointment";

const AdminAppointment = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <BoxWrapper>
      <Tabs onChange={index => setActiveTab(index)} index={activeTab}>
        <TabList border={"none"}>
          <Tab>Instant Consultant</Tab>
          <Tab>Appointment</Tab>
          <Tab>Consultant</Tab>
          <Tab>Instant Consultant Request</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{activeTab === 0 && <p>Instant Consultant</p>}</TabPanel>
          <TabPanel>{activeTab === 1 && <Appointment />}</TabPanel>
          <TabPanel>{activeTab === 2 && <p>Consultant</p>}</TabPanel>
          <TabPanel>
            {activeTab === 3 && <p>Instant Consultant Request</p>}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BoxWrapper>
  );
};

export default AdminAppointment;
