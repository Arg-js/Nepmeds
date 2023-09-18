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
import AppointmentTab from "./Appointments";

const Appointment: React.FC = () => {
  return (
    <WrapperBox style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}>
      <Tabs variant="unstyled" fontSize="16px" fontFamily={"Inter"}>
        <TabList>
          <Tab
            fontWeight="400"
            _selected={{ color: colors.black }}
            color={colors.light_gray}
          >
            All
          </Tab>
          <Tab
            fontWeight="400"
            _selected={{ color: colors.black }}
            color={colors.light_gray}
          >
            Pending{" "}
          </Tab>
          <Tab
            fontWeight="400"
            _selected={{ color: colors.black }}
            color={colors.light_gray}
          >
            Approved{" "}
          </Tab>
          <Tab
            fontWeight="400"
            _selected={{ color: colors.black }}
            color={colors.light_gray}
          >
            Rejected
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="4px"
          bg={colors.main}
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel px={0} pb={0} pt={6}>
            <AppointmentTab type={0} heading={"Appointments"} />
          </TabPanel>
          <TabPanel px={0} pb={0} pt={6}>
            <AppointmentTab
              type={STATUSTYPE.pending}
              heading={"Pending Appointments"}
            />
          </TabPanel>
          <TabPanel px={0} pb={0} pt={6}>
            <AppointmentTab
              type={STATUSTYPE.approved}
              heading={"Approved Appointments"}
            />
          </TabPanel>
          <TabPanel px={0} pb={0} pt={6}>
            <AppointmentTab
              type={STATUSTYPE.rejected}
              heading={"Rejected Appointments"}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </WrapperBox>
  );
};

export default Appointment;
