import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { useState } from "react";
import PatientDetailsTable from "./AppointmentDetailsTab/PatientAppointmentDetailsTable";

const AppointmentDetails = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Tabs
      fontSize="md"
      index={tabIndex}
      fontFamily={"Inter"}
      onChange={index => setTabIndex(index)}
    >
      <TabList borderBottom={"none"}>
        <Tab>All</Tab>
        <Tab>Completed</Tab>
        <Tab>Approved</Tab>
        <Tab>Pending</Tab>
        <Tab>Rejected</Tab>
      </TabList>
      <TabPanels>
        {tabIndex === 0 && <PatientDetailsTable />}
        {tabIndex === 1 && <PatientDetailsTable type={STATUSTYPE.completed} />}
        {tabIndex === 2 && <PatientDetailsTable type={STATUSTYPE.approved} />}
        {tabIndex === 3 && <PatientDetailsTable type={STATUSTYPE.pending} />}
        {tabIndex === 4 && <PatientDetailsTable type={STATUSTYPE.rejected} />}
      </TabPanels>
    </Tabs>
  );
};

export default AppointmentDetails;
