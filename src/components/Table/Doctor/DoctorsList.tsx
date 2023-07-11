import {
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ApprovedDocList from "./ApprovedDocList";
import PendingDocList from "./PendingDocList";
import RegisteredDocList from "./RegisteredDocList";
import RejectedDocList from "./RejectedDocList";
import { CustomButton } from "@nepMeds/components/Button/Button";
import { IoAdd } from "react-icons/io5";
import { colors } from "@nepMeds/theme/colors";
// import { Link } from "react-router-dom";
// import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";

const DoctorsList = () => {
  return (
    <>
      <Tabs>
        <Grid
          display={"flex"}
          // templateColumns="repeat(5, 1fr)"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <GridItem>
            <TabList border="none" p={4}>
              <Tab>Registered Doctors</Tab>
              <Tab>Pending Approval</Tab>
              <Tab>Approved</Tab>
              <Tab>Rejected</Tab>
            </TabList>
          </GridItem>

          <GridItem width={"15%"}>
            {/* <Link to={NAVIGATION_ROUTES.SIGNUP}> */}
            <CustomButton backgroundColor={colors.primary}>
              {" "}
              <IoAdd /> Add Doctor
            </CustomButton>
            {/* </Link> */}
          </GridItem>
        </Grid>

        <TabPanels>
          <TabPanel>
            <RegisteredDocList />
          </TabPanel>
          <TabPanel>
            <PendingDocList />
          </TabPanel>
          <TabPanel>
            <ApprovedDocList />
          </TabPanel>
          <TabPanel>
            <RejectedDocList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default DoctorsList;
