import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import AppointmentTab from "@nepMeds/pages/Doctor/Appointment/AppointmentTab/index";

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
    <WrapperBox style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}>
      <Tabs
        variant="unstyled"
        fontSize="md"
        fontFamily={"Inter"}
        index={tabIndex}
        onChange={index => {
          setTabIndex(index);
        }}
      >
        <TabList>
          {appointmentTabConfig.map(({ heading }) => (
            <Tab
              fontWeight="400"
              _selected={{ color: colors.black }}
              color={colors.light_gray}
              key={heading}
            >
              {heading}
            </Tab>
          ))}
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="4px"
          bg={colors.main}
          borderRadius="1px"
        />
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
    </WrapperBox>
  );
};

export default Appointment;
