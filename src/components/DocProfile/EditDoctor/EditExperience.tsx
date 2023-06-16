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
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { ExperienceForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  IDoctorExperience,
  IGetDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import { useUpdateExperienceInfo } from "@nepMeds/service/nepmeds-experience";
import { colors } from "@nepMeds/theme/colors";
import { useForm, FormProvider } from "react-hook-form";

const EditExperience = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const {
    isOpen: isExperienceOpen,
    onClose: onExperienceClose,
    onOpen: onExperienceOpen,
  } = useDisclosure();
  const formMethods = useForm();
  const updateExperienceInfo = useUpdateExperienceInfo();

  const onSaveExperienceInfo = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;
      const allExperiences = formMethods.getValues("experience") || [];
      for (let i = 0; i < allExperiences.length; i++) {
        await updateExperienceInfo.mutateAsync({
          data: {
            doctor: formMethods.getValues("doctor"),
            hospital: formMethods.getValues(`experience.${i}.hospital`),
            description: formMethods.getValues(`experience.${i}.description`),
            from_date: formMethods.getValues(`experience.${i}.from_date`),
            to_date: formMethods.getValues(`experience.${i}.to_date`),
            currently_working: formMethods.getValues(
              `experience.${i}.currently_working`
            ),
            file: formMethods.getValues(`experience.${i}.file`),
          },
          id: doctorProfileData?.doctor_experience?.[i]?.id,
        });
      }
      onExperienceClose();
      toastSuccess("Experience information updated successfully!");
    } catch (error) {
      toastFail("Failed to update Experience information!");
    }
  };
  return (
    <>
      <Card>
        <Box p={"20px"} display={"flex"} justifyContent={"space-between"}>
          <Text
            fontWeight={"700"}
            fontSize={"18px"}
            lineHeight={"22px"}
            color={colors?.primary_dark1}
          >
            Experience Info
          </Text>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={onExperienceOpen}
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
            isOpen={isExperienceOpen}
            onClose={onExperienceClose}
            heading={
              <HStack>
                <svgs.logo_small />
                <Text>Edit Academic Information</Text>
              </HStack>
            }
            footer={
              <HStack w="100%" gap={3}>
                <Button variant="outline" onClick={onExperienceClose} flex={1}>
                  Discard
                </Button>
                <Button
                  flex={1}
                  onClick={onSaveExperienceInfo}
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
                <ExperienceForm
                  doctorProfileData={doctorProfileData}
                  isEditable={true}
                />
              </FormProvider>
            </VStack>
          </ModalComponent>
          <Grid
            templateColumns={
              doctorProfileData?.doctor_experience?.length
                ? "repeat(3, 1fr)"
                : ""
            }
          >
            {doctorProfileData?.doctor_experience?.length ? (
              doctorProfileData?.doctor_experience?.map(
                (singleExperience: IDoctorExperience) => {
                  return (
                    <>
                      <GridItem w="100%">
                        <VStack spacing={4} align="stretch">
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"180px"}
                            >
                              Hospital/ Clinic Name
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleExperience?.hospital}
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
                              From
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleExperience?.from_date}
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
                              To
                            </Text>

                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleExperience?.to_date}
                            </Text>
                          </Box>
                        </VStack>
                      </GridItem>
                    </>
                  );
                }
              )
            ) : (
              <Center>
                <Text>No Data Found</Text>
              </Center>
            )}
          </Grid>
        </CardBody>
      </Card>
    </>
  );
};

export default EditExperience;
