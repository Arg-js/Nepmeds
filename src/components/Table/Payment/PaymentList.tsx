import {
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import BoxWrapper from "@nepMeds/components/Wrapper/BoxWrapper";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
import { useState } from "react";
import AllPayment from "./AllPayment";
import ApprovedPayment from "./ApprovedPayment";
import PendingPayment from "./PendingPayment";
import RejectedPaymentList from "./RejectedPayment";

// import { Link } from "react-router-dom";
// import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";

export interface ISpecializationList {
  label: string;
  value: number;
}

const PaymentList = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { data: specialization = [] } = useSpecializationRegisterData();

  const specializationList = specialization.map(s => ({
    label: s.name,
    value: s.id,
  }));
  return (
    <BoxWrapper>
      <Tabs onChange={index => setTabIndex(index)} index={tabIndex}>
        <Grid
          display={"flex"}
          // templateColumns="repeat(5, 1fr)"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <GridItem>
            <TabList border="none" p={4}>
              <Tab>All</Tab>
              <Tab>Payment Pending</Tab>
              <Tab>Approved Payment</Tab>
              <Tab>Rejected Payment</Tab>
            </TabList>
          </GridItem>

          {/* <GridItem width={"15%"}>
              <CustomButton backgroundColor={colors.primary}>
                {" "}
                <IoAdd /> Add Doctor
              </CustomButton>
            </GridItem> */}
        </Grid>

        <TabPanels>
          <TabPanel>
            {tabIndex === 0 && (
              <AllPayment specializationList={specializationList} />
            )}
          </TabPanel>
          <TabPanel>
            {tabIndex === 1 && (
              <PendingPayment specializationList={specializationList} />
            )}
          </TabPanel>
          <TabPanel>
            {tabIndex === 2 && (
              <ApprovedPayment specializationList={specializationList} />
            )}
          </TabPanel>
          <TabPanel>
            {tabIndex === 3 && (
              <RejectedPaymentList specializationList={specializationList} />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BoxWrapper>
  );
};

export default PaymentList;
