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
  Center,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { AcademicInfoForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useUpdateAcademicInfo } from "@nepMeds/service/nepmeds-academic";
import {
  IDoctorAcademicInfo,
  IGetDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import { normalURL } from "@nepMeds/service/service-axios";
import { colors } from "@nepMeds/theme/colors";
import { imageToBase64 } from "@nepMeds/utils/imgToBase64";
import { useForm, FormProvider } from "react-hook-form";
import { Download } from "react-iconly";

const EditAcademic = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const {
    isOpen: isAcademicOpen,
    onClose: onAcademicClose,
    onOpen: onAcademicOpen,
  } = useDisclosure();
  const formMethods = useForm();
  const updateAcademicInfo = useUpdateAcademicInfo();

  const onSaveAcademicInfo = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;
      const allAcademic = formMethods.getValues("academic") || [];

      const academicData = allAcademic?.map(
        async (doctorProfileData: IGetDoctorProfile, index: number) => {
          const file = formMethods.getValues(`academic.${index}.file`);
          console.log(doctorProfileData);
          return {
            doctor: formMethods.getValues("doctor"),
            degree_program: formMethods.getValues(
              `academic.${index}.degree_program`
            ),
            university: formMethods.getValues(`academic.${index}.university`),
            major: formMethods.getValues(`academic.${index}.major`),
            graduation_year: formMethods.getValues(
              `academic.${index}.graduation_year`
            ),
            file: file ? await imageToBase64(file) : "",
          };
        }
      );

      await Promise.all(academicData).then(academicDataArray => {
        updateAcademicInfo.mutateAsync({
          data: academicDataArray,
          id: doctorProfileData.user.id ?? 0,
        });
      });
      onAcademicClose();
      toastSuccess("Academic information updated successfully!");
    } catch (error) {
      toastFail("Failed to update academic information!");
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
            onClick={onAcademicOpen}
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
            isOpen={isAcademicOpen}
            onClose={onAcademicClose}
            heading={
              <HStack>
                <svgs.logo_small />
                <Text>Edit Academic Information</Text>
              </HStack>
            }
            footer={
              <HStack w="100%" gap={3}>
                <Button variant="outline" onClick={onAcademicClose} flex={1}>
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
                <AcademicInfoForm
                  doctorProfileData={doctorProfileData}
                  isEditable={true}
                />
              </FormProvider>
            </VStack>
          </ModalComponent>
          <Grid
            templateColumns={
              doctorProfileData?.doctor_academic_info?.length
                ? "repeat(3, 1fr)"
                : ""
            }
          >
            {doctorProfileData?.doctor_academic_info?.length ? (
              doctorProfileData?.doctor_academic_info?.map(
                (singleAcademicInfo: IDoctorAcademicInfo) => {
                  const fileURL = singleAcademicInfo?.file
                    ? `${normalURL}${singleAcademicInfo?.file}`
                    : "";
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
                      <GridItem w="100%">
                        <VStack spacing={4} align="stretch">
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
                          <Box display={"flex"} gap={3}>
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
                                  {/* {singleAcademicInfo?.file?.split("/").pop()} */}
                                  <Download
                                    set="light"
                                    primaryColor={colors?.main}
                                    size={20}
                                  />
                                </a>
                              </Text>
                            </Box>
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

export default EditAcademic;
