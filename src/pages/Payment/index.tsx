import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import BoxWrapper from "@nepMeds/components/Wrapper/BoxWrapper";
import PaymentSet from "./Component/PaymentSet";

const PaymentDetails = () => {
  return (
    <BoxWrapper>
      <Tabs>
        <TabList borderBottom={"none"}>
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
            <PaymentSet />
          </TabPanel>
          <TabPanel>History</TabPanel>
        </TabPanels>
      </Tabs>
    </BoxWrapper>
  );
};

export default PaymentDetails;
