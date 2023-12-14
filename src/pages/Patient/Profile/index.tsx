import { Container, Flex } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import Header from "../Section/Header";
import { PatientDetails, PatientDetailsTable } from "./Components";

const PatientProfile = () => {
  return (
    <>
      <Header />
      {/*  */}
      <Flex
        background={"linear-gradient(270deg, #3B6BB3 -25.14%, #13ADE1 102.12%)"}
        height={"150px"}
        color={colors.white}
        fontWeight="600"
        fontSize="28px"
        fontFamily="Quicksand"
        alignItems="center"
      >
        <Container>General Information</Container>
      </Flex>
      {/*  */}
      <PatientDetails />
      <PatientDetailsTable />
    </>
  );
};

export default PatientProfile;
