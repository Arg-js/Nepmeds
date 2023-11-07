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
import { STATUSTYPE } from "@nepMeds/config/enum";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PendingPayment from "@nepMeds/components/Table/Payment/PendingPayment";

// import { Link } from "react-router-dom";
// import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";

export interface ISpecializationList {
  label: string;
  value: number;
}

interface LocationState {
  status: STATUSTYPE;
}

const tabObj = {
  [STATUSTYPE.approved]: 2,
  [STATUSTYPE.pending]: 1,
  [STATUSTYPE.rejected]: 3,
  [STATUSTYPE.completed]: 4,
};

const PaymentList = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const [tabIndex, setTabIndex] = useState<number>(tabObj[state?.status] ?? 0);

  const PaymentConfigTab = [
    {
      type: 0,
      heading: "All",
    },
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
              {PaymentConfigTab.map(({ heading }) => (
                <Tab key={heading}>{heading}</Tab>
              ))}
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
          {PaymentConfigTab.map(({ type, heading }, index) => (
            <TabPanel key={type}>
              {tabIndex === index && (
                <PendingPayment type={type} heading={heading} />
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </BoxWrapper>
  );
};

export default PaymentList;
