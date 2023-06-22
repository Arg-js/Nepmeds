import { EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  HStack,
  Button,
  VStack,
  useDisclosure,
  Text,
  Box,
  Center,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { CertificationInfoForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
// import { useUpdateCertificateInfo } from "@nepMeds/service/nepmeds-certificate";
import {
  IDoctorCertificationInfo,
  IGetDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import { normalURL } from "@nepMeds/service/service-axios";
import { colors } from "@nepMeds/theme/colors";
import { imageToBase64 } from "@nepMeds/utils/imgToBase64";
import { useForm, FormProvider } from "react-hook-form";
import { Download } from "react-iconly";

const EditCertification = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const {
    isOpen: isCertificateOpen,
    onClose: onCertificateClose,
    onOpen: onCertificateOpen,
  } = useDisclosure();
  const formMethods = useForm();
  // const updateCertificateInfo = useUpdateCertificateInfo();

  const onSaveCertificateInfo = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;
      const allCertifications = formMethods.getValues("certification") || [];

      const certificateData = allCertifications?.map(
        async (doctorProfileData: IGetDoctorProfile, i: number) => {
          const file = formMethods.getValues(`certification.${i}.file`);
          console.log(doctorProfileData);
          return {
            doctor: formMethods.getValues("doctor"),
            certificate_issued_date: formMethods.getValues(
              `certification.${i}.certificate_issued_date`
            ),
            certificate_number: formMethods.getValues(
              `certification.${i}.certificate_number`
            ),
            title: formMethods.getValues(`certification.${i}.title`),
            issued_by: formMethods.getValues(`certification.${i}.issued_by`),
            file: file ? await imageToBase64(file) : "",
          };
        }
      );
      console.log(certificateData);

      // await Promise.all(certificateData).then(certificateDataArray => {
      //   updateCertificateInfo.mutateAsync({
      //     data: certificateDataArray,
      //     id: doctorProfileData.user.id ?? 0,
      //   });
      // });
      onCertificateClose();
      toastSuccess("Certification information updated successfully!");
    } catch (error) {
      toastFail("Failed to update Certification information!");
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
                  const fileURL = singleCertificationInfo?.certificate_document
                    ? `${normalURL}${singleCertificationInfo?.certificate_document}`
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
    </>
  );
};

export default EditCertification;
