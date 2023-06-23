import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Icon,
  HStack,
  Button,
  VStack,
  Text,
  Box,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  IDoctorExperience,
  IGetDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import { colors } from "@nepMeds/theme/colors";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import {
  useDeleteExperienceInfo,
  useExperienceFileRegister,
  useExperienceInfoRegister,
  useUpdateExperienceInfo,
} from "@nepMeds/service/nepmeds-experience";
import { AxiosError } from "axios";
import EditExperienceField from "./EditExperienceField";
import AddExperienceField from "./AddExperienceField";

const EditExperience = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const formMethods = useForm();

  const experienceFileRegister = useExperienceFileRegister();
  const updateExperienceFileRegister = useUpdateExperienceInfo();
  const deleteExperienceFileRegister = useDeleteExperienceInfo();
  const experienceInfoRegister = useExperienceInfoRegister();

  const [openExperienceModal, setOpenExperienceModal] = useState(false);

  const [openExperienceAddModal, setOpenExperienceAddModal] = useState(false);

  const [editIndex, setEditIndex] = useState<number>(-1);
  const [editId, setEditId] = useState<number>(0);
  const [doctorId, setDoctorId] = useState<number>(0);
  const onEditExperience = (index: number, id: number, doctor: number) => {
    setEditIndex(index);
    setEditId(id);
    setDoctorId(doctor);
    setOpenExperienceModal(true);
  };

  const onSaveExperienceInfo = async () => {
    try {
      const experienceData = {
        doctor: doctorId,
        hospital: formMethods.getValues(`experience.${editIndex}.hospital`),
        description: formMethods.getValues(
          `experience.${editIndex}.description`
        ),
        currently_working: formMethods.getValues(
          `experience.${editIndex}.currently_working`
        ),
        from_date: formMethods.getValues(`experience.${editIndex}.from_date`),
        to_date: formMethods.getValues(`experience.${editIndex}.to_date`),
        experience_documents: formMethods.getValues(
          `experience.${editIndex}.experience_documents`
        ),
        id: "",
        editMode: false,
        submitMode: false,
        isSubmitted: false,
      };
      try {
        const createExperienceFileResponse =
          await experienceFileRegister.mutateAsync(experienceData);

        const experienceInfoData = {
          ...experienceData,
          experience_documents: createExperienceFileResponse.data.data.map(
            (file: string) => ({
              file: file,
            })
          ),
        };
        const experienceInfoResponse =
          await updateExperienceFileRegister.mutateAsync({
            id: editId,
            data: experienceInfoData,
          });
        if (experienceInfoResponse) {
          toastSuccess("Experience data updated successfully");
          setOpenExperienceModal(false);
        } else {
          toastFail("Failed to add experience information!");
        }
      } catch (error) {
        const err = error as AxiosError<{ errors: [0] }>;

        const errorObject = err?.response?.data?.errors?.[0];
        const firstErrorMessage = errorObject
          ? Object.values(errorObject)[0]
          : null;
        toastFail(
          firstErrorMessage?.toString() || "Failed to add experience files!"
        );
      }
    } catch (error) {
      const err = error as AxiosError<{ errors: [0] }>;

      const errorObject = err?.response?.data?.errors?.[0];
      const firstErrorMessage = errorObject
        ? Object.values(errorObject)[0]
        : null;
      toastFail(
        firstErrorMessage?.toString() || "Failed to add experience information!"
      );
    }
  };

  const deleteData = async (id: number) => {
    const experienceInfoResponse =
      await deleteExperienceFileRegister.mutateAsync(id);

    if (experienceInfoResponse) {
      toastSuccess("Experience data deleted successfully");
    } else {
      toastFail("Failed to delete experience information!");
    }
  };

  const handleSubmitExperienceData = async () => {
    const index = formMethods.getValues("experience").length - 1;

    try {
      const experienceData = {
        doctor: doctorProfileData.id ?? 0,
        hospital: formMethods.getValues(`experience.${index}.hospital`),
        description: formMethods.getValues(`experience.${index}.description`),
        currently_working: formMethods.getValues(
          `experience.${index}.currently_working`
        ),
        from_date: formMethods.getValues(`experience.${index}.from_date`),
        to_date: formMethods.getValues(`experience.${index}.to_date`),
        experience_documents: formMethods.getValues(
          `experience.${index}.experience_documents`
        ),
        id: "",
        editMode: false,
        submitMode: false,
        isSubmitted: false,
      };
      try {
        const createExperienceFileResponse =
          await experienceFileRegister.mutateAsync(experienceData);

        const experienceInfoData = {
          ...experienceData,
          experience_documents: createExperienceFileResponse.data.data.map(
            (file: string) => ({
              file: file,
            })
          ),
        };
        const experienceInfoResponse = await experienceInfoRegister.mutateAsync(
          experienceInfoData
        );
        if (experienceInfoResponse) {
          toastSuccess("Experience data updated successfully");
          setOpenExperienceAddModal(false);
        } else {
          toastFail("Failed to add experience information!");
        }
      } catch (error) {
        const err = error as AxiosError<{ errors: [0] }>;

        const errorObject = err?.response?.data?.errors?.[0];
        const firstErrorMessage = errorObject
          ? Object.values(errorObject)[0]
          : null;
        toastFail(
          firstErrorMessage?.toString() || "Failed to add experience files!"
        );
      }
    } catch (error) {
      const err = error as AxiosError<{ errors: [0] }>;

      const errorObject = err?.response?.data?.errors?.[0];
      const firstErrorMessage = errorObject
        ? Object.values(errorObject)[0]
        : null;
      toastFail(
        firstErrorMessage?.toString() || "Failed to add experience information!"
      );
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
            onClick={() => setOpenExperienceAddModal(true)}
            cursor="pointer"
          >
            <Icon as={AddIcon} boxSize={5} color={colors?.main} mr={"8px"} />
            <Text
              color={colors?.main}
              fontWeight={"400"}
              fontSize={"16px"}
              lineHeight={"19px"}
            >
              Add
            </Text>
          </Box>
        </Box>
        <CardBody>
          <ModalComponent
            size="xl"
            isOpen={openExperienceModal}
            onClose={() => setOpenExperienceModal(false)}
            heading={
              <HStack>
                <svgs.logo_small />
                <Text>Edit Experience Information</Text>
              </HStack>
            }
            footer={
              <HStack w="100%" gap={3}>
                <Button
                  variant="outline"
                  onClick={() => setOpenExperienceModal(false)}
                  flex={1}
                >
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
                <EditExperienceField
                  doctorProfileData={doctorProfileData}
                  index={editIndex}
                />
              </FormProvider>
            </VStack>
          </ModalComponent>
          <ModalComponent
            size="xl"
            isOpen={openExperienceAddModal}
            onClose={() => setOpenExperienceAddModal(false)}
            heading={
              <HStack>
                <svgs.logo_small />
                <Text>Add Experience Information</Text>
              </HStack>
            }
            footer={
              <HStack w="100%" gap={3}>
                <Button
                  variant="outline"
                  onClick={() => setOpenExperienceAddModal(false)}
                  flex={1}
                >
                  Discard
                </Button>
                <Button
                  flex={1}
                  onClick={handleSubmitExperienceData}
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
                <AddExperienceField
                  index={formMethods.getValues("experience")?.length}
                />
              </FormProvider>
            </VStack>
          </ModalComponent>
          <Grid
            templateColumns={
              doctorProfileData?.doctor_experience?.length
                ? "repeat(4, 1fr)"
                : ""
            }
          >
            {doctorProfileData?.doctor_experience?.length ? (
              doctorProfileData?.doctor_experience?.map(
                (singleExperience: IDoctorExperience, i) => {
                  return (
                    <>
                      <GridItem mt={"30px"} w="100%">
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
                      <GridItem mt={"30px"} w="100%">
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
                      <GridItem mt={"30px"} w="100%">
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
                      <Grid mt={"30px"} templateColumns={"repeat(4, 1fr)"}>
                        <GridItem w="100%">
                          <VStack spacing={2} align="stretch">
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              onClick={() =>
                                onEditExperience(
                                  i,
                                  singleExperience?.id ?? 0,
                                  singleExperience?.doctor ?? 0
                                )
                              }
                              cursor="pointer"
                            >
                              <Icon
                                as={EditIcon}
                                boxSize={5}
                                color={colors?.main}
                                mr={"8px"}
                              />
                              <Text
                                color={colors?.main}
                                fontWeight={"400"}
                                fontSize={"16px"}
                                lineHeight={"19px"}
                              >
                                Edit
                              </Text>
                            </Box>
                          </VStack>
                        </GridItem>
                        <GridItem w="100%">
                          <VStack spacing={2} align="stretch">
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              onClick={() =>
                                deleteData(singleExperience?.id ?? 0)
                              }
                              cursor="pointer"
                            >
                              <Icon
                                as={EditIcon}
                                boxSize={5}
                                color={colors?.red}
                                mr={"8px"}
                              />
                              <Text
                                color={colors?.red}
                                fontWeight={"400"}
                                fontSize={"16px"}
                                lineHeight={"19px"}
                              >
                                Delete
                              </Text>
                            </Box>
                          </VStack>
                        </GridItem>
                      </Grid>
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
