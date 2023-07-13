import {
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { CustomButton } from "@nepMeds/components/Button/Button";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import ApprovedDocList from "./ApprovedDocList";
import PendingDocList from "./PendingDocList";
import RegisteredDocList from "./RegisteredDocList";
import RejectedDocList from "./RejectedDocList";
// import { Link } from "react-router-dom";
// import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";

export interface ISpecializationList {
  label: string;
  value: number;
}

const DoctorsList = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { data: specialization = [] } = useSpecializationRegisterData();

  const specializationList = specialization.map(s => ({
    label: s.name,
    value: s.id,
  }));
  return (
    <>
      <Tabs onChange={index => setTabIndex(index)} index={tabIndex}>
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
            {tabIndex === 0 && (
              <RegisteredDocList specializationList={specializationList} />
            )}
          </TabPanel>
          <TabPanel>
            {tabIndex === 1 && (
              <PendingDocList specializationList={specializationList} />
            )}
          </TabPanel>
          <TabPanel>
            {tabIndex === 2 && (
              <ApprovedDocList specializationList={specializationList} />
            )}
          </TabPanel>
          <TabPanel>
            {tabIndex === 3 && (
              <RejectedDocList specializationList={specializationList} />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default DoctorsList;
