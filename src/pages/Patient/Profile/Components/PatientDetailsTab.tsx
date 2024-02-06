import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import TableWrapper from "@nepMeds/components/TableWrapper";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { AppointmentDetails, Invoices } from "./PatientDetailsTab/index";

const PatientDetailsTab = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <TableWrapper>
      <Tabs
        index={tabIndex}
        onChange={index => setTabIndex(index)}
        overflowY={"auto"}
      >
        <TabList borderBottom={"none"} mb={4}>
          {/* TODO: find better way of doing this */}
          <Tab
            borderLeftRadius={"8px"}
            _selected={{ color: "white", bg: colors.primary }}
            bg={colors.grey_light}
            color={colors.light_gray}
          >
            Appointment Details
          </Tab>
          <Tab
            borderRightRadius={"8px"}
            _selected={{ color: "white", bg: colors.primary }}
            bg={colors.grey_light}
            color={colors.light_gray}
            width={{ base: "auto", lg: "10%" }}
          >
            Invoices
          </Tab>
        </TabList>
        <TabPanels>{tabIndex === 0 && <AppointmentDetails />}</TabPanels>
        <TabPanels>{tabIndex === 1 && <Invoices />}</TabPanels>
      </Tabs>
    </TableWrapper>
  );
};

export default PatientDetailsTab;
