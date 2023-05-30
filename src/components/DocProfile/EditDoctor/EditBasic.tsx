import { EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Flex,
  Icon,
  HStack,
  Button,
  VStack,
  useDisclosure,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";
import { images } from "@nepMeds/assets/images";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { BasicInfoForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { useUpdatePersonalInfoRegister } from "@nepMeds/service/nepmeds-register";
import { colors } from "@nepMeds/theme/colors";
import { useForm, FormProvider } from "react-hook-form";

const EditBasic = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const formMethods = useForm();
  const updatePersonalInfo = useUpdatePersonalInfoRegister();
  const onSavePersonalInfo = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;

      await updatePersonalInfo.mutateAsync({
        image: formMethods.getValues("image"),
        bio_detail: formMethods.getValues("bio_detail"),
        title: formMethods.getValues("title"),
        user: {
          first_name: formMethods.getValues("first_name"),
          middle_name: formMethods.getValues("middle_name"),
          last_name: formMethods.getValues("last_name"),
        },
      });
      onClose();
      toastSuccess("Personal information updated successfully!");
    } catch (error) {
      toastFail("Failed to update personal information!");
    }
  };
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        variant="outline"
        mb={"18px"}
        p={4}
      >
        <Image
          w={"159px"}
          h={"159px"}
          src={doctorProfileData?.image}
          fallbackSrc="https://via.placeholder.com/159"
          alt="Caffe Latte"
        />

        <CardBody w={"100%"}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Text
              fontWeight={"700"}
              fontSize={"26.8085px"}
              lineHeight={"32px"}
              color={colors?.dark_1}
              mb={"4px"}
            >
              {doctorProfileData?.user?.first_name}&nbsp;
              {doctorProfileData?.user?.middle_name}&nbsp;
              {doctorProfileData?.user?.last_name}&nbsp;
              {doctorProfileData?.specialization?.length
                ? `(${doctorProfileData?.specialization?.[0]})`
                : ""}
              {doctorProfileData?.profile_status === "approved" && (
                <Image
                  display={"inline-block"}
                  ml={"9px"}
                  src={images?.verified}
                  alt="verified"
                  fontSize={"sm"}
                  fontWeight={"normal"}
                  whiteSpace={"nowrap"}
                />
              )}
            </Text>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              onClick={onOpen}
              cursor="pointer"
            >
              <Icon as={EditIcon} boxSize={5} color={colors?.main} mr={"8px"} />
              <Text
                color={colors?.main}
                fontWeight={"400"}
                fontSize={"16px"}
                lineHeight={"19px"}
              >
                Edit
              </Text>
            </Flex>
          </Box>

          <Text
            fontWeight={"400"}
            fontSize={"16px"}
            lineHeight={"28px"}
            color={"#5B5B5B"}
          >
            {/* Dentists are highly trained individuals who work with patients to
              ensure that their teeth, gums, and mouth are healthy. Dentists are
              highly trained individuals who work with patients to ensure that
              their teeth, gums, and mouth are healthy.Dentists are highly
              trained individuals who work with patients to ensure that their
              teeth, gums, and mouth are healthy. */}
            {doctorProfileData?.bio_detail}
          </Text>
          <ModalComponent
            size="xl"
            isOpen={isOpen}
            onClose={onClose}
            heading={
              <HStack>
                <svgs.logo_small />
                <Text>Edit Personal Information</Text>
              </HStack>
            }
            footer={
              <HStack w="100%" gap={3}>
                <Button variant="outline" onClick={onClose} flex={1}>
                  Discard
                </Button>
                <Button
                  flex={1}
                  onClick={onSavePersonalInfo}
                  background={colors.primary}
                  color={colors.white}
                >
                  Save
                </Button>
              </HStack>
            }
          >
            <VStack>
              <FormProvider {...formMethods}>
                <BasicInfoForm
                  hidePasswordField={false}
                  doctorProfileData={doctorProfileData}
                  isEditable={true}
                />
              </FormProvider>
            </VStack>
          </ModalComponent>
        </CardBody>
      </Card>
    </>
  );
};

export default EditBasic;
