import { EditIcon } from "@chakra-ui/icons";
import { Grid, GridItem, Text, Box, Flex, HStack } from "@chakra-ui/layout";
import {
  Card,
  CardBody,
  Image,
  Icon,
  VStack,
  Center,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import {
  IDoctorAcademicInfo,
  IDoctorCertificationInfo,
  IDoctorExperience,
  IGetDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import { colors } from "@nepMeds/theme/colors";
import { FormProvider, useForm } from "react-hook-form";
import { Download } from "react-iconly";
import ModalComponent from "../Form/ModalComponent";
import {
  AcademicInfoForm,
  BasicInfoForm,
  CertificationInfoForm,
  ExperienceForm,
  PrimaryInfoForm,
} from "../FormComponents";
import { normalURL } from "@nepMeds/service/service-axios";
import { toastFail, toastSuccess } from "../Toast";
import {
  useUpdatePersonalInfoRegister,
  useUpdatePrimaryInfoRegister,
} from "@nepMeds/service/nepmeds-register";
import { useUpdateAcademicInfo } from "@nepMeds/service/nepmeds-academic";
import { useUpdateCertificateInfo } from "@nepMeds/service/nepmeds-certificate";
import { useUpdateExperienceInfo } from "@nepMeds/service/nepmeds-experience";

export const DocUpdateProfile = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    isOpen: isPrimaryOpen,
    onClose: onPrimaryClose,
    onOpen: onPrimaryOpen,
  } = useDisclosure();
  const {
    isOpen: isAcademicOpen,
    onClose: onAcademicClose,
    onOpen: onAcademicOpen,
  } = useDisclosure();
  const {
    isOpen: isCertificateOpen,
    onClose: onCertificateClose,
    onOpen: onCertificateOpen,
  } = useDisclosure();
  const {
    isOpen: isExperienceOpen,
    onClose: onExperienceClose,
    onOpen: onExperienceOpen,
  } = useDisclosure();
  const formMethods = useForm();
  const updatePersonalInfo = useUpdatePersonalInfoRegister();
  const updatePrimaryData = useUpdatePrimaryInfoRegister();
  const updateAcademicInfo = useUpdateAcademicInfo();
  const updateCertificateInfo = useUpdateCertificateInfo();
  const updateExperienceInfo = useUpdateExperienceInfo();
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
  const onSaveAcademicInfo = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;
      const allAcademic = formMethods.getValues("academic") || [];

      for (let i = 0; i < allAcademic?.length; i++) {
        await updateAcademicInfo.mutateAsync({
          data: {
            doctor: formMethods.getValues("doctor"),
            degree_program: formMethods.getValues(
              `academic.${i}.degree_program`
            ),
            university: formMethods.getValues(`academic.${i}.university`),
            major: formMethods.getValues(`academic.${i}.major`),
            graduation_year: formMethods.getValues(
              `academic.${i}.graduation_year`
            ),
            file: formMethods.getValues(`academic.${i}.file`),
          },
          id: doctorProfileData?.doctor_academic_info[i]?.id,
        });
      }
      onAcademicClose();
      toastSuccess("Academic information updated successfully!");
    } catch (error) {
      toastFail("Failed to update academic information!");
    }
  };
  const onSaveCertificateInfo = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;
      const allCertifications = formMethods.getValues("certification") || [];

      for (let i = 0; i < allCertifications.length; i++) {
        await updateCertificateInfo.mutateAsync({
          data: {
            doctor: formMethods.getValues("doctor"),
            certificate_issued_date: formMethods.getValues(
              `certification.${i}.certificate_issued_date`
            ),
            certificate_number: formMethods.getValues(
              `certification.${i}.certificate_number`
            ),
            title: formMethods.getValues(`certification.${i}.title`),
            issued_by: formMethods.getValues(`certification.${i}.issued_by`),
            file: formMethods.getValues(`certification.${i}.file`),
          },
          id: doctorProfileData?.doctor_certification_info?.[i]?.id,
        });
      }
      onCertificateClose();
      toastSuccess("Certification information updated successfully!");
    } catch (error) {
      toastFail("Failed to update Certification information!");
    }
  };
  const onSaveExperienceInfo = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;

      await updateExperienceInfo.mutateAsync({
        data: {
          doctor: formMethods.getValues("doctor"),
          hospital: formMethods.getValues("experience.0.hospital"),
          description: formMethods.getValues("experience.0.description"),
          from_date: formMethods.getValues("experience.0.from_date"),
          to_date: formMethods.getValues("experience.0.to_date"),
          currently_working: formMethods.getValues(
            "experience.0.currently_working"
          ),
          file: formMethods.getValues("experience.0.file"),
        },
        id: 70,
      });
      onExperienceClose();
      toastSuccess("Experience information updated successfully!");
    } catch (error) {
      toastFail("Failed to update Experience information!");
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
              {doctorProfileData?.user?.last_name}&nbsp; (
              {doctorProfileData?.specialization?.[0]})
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
                                  {singleAcademicInfo?.file?.split("/").pop()}
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
      <Card mb={"18px"}>
        <Box p={"20px"} display={"flex"} justifyContent={"space-between"}>
          <Text
            fontWeight={"700"}
            fontSize={"18px"}
            lineHeight={"22px"}
            color={colors?.primary_dark1}
          >
            Certification Info
          </Text>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={onCertificateOpen}
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
            isOpen={isCertificateOpen}
            onClose={onCertificateClose}
            heading={
              <HStack>
                <svgs.logo_small />
                <Text>Edit Certificate Information</Text>
              </HStack>
            }
            footer={
              <HStack w="100%" gap={3}>
                <Button variant="outline" onClick={onCertificateClose} flex={1}>
                  Discard
                </Button>
                <Button
                  flex={1}
                  onClick={onSaveCertificateInfo}
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
                <CertificationInfoForm
                  doctorProfileData={doctorProfileData}
                  isEditable={true}
                />
              </FormProvider>
            </VStack>
          </ModalComponent>
          <Grid
            templateColumns={
              doctorProfileData?.doctor_certification_info?.length
                ? "repeat(3, 1fr)"
                : ""
            }
          >
            {doctorProfileData?.doctor_certification_info?.length ? (
              doctorProfileData?.doctor_certification_info?.map(
                (singleCertificationInfo: IDoctorCertificationInfo) => {
                  const fileURL = singleCertificationInfo?.file
                    ? `${normalURL}${singleCertificationInfo?.file}`
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
                              w={"90px"}
                            >
                              Title
                            </Text>

                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleCertificationInfo?.title}
                            </Text>
                          </Box>
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"90px"}
                            >
                              Issued Date
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;
                              {singleCertificationInfo?.certificate_issued_date}
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
                              Issued By
                            </Text>

                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleCertificationInfo?.issued_by}
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
                              Document
                            </Text>
                            <Box display={"flex"}>
                              <Text
                                fontWeight={"400"}
                                fontSize={"14px"}
                                lineHeight={"23px"}
                                color={colors?.gray_700}
                                mr={"8px"}
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
                                  {singleCertificationInfo?.file
                                    ?.split("/")
                                    .pop()}
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
                              Credential ID
                            </Text>

                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;
                              {singleCertificationInfo?.certificate_number}
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

export default DocUpdateProfile;
