import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import BoxWrapper from "@nepMeds/components/Wrapper/BoxWrapper";
import { useState } from "react";
import Appointment from "./appointment";
import InstantConsultant from "./instantConsultant";

const AdminAppointment = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <BoxWrapper>
      <Tabs onChange={index => setActiveTab(index)} index={activeTab}>
        <TabList border={"none"}>
          <Tab>Appointment</Tab>
          <Tab>Instant Consultant</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{activeTab === 0 && <Appointment />}</TabPanel>
          <TabPanel>{activeTab === 1 && <InstantConsultant />}</TabPanel>
        </TabPanels>
      </Tabs>
    </BoxWrapper>
  );
};

export default AdminAppointment;
