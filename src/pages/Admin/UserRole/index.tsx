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
import { useState } from "react";
import RoleDoctor from "./roleDoctor";
import RolePatient from "./rolePatient";
import RoleAdmin from "./roleAdmin";

const UserRole = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

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
              <Tab>Doctor</Tab>
              <Tab>Patient</Tab>
              <Tab>Admin</Tab>
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
          <TabPanel>{tabIndex === 0 && <RoleDoctor />}</TabPanel>
          <TabPanel>{tabIndex === 1 && <RolePatient />}</TabPanel>
          <TabPanel>{tabIndex === 2 && <RoleAdmin />}</TabPanel>
        </TabPanels>
      </Tabs>
    </BoxWrapper>
  );
};

export default UserRole;
