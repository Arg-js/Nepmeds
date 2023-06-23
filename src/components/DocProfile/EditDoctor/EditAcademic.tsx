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
  GridItem,
  Grid,
  Center,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  IDoctorAcademicInfo,
  IGetDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import { colors } from "@nepMeds/theme/colors";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import EditAcademicField from "./EditAcademicField";
import { AxiosError } from "axios";
import {
  useAcademicFileRegister,
  useAcademicInfoRegister,
  useDeleteAcademicInfo,
  useUpdateAcademicInfo,
} from "@nepMeds/service/nepmeds-academic";
import AddAcademicField from "./AddAcademicField";

const EditAcademic = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  // Define openAcademicModal as a boolean state variable
  const [openAcademicModal, setOpenAcademicModal] = useState(false);

  // Define openAddAcademicModal as a boolean state variable
  const [openAcademicAddModal, setOpenAcademicAddModal] = useState(false);

  const formMethods = useForm();
  const academicFileRegister = useAcademicFileRegister();
  const updateAcademicInfoRegister = useUpdateAcademicInfo();
  const deleteAcademicInfoRegister = useDeleteAcademicInfo();
  const academicInfoRegister = useAcademicInfoRegister();

  const [editIndex, setEditIndex] = useState<number>(-1);
  const [editId, setEditId] = useState<number>(0);
  const [doctorId, setDoctorId] = useState<number>(0);
  const onEditAcademic = (index: number, id: number, doctor: number) => {
    setEditIndex(index);
    setEditId(id);
    setDoctorId(doctor);
    setOpenAcademicModal(true);
  };

  const onSaveAcademicInfo = async () => {
    try {
      const academicData = {
        degree_program: formMethods.getValues(
          `academic.${editIndex}.degree_program`
        ),
        graduation_year: formMethods.getValues(
          `academic.${editIndex}.graduation_year`
        ),
        university: formMethods.getValues(`academic.${editIndex}.university`),
        major: formMethods.getValues(`academic.${editIndex}.major`),
        doctor: doctorId,
        academic_documents: formMethods.getValues(
          `academic.${editIndex}.academic_documents`
        ),
        id: "",
        editMode: false,
        submitMode: false,
        isSubmitted: false,
      };
      try {
        const createAcademicFileResponse =
          await academicFileRegister.mutateAsync(academicData);

        const academicInfoData = {
          ...academicData,
          academic_documents: createAcademicFileResponse.data.data.map(
            (file: string) => ({
              file: file,
            })
          ),
        };
        const academicInfoResponse =
          await updateAcademicInfoRegister.mutateAsync({
            id: editId,
            data: academicInfoData,
          });

        if (academicInfoResponse) {
          toastSuccess("Academic Information updated");
          setOpenAcademicModal(false);
        } else {
          toastFail("Failed to add academic information!");
        }
      } catch (error) {
        const err = error as AxiosError<{ errors: [0] }>;

        const errorObject = err?.response?.data?.errors?.[0];
        const firstErrorMessage = errorObject
          ? Object.values(errorObject)[0]
          : null;
        toastFail(
          firstErrorMessage?.toString() || "Failed to add academic files!"
        );
      }
    } catch (error) {
      const err = error as AxiosError<{ errors: [0] }>;

      const errorObject = err?.response?.data?.errors?.[0];
      const firstErrorMessage = errorObject
        ? Object.values(errorObject)[0]
        : null;
      toastFail(
        firstErrorMessage?.toString() || "Failed to add academic files!"
      );
    }
  };
  const deleteData = async (id: number) => {
    const academicInfoResponse = await deleteAcademicInfoRegister.mutateAsync(
      id
    );

    if (academicInfoResponse) {
      toastSuccess("Academic data deleted successfully");
    } else {
      toastFail("Failed to delete academic information!");
    }
  };
  const handleSendAcademic = async () => {
    try {
      const lastValue = formMethods.getValues("academic").length - 1;

      const academicData = {
        degree_program: formMethods.getValues(
          `academic.${lastValue}.degree_program`
        ),
        graduation_year: formMethods.getValues(
          `academic.${lastValue}.graduation_year`
        ),
        university: formMethods.getValues(`academic.${lastValue}.university`),
        major: formMethods.getValues(`academic.${lastValue}.major`),
        doctor: doctorProfileData.id ?? 0,
        academic_documents: formMethods.getValues(
          `academic.${lastValue}.academic_documents`
        ),
        id: "",
        editMode: false,
        submitMode: false,
        isSubmitted: false,
      };
      try {
        const createAcademicFileResponse =
          await academicFileRegister.mutateAsync(academicData);

        const academicInfoData = {
          ...academicData,
          academic_documents: createAcademicFileResponse.data.data.map(
            (file: string) => ({
              file: file,
            })
          ),
        };
        const academicInfoResponse = await academicInfoRegister.mutateAsync(
          academicInfoData
        );

        if (academicInfoResponse) {
          toastSuccess("Academic Information updated");
          setOpenAcademicAddModal(false);
        } else {
          toastFail("Failed to add academic information!");
        }
      } catch (error) {
        const err = error as AxiosError<{ errors: [0] }>;

        const errorObject = err?.response?.data?.errors?.[0];
        const firstErrorMessage = errorObject
          ? Object.values(errorObject)[0]
          : null;
        toastFail(
          firstErrorMessage?.toString() || "Failed to update academic files!"
        );
      }
    } catch (error) {
      const err = error as AxiosError<{ errors: [0] }>;

      const errorObject = err?.response?.data?.errors?.[0];
      const firstErrorMessage = errorObject
        ? Object.values(errorObject)[0]
        : null;
      toastFail(
        firstErrorMessage?.toString() ||
          "Failed to update academic information!"
      );
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
            Academic Info
          </Text>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => setOpenAcademicAddModal(true)}
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
            isOpen={openAcademicModal}
            onClose={() => setOpenAcademicModal(false)}
            heading={
              <HStack>
                <svgs.logo_small />
                <Text>Edit Academic Information</Text>
              </HStack>
            }
            footer={
              <HStack w="100%" gap={3}>
                <Button
                  variant="outline"
                  onClick={() => setOpenAcademicModal(false)}
                  flex={1}
                >
                  Discard
                </Button>
                <Button
                  flex={1}
                  onClick={onSaveAcademicInfo}
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
                <EditAcademicField
                  index={editIndex}
                  doctorProfileData={doctorProfileData}
                />
              </FormProvider>
            </VStack>
          </ModalComponent>
          <ModalComponent
            size="xl"
            isOpen={openAcademicAddModal}
            onClose={() => setOpenAcademicAddModal(false)}
            heading={
              <HStack>
                <svgs.logo_small />
                <Text>Add Academic Information</Text>
              </HStack>
            }
            footer={
              <HStack w="100%" gap={3}>
                <Button
                  variant="outline"
                  onClick={() => setOpenAcademicAddModal(false)}
                  flex={1}
                >
                  Discard
                </Button>
                <Button
                  flex={1}
                  onClick={handleSendAcademic}
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
                <AddAcademicField
                  index={formMethods.getValues("academic")?.length}
                />
              </FormProvider>
            </VStack>
          </ModalComponent>
          <Grid
            templateColumns={
              doctorProfileData?.doctor_academic_info?.length
                ? "repeat(4, 1fr)"
                : ""
            }
          >
            {doctorProfileData?.doctor_academic_info?.length ? (
              doctorProfileData?.doctor_academic_info?.map(
                (singleAcademicInfo: IDoctorAcademicInfo, i) => {
                  // const fileURL = singleAcademicInfo?.academic_document
                  //   ? `${normalURL}${singleAcademicInfo?.academic_document}`
                  //   : "";
                  return (
                    <>
                      <GridItem mt={"30px"} w="100%">
                        <VStack spacing={3} align="stretch">
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"94px"}
                            >
                              Degree
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleAcademicInfo?.degree_program}
                            </Text>
                          </Box>
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"94px"}
                            >
                              Passed Year
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleAcademicInfo?.graduation_year}
                            </Text>
                          </Box>
                        </VStack>
                      </GridItem>
                      <GridItem mt={"30px"} w="100%">
                        <VStack spacing={3} align="stretch">
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"94px"}
                            >
                              College/ Uni
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleAcademicInfo?.university}
                            </Text>
                          </Box>
                          {/* <Box display={"flex"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"137px"}
                            >
                              Document
                            </Text>
                            <Box>
                              <Text
                                fontWeight={"400"}
                                fontSize={"14px"}
                                lineHeight={"23px"}
                                color={colors?.gray_700}
                                mr={"8px"}
                                display="flex"
                              >
                                <a
                                  href={fileURL}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    color: colors.primary,
                                    display: "flex",
                                    gap: 4,
                                    alignItems: "center",
                                  }}
                                  download
                                >
                                  {singleAcademicInfo?.file?.split("/").pop()}
                                  <Download
                                    set="light"
                                    primaryColor={colors?.main}
                                    size={20}
                                  />
                                </a>
                              </Text>
                            </Box>
                          </Box> */}
                        </VStack>
                      </GridItem>
                      <GridItem mt={"30px"} w="100%">
                        <VStack spacing={2} align="stretch">
                          <Box>
                            <Box display={"flex"} alignItems={"center"} gap={2}>
                              <Text
                                fontWeight={"500"}
                                fontSize={"14px"}
                                lineHeight={"16px"}
                                letterSpacing={"0.4px"}
                                color={"#4D4D4D"}
                                w={"137px"}
                              >
                                Major
                              </Text>
                              <Text
                                fontWeight={"500"}
                                fontSize={"16px"}
                                lineHeight={"19px"}
                                color={colors?.black}
                              >
                                :&nbsp;{singleAcademicInfo?.major}
                              </Text>
                            </Box>
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
                                onEditAcademic(
                                  i,
                                  singleAcademicInfo?.id ?? 0,
                                  singleAcademicInfo?.doctor ?? 0
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
                                deleteData(singleAcademicInfo?.id ?? 0)
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

export default EditAcademic;
