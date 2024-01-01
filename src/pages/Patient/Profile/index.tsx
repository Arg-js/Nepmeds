import { Avatar, AvatarBadge, Container, Flex } from "@chakra-ui/react";
import { usePatientBasicProfile } from "@nepMeds/service/nepmeds-patient-details";
import TokenService from "@nepMeds/service/service-token";
import { colors } from "@nepMeds/theme/colors";
import Header from "../Section/Header";
import {
  PatientDetails,
  PatientDetailsTable,
} from "./Components/PatientDetailsTab/AppointmentDetailsTab";
import { images } from "@nepMeds/assets/images";

const PatientProfile = () => {
  const isAuthenticated = TokenService.isAuthenticated();
  const { data: patientData } = usePatientBasicProfile(isAuthenticated);

  return (
    <>
      <Header />

      {/*  */}
      <Flex
        background={`linear-gradient(270deg, ${colors.main} -25.14%, ${colors.primary} 102.12%)`}
        height={"150px"}
        color={colors.white}
        fontWeight="600"
        fontSize="28px"
        fontFamily="Quicksand"
        alignItems="center"
      >
        <Avatar
          src=""
          name={patientData?.name}
          size="2xl"
          mt={{ base: "4%", "2xl": "7%" }}
          ml={"8%"}
        >
          <AvatarBadge
            bg="white"
            top={-2}
            width={"10"}
            height={"10"}
            bgImage={images.editSquare}
            cursor={"pointer"}
          />
        </Avatar>
        <Container>General Information</Container>
      </Flex>
      {/*  */}

      <PatientDetails patientData={patientData} />
      <PatientDetailsTable />
    </>
  );
};

export default PatientProfile;
