import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import RescheduledList from "./RescheduleList";
import RescheduledHistory from "./RescheduledHistory";
import TableWrapper from "@nepMeds/components/TableWrapper";

const Reschedule = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <TableWrapper>
      <Tabs
        fontSize="md"
        fontFamily={"Inter"}
        index={tabIndex}
        onChange={index => {
          setTabIndex(index);
        }}
      >
        <TabList borderBottom={"none"}>
          <Tab>List</Tab>
          <Tab>History</Tab>
        </TabList>
        <TabPanels>
          {tabIndex === 0 && <RescheduledList />}
          {tabIndex === 1 && <RescheduledHistory />}
        </TabPanels>
      </Tabs>
    </TableWrapper>
  );
};

export default Reschedule;
