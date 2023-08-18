import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import PaymentRate from "./Component/PaymentRate";
import PaymentSet from "./Component/PaymentSet";

const PaymentDetails = () => {
  return (
    <Box bg={colors.white} m={5} p={8} pt={3} borderRadius={10}>
      <Tabs>
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
          <TabPanel>
            <PaymentRate />
          </TabPanel>
          <TabPanel>
            <PaymentSet />
          </TabPanel>
          <TabPanel>History</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PaymentDetails;
