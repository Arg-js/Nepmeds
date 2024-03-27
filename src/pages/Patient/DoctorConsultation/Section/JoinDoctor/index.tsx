import { Button, Grid, GridItem, Image, Text, VStack } from "@chakra-ui/react";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";
import { images } from "@nepMeds/assets/images";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";

const JoinDoctor = () => {
  const navigate = useNavigate();

  return (
    <>
      <WrapperBox
        backgroundColor={colors.background_blue}
        bgImage={images.areYouADoctorBg}
        backgroundSize={"cover"}
      >
        <Grid templateColumns="repeat(2, 1fr)" alignItems={"center"}>
          <GridItem>
            <Image src={images.doctorJoin} />
          </GridItem>
          <GridItem>
            <VStack alignItems={"flex-start"} gap={2}>
              <Text fontWeight={600} fontSize={"3xl"} color={colors.dark_blue}>
                Are you a doctor?
              </Text>
              <Text fontWeight={400} fontSize={"lg"}>
                Be a part of our panel of specialist and connect with your
                patients from anywhere.
              </Text>
              <Button
                w={40}
                fontWeight={600}
                fontSize={"md"}
                variant={"primary"}
                onClick={() => navigate(NAVIGATION_ROUTES.SIGNUP)}
                rounded={"none"}
              >
                JOIN US
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </WrapperBox>
    </>
  );
};

export default JoinDoctor;
