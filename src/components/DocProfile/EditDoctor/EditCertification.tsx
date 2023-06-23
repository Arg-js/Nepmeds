import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  HStack,
  Button,
  VStack,
  Text,
  Box,
  Center,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  IDoctorCertificationInfo,
  IGetDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import { colors } from "@nepMeds/theme/colors";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import EditCertificateField from "./EditCertificateField";
import {
  useCertificateFileRegister,
  useCertificateInfoRegister,
  useDeleteCertificateInfo,
  useUpdateCertificateInfo,
} from "@nepMeds/service/nepmeds-certificate";
import { AxiosError } from "axios";
import AddCertificateField from "./AddCertificateField";

const EditCertification = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const formMethods = useForm();
  const certificateFileRegister = useCertificateFileRegister();

  const updateCertificateInfoRegister = useUpdateCertificateInfo();
  const deleteCertificateInfoRegister = useDeleteCertificateInfo();
  const certificationInfoRegister = useCertificateInfoRegister();

  // Define openAcademicModal as a boolean state variable
  const [openCertificateModal, setOpenCertificateModal] = useState(false);

  // Define openAddAcademicModal as a boolean state variable
  const [openCertificateAddModal, setOpenCertificateAddModal] = useState(false);

  const [editIndex, setEditIndex] = useState<number>(-1);
  const [editId, setEditId] = useState<number>(0);
  const [doctorId, setDoctorId] = useState<number>(0);
  const onEditCertificate = (index: number, id: number, doctor: number) => {
    setEditIndex(index);
    setEditId(id);
    setDoctorId(doctor);
    setOpenCertificateModal(true);
  };
  const onSaveCertificateInfo = async () => {
    try {
      const certificateData = {
        doctor: doctorId,
        title: formMethods.getValues(`certification.${editIndex}.title`),
        issued_by: formMethods.getValues(
          `certification.${editIndex}.issued_by`
        ),
        certificate_issued_date: formMethods.getValues(
          `certification.${editIndex}.certificate_issued_date`
        ),
        certificate_number: formMethods.getValues(
          `certification.${editIndex}.certificate_number`
        ),
        certificate_documents: formMethods.getValues(
          `certification.${editIndex}.certificate_documents`
        ),
        id: "",
        editMode: false,
        submitMode: false,
        isSubmitted: false,
      };

      const createCertificateFileResponse =
        await certificateFileRegister.mutateAsync(certificateData);

      if (createCertificateFileResponse) {
        const certificateInfoData = {
          ...certificateData,
          certificate_documents: createCertificateFileResponse.data.data.map(
            (file: string) => ({
              file: file,
            })
          ),
        };
        const certificateInfoResponse =
          await updateCertificateInfoRegister.mutateAsync({
            id: editId,
            data: certificateInfoData,
          });

        if (certificateInfoResponse) {
          toastSuccess("Certificate data updated successfully");
          setOpenCertificateModal(false);
        } else {
          toastFail("Failed to add certificate information!");
        }
      } else {
        toastFail("Failed to upload certificate files!");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toastFail(
        err?.response?.data?.message ||
          "Failed to add certification information!"
      );
    }
  };

  const deleteData = async (id: number) => {
    const certificateInfoResponse =
      await deleteCertificateInfoRegister.mutateAsync(id);

    if (certificateInfoResponse) {
      toastSuccess("Certificate data deleted successfully");
    } else {
      toastFail("Failed to delete academic information!");
    }
  };

  const handleSendCertificateData = async () => {
    try {
      const index = formMethods.getValues("certification").length - 1;
      const certificateData = {
        doctor: doctorProfileData.id ?? 0,
        title: formMethods.getValues(`certification.${index}.title`),
        issued_by: formMethods.getValues(`certification.${index}.issued_by`),
        certificate_issued_date: formMethods.getValues(
          `certification.${index}.certificate_issued_date`
        ),
        certificate_number: formMethods.getValues(
          `certification.${index}.certificate_number`
        ),
        certificate_documents: formMethods.getValues(
          `certification.${index}.certificate_documents`
        ),
        id: "",
        editMode: false,
        submitMode: false,
        isSubmitted: false,
      };

      const createCertificateFileResponse =
        await certificateFileRegister.mutateAsync(certificateData);

      if (createCertificateFileResponse) {
        const certificateInfoData = {
          ...certificateData,
          certificate_documents: createCertificateFileResponse.data.data.map(
            (file: string) => ({
              file: file,
            })
          ),
        };
        const certificateInfoResponse =
          await certificationInfoRegister.mutateAsync(certificateInfoData);

        if (certificateInfoResponse) {
          toastSuccess("Certificate data updated successfully");
          setOpenCertificateAddModal(false);
        } else {
          toastFail("Failed to add certificate information!");
        }
      } else {
        toastFail("Failed to upload certificate files!");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toastFail(
        err?.response?.data?.message ||
          "Failed to add certification information!"
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
            Certification Info
          </Text>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => setOpenCertificateModal(true)}
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
            isOpen={openCertificateModal}
            onClose={() => setOpenCertificateModal(false)}
            heading={
              <HStack>
                <svgs.logo_small />
                <Text>Edit Certificate Information</Text>
              </HStack>
            }
            footer={
              <HStack w="100%" gap={3}>
                <Button
                  variant="outline"
                  onClick={() => setOpenCertificateModal(false)}
                  flex={1}
                >
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
                <EditCertificateField
                  doctorProfileData={doctorProfileData}
                  index={editIndex}
                />
              </FormProvider>
            </VStack>
          </ModalComponent>
          <ModalComponent
            size="xl"
            isOpen={openCertificateAddModal}
            onClose={() => setOpenCertificateAddModal(false)}
            heading={
              <HStack>
                <svgs.logo_small />
                <Text>Add Certificate Information</Text>
              </HStack>
            }
            footer={
              <HStack w="100%" gap={3}>
                <Button
                  variant="outline"
                  onClick={() => setOpenCertificateAddModal(false)}
                  flex={1}
                >
                  Discard
                </Button>
                <Button
                  flex={1}
                  onClick={handleSendCertificateData}
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
                <AddCertificateField
                  index={formMethods.getValues("certification")?.length}
                />
              </FormProvider>
            </VStack>
          </ModalComponent>
          <Grid
            templateColumns={
              doctorProfileData?.doctor_certification_info?.length
                ? "repeat(4, 1fr)"
                : ""
            }
          >
            {doctorProfileData?.doctor_certification_info?.length ? (
              doctorProfileData?.doctor_certification_info?.map(
                (singleCertificationInfo: IDoctorCertificationInfo, i) => {
                  // const fileURL = singleCertificationInfo?.certificate_document
                  //   ? `${normalURL}${singleCertificationInfo?.certificate_document}`
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
                      <GridItem mt={"30px"} w="100%">
                        <VStack spacing={3} align="stretch">
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
                          {/* <Box display={"flex"} gap={3}>
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
                          </Box> */}
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
                      <Grid mt={"30px"} templateColumns={"repeat(4, 1fr)"}>
                        <GridItem w="100%">
                          <VStack spacing={2} align="stretch">
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              onClick={() =>
                                onEditCertificate(
                                  i,
                                  singleCertificationInfo?.id ?? 0,
                                  singleCertificationInfo?.doctor ?? 0
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
                                deleteData(singleCertificationInfo?.id ?? 0)
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

export default EditCertification;
