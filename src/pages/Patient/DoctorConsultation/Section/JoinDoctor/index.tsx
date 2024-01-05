import {
  Button,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";
import { images } from "@nepMeds/assets/images";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";

const JoinDoctor = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
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
                onClick={onOpen}
                rounded={"none"}
              >
                JOIN US
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </WrapperBox>
      <ModalComponent
        heading={
          <HStack>
            <Image src={images.smallLogo} width={"30px"} />

            <Text>Join Us as A Doctor</Text>
          </HStack>
        }
        isOpen={isOpen}
        onClose={onClose}
        footer={
          <HStack w="100%" justifyContent={"center"} gap={3}>
            <Button onClick={() => navigate(NAVIGATION_ROUTES.SIGNUP)} px={16}>
              Join Us
            </Button>
          </HStack>
        }
      >
        <Text>
          Be a part of our panel of specialist and connect with your patients
          from anywhere.
        </Text>
      </ModalComponent>
    </>
  );
};

export default JoinDoctor;
