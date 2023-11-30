import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import TableWrapper from "@nepMeds/components/TableWrapper";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import DoctorApprovalTab from "./DoctorList/DoctorApprovalTab";

const doctorApprovalTabConfig = [
  { type: 0, heading: "Registered Doctors" },
  {
    type: STATUSTYPE.pending,
    heading: "Pending Approval",
  },
  {
    type: STATUSTYPE.approved,
    heading: "Approved",
  },
  {
    type: STATUSTYPE.rejected,
    heading: "On-Hold Doctors",
  },
];

const DoctorsList: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <TableWrapper>
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
          {doctorApprovalTabConfig.map(({ heading }) => (
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
          {doctorApprovalTabConfig.map(({ type, heading }, index) => (
            <TabPanel px={0} pb={0} pt={6} key={type}>
              {tabIndex === index && (
                <DoctorApprovalTab type={type} heading={heading} />
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </TableWrapper>
  );
};
export default DoctorsList;
