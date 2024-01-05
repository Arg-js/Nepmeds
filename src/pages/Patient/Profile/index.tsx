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
import PatientProfileUpload from "./Components/PatientProfileUpload";
import { useState } from "react";
import { appendServerUrl } from "@nepMeds/utils/getImageUrl";
import { useUpdatePatientProfile } from "@nepMeds/service/nepmeds-patient-profile";

const PatientProfile = () => {
  const isAuthenticated = TokenService.isAuthenticated();
  const { data: patientData } = usePatientBasicProfile(isAuthenticated);
  const { mutateAsync, isLoading } = useUpdatePatientProfile();

  const [isEdit, setIsEdit] = useState(false);

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
        {isEdit ? (
          <PatientProfileUpload
            setIsEdit={setIsEdit}
            uploadFn={mutateAsync}
            isLoading={isLoading}
          />
        ) : (
          <Avatar
            src={appendServerUrl(patientData?.profile_picture ?? "")}
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
              onClick={() => setIsEdit(!isEdit)}
            />
          </Avatar>
        )}
        <Container>General Information</Container>
      </Flex>
      {/*  */}

      <PatientDetails patientData={patientData} />
      <PatientDetailsTable />
    </>
  );
};

export default PatientProfile;
