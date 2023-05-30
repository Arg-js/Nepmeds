import { EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Icon,
  HStack,
  Button,
  VStack,
  useDisclosure,
  Text,
  Box,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { PrimaryInfoForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { useUpdatePrimaryInfoRegister } from "@nepMeds/service/nepmeds-register";
import { colors } from "@nepMeds/theme/colors";
import { useForm, FormProvider } from "react-hook-form";

const EditPrimary = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const {
    isOpen: isPrimaryOpen,
    onClose: onPrimaryClose,
    onOpen: onPrimaryOpen,
  } = useDisclosure();
  const formMethods = useForm();
  const updatePrimaryData = useUpdatePrimaryInfoRegister();

  const onSavePrimaryInfo = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;

      await updatePrimaryData.mutateAsync({
        mobile_number: formMethods.getValues("mobile_number"),
        email: formMethods.getValues("email"),
        gender: formMethods.getValues("gender"),
        date_of_birth: formMethods.getValues("date_of_birth"),
        specialization: formMethods.getValues("specialization"),
        pan_number: formMethods.getValues("pan_number"),
        id_type: formMethods.getValues("id_type"),
        citizenship_number: formMethods.getValues("citizenship_number"),
        citizenship_issued_district: formMethods.getValues(
          "citizenship_issued_district"
        ),
        citizenship_issued_date: formMethods.getValues(
          "citizenship_issued_date"
        ),
        province: formMethods.getValues("province"),
        district: formMethods.getValues("district"),
        municipality_vdc: formMethods.getValues("municipality_vdc"),
        tole: formMethods.getValues("tole"),
        ward: formMethods.getValues("ward"),
      });
      onPrimaryClose();
      toastSuccess("Primary information updated successfully!");
    } catch (error) {
      toastFail("Failed to update primary information!");
    }
  };
  return (
    <>
      <Card mb={"18px"}>
        <Box p={"20px"} display={"flex"} justifyContent={"space-between"}>
          <Text
            fontWeight={"700"}
            fontSize={"18px"}
            lineHeight={"22px"}
            color={colors?.primary_dark1}
          >
            Primary Information
          </Text>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={onPrimaryOpen}
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
          </Box>
        </Box>
        <CardBody>
          <ModalComponent
            size="xl"
            isOpen={isPrimaryOpen}
            onClose={onPrimaryClose}
            heading={
              <HStack>
                <svgs.logo_small />
                <Text>Edit Primary Information</Text>
              </HStack>
            }
            footer={
              <HStack w="100%" gap={3}>
                <Button variant="outline" onClick={onPrimaryClose} flex={1}>
                  Discard
                </Button>
                <Button
                  flex={1}
                  onClick={onSavePrimaryInfo}
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
                <PrimaryInfoForm
                  doctorProfileData={doctorProfileData}
                  isEditable={true}
                />
              </FormProvider>
            </VStack>
          </ModalComponent>
          <Grid templateColumns="repeat(3, 1fr)">
            <GridItem w="100%">
              <VStack spacing={4} align="stretch">
                <Box display={"flex"} alignItems={"center"} gap={3}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    letterSpacing={"0.4px"}
                    color={"#4D4D4D"}
                    w={"86px"}
                  >
                    Province
                  </Text>

                  <Text
                    fontWeight={"500"}
                    fontSize={"16px"}
                    lineHeight={"19px"}
                    color={colors?.black}
                  >
                    :&nbsp;{doctorProfileData?.province}
                  </Text>
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={3}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    letterSpacing={"0.4px"}
                    color={"#4D4D4D"}
                    w={"86px"}
                  >
                    Ward
                  </Text>
                  <Text
                    fontWeight={"500"}
                    fontSize={"16px"}
                    lineHeight={"19px"}
                    color={colors?.black}
                  >
                    :&nbsp;{doctorProfileData?.ward}
                  </Text>
                </Box>
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing={4} align="stretch">
                <Box display={"flex"} alignItems={"center"} gap={3}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    letterSpacing={"0.4px"}
                    color={"#4D4D4D"}
                    w={"86px"}
                  >
                    District
                  </Text>

                  <Text
                    fontWeight={"500"}
                    fontSize={"16px"}
                    lineHeight={"19px"}
                    color={colors?.black}
                  >
                    :&nbsp;{doctorProfileData?.district}
                  </Text>
                </Box>
                <Box display={"flex"} gap={3}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    letterSpacing={"0.4px"}
                    color={"#4D4D4D"}
                    w={"86px"}
                  >
                    Tole
                  </Text>
                  <Text
                    fontWeight={"500"}
                    fontSize={"16px"}
                    lineHeight={"19px"}
                    color={colors?.black}
                  >
                    :&nbsp;{doctorProfileData?.tole}
                  </Text>
                </Box>
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing={4} align="stretch">
                <Box display={"flex"} alignItems={"center"} gap={3}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    letterSpacing={"0.4px"}
                    color={"#4D4D4D"}
                    w={"137px"}
                  >
                    Municipality/ VDC
                  </Text>

                  <Text
                    fontWeight={"500"}
                    fontSize={"16px"}
                    lineHeight={"19px"}
                    color={colors?.black}
                  >
                    :&nbsp;{doctorProfileData?.municipality_vdc}
                  </Text>
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </>
  );
};

export default EditPrimary;
