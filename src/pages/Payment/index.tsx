import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import PaymentRate from "./Component/PaymentRate";
import PaymentSet from "./Component/PaymentSet";

const PaymentDetails = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <Box bg={colors.white} m={5} p={8} pt={3} borderRadius={10}>
      <Tabs onChange={index => setTabIndex(index)} index={tabIndex}>
        <TabList borderBottom={"none"}>
          <Tab>Rate</Tab>
          <Tab>Payment Type</Tab>
          <Tab>Payment History</Tab>
        </TabList>
        {/* <TabIndicator
                    mt="-1.5px"
                    height="2px"
                    bg="blue.500"
                    borderRadius="1px"
                /> */}
        <TabPanels>
          <TabPanel>{tabIndex === 0 && <PaymentRate />}</TabPanel>
          <TabPanel>{tabIndex === 1 && <PaymentSet />}</TabPanel>
          <TabPanel>History</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PaymentDetails;
