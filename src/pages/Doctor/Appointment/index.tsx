import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { useState } from "react";
import AppointmentTab from "@nepMeds/pages/Doctor/Appointment/AppointmentTab/index";
import TableWrapper from "@nepMeds/components/TableWrapper";

const appointmentTabConfig = [
  { type: 0, heading: "All" },
  {
    type: STATUSTYPE.pending,
    heading: "Pending",
  },
  {
    type: STATUSTYPE.approved,
    heading: "Approved",
  },
  {
    type: STATUSTYPE.rejected,
    heading: "Rejected",
  },
];

const Appointment: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <TableWrapper>
      <Tabs
        // variant="unstyled"
        fontSize="md"
        fontFamily={"Inter"}
        index={tabIndex}
        onChange={index => {
          setTabIndex(index);
        }}
      >
        <TabList borderBottom={"none"}>
          {appointmentTabConfig.map(({ heading }) => (
            <Tab
              fontWeight="400"
              // _selected={{ color: colors.black, borderBottom: "red" }}
              // color={colors.light_gray}
              // color={colors.main}
              key={heading}
            >
              {heading}
            </Tab>
          ))}
        </TabList>
        {/* TODO: this creates issue */}
        {/* <TabIndicator
          mt="-1.5px"
          height="4px"
          bg={colors.main}
          borderRadius="1px"
        /> */}
        <TabPanels>
          {appointmentTabConfig.map(({ type, heading }, index) => (
            <TabPanel px={0} pb={0} pt={6} key={type}>
              {tabIndex === index && (
                <AppointmentTab
                  type={type}
                  heading={`${heading}${index ? " Appointments" : ""}`}
                />
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </TableWrapper>
  );
};

export default Appointment;
