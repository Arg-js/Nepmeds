import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { colors } from "@nepMeds/theme/colors";
import { useNavigate } from "react-router-dom";
import heroSectionBg from "@nepMeds/assets/images/heroSectionBg.png";
import { useGetDoctorCount } from "@nepMeds/service/nepmeds-doctor-count";
import { appendServerUrl } from "@nepMeds/utils/getImageUrl";

const HeroSection = () => {
  const navigate = useNavigate();
  const { data: doctorCount } = useGetDoctorCount();
  const count = doctorCount?.doctor_count;
  return (
    <Flex
      direction={"column"}
      gap={4}
      backgroundImage={`url(${heroSectionBg})`}
    >
      <Text color={colors.dark_blue} fontWeight={600} fontSize={"md"}>
        The right care, is wherever you are.
      </Text>
      <Text fontWeight={700} fontSize={"4xl"} maxWidth={"391px"}>
        Consult Nepal’s Top Doctors Online, Safely From Home.
      </Text>

      <Flex gap={"4"} alignItems={"center"}>
        <AvatarGroup size="md" max={2}>
          {doctorCount?.images?.map(image => {
            return (
              <Avatar
                key={image}
                name="doctor image"
                src={appendServerUrl(image)}
              />
            );
          })}
        </AvatarGroup>

        <Text fontWeight={500} fontSize={"md"} fontFamily={"Quicksand"}>
          {count && `+${count} Doctor${count > 1 ? "s" : ""} enlisted`}
        </Text>
      </Flex>
      <Button
        fontWeight={600}
        fontSize={"md"}
        width={"max-content"}
        borderRadius={6}
        onClick={() =>
          navigate(NAVIGATION_ROUTES.PATIENT.DOCTOR_LIST_PATIENT_MODULE)
        }
      >
        Consult Now
      </Button>
    </Flex>
  );
};

export default HeroSection;
