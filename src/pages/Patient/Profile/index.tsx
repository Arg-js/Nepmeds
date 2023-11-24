import { Grid, GridItem } from "@chakra-ui/react";
import Header from "../Section/Header";
import { PatientDetails, PatientDetailsTable } from "./Components";

const PatientProfile = () => {
  return (
    <>
      <Header />
      <Grid templateColumns={"repeat(12, 1fr)"} gap={3}>
        <GridItem colSpan={{ base: 12, lg: 3 }}>
          <PatientDetails />
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 9 }}>
          <PatientDetailsTable />
        </GridItem>
      </Grid>
    </>
  );
};

export default PatientProfile;
