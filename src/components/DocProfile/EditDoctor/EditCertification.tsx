import { EditIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  // MenuDivider,
  // Flex,
  Divider,
  Grid,
  // Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { CertificationInfoForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  CertificateInfo,
  getSingleCertificateInfo,
  useCertificateFileRegister,
  useCertificateInfoRegister,
  useUpdateCertificateInfo,
} from "@nepMeds/service/nepmeds-certificate";
import {
  IDoctorCertificationInfo,
  IGetDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";
import { AxiosError } from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface handleFormUpdateProps {
  handleCloseForm: () => void;
  isLoading: boolean;
}

const SubmitButton: React.FC<handleFormUpdateProps> = ({
  handleCloseForm,
  isLoading,
}) => {
  return (
    <Grid
      borderTop={`1px solid ${colors.grey_light}`}
      py={5}
      px={6}
      className="test"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <GridItem colSpan={1}>
        <Button onClick={handleCloseForm} px={6}>
          Cancel
        </Button>
      </GridItem>
      <GridItem colSpan={1}>
        <Button
          px={6}
          borderRadius="xl"
          backgroundColor={colors.primary}
          _hover={{ bg: colors.primary_blue }}
          color={colors.white}
          isLoading={isLoading}
          type="submit"
        >
          Update
        </Button>
      </GridItem>
    </Grid>
  );
};

const EditCertification = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const {
    isOpen: isDocImgOpen,
    onClose: onDocImgClose,
    onOpen: onDocImgOpen,
  } = useDisclosure();
  const formMethods = useForm();
  const certificateFileRegister = useCertificateFileRegister();
  const updateCertificateInfoRegister = useUpdateCertificateInfo();
  const certificationInfoRegister = useCertificateInfoRegister();
  const [loading, setLoading] = useState(false);
  const [certificateInfo, setCertificateInfo] = useState<
    IDoctorCertificationInfo["certificate_document"]
  >([]);

  // const deleteCertificateInfoRegister = useDeleteCertificateInfo();

  // Define openAcademicModal as a boolean state variable
  // const [openCertificateModal, setOpenCertificateModal] = useState(false);

  // Define openAddAcademicModal as a boolean state variable
  // const [openCertificateAddModal, setOpenCertificateAddModal] = useState(false);

  const [editForm, setEditForm] = useState(false);

  const getCertificateInfo = async (id: number) => {
    try {
      const res = await getSingleCertificateInfo(id);
      setCertificateInfo(res.certificate_document);
    } catch (error) {
      const err = serverErrorResponse(error as AxiosError);
      toastFail(err);
    }
  };

  const handleFormUpdate = async () => {
    try {
      const certificateArray = formMethods.getValues("certification");
      const certificatePromises = certificateArray.map(
        async (certificate: CertificateInfo) => {
          const createCertificateFileResponse =
            await certificateFileRegister.mutateAsync(certificate);

          const certificateInfoData = {
            ...certificate,
            doctor: doctorProfileData?.id ?? 0,
            certificate_documents: createCertificateFileResponse.data.data.map(
              (file: string) => ({
                file: file,
              })
            ),
          };
          if (certificate.id) {
            const certificateInfoResponse =
              await updateCertificateInfoRegister.mutateAsync({
                id: Number(certificate.id),
                data: certificateInfoData,
              });
            if (certificateInfoResponse) {
              return certificateInfoResponse.data.data;
            } else {
              throw new Error("Failed to update academic information!");
            }
          } else {
            const certificateInfoResponse =
              await certificationInfoRegister.mutateAsync(certificateInfoData);
            if (certificateInfoResponse) {
              return certificateInfoResponse.data.data;
            } else {
              throw new Error("Failed to add Certificate information!");
            }
          }
        }
      );

      const certificateInfoResponses = await Promise.all(certificatePromises);
      if (certificateInfoResponses) {
        certificateInfoResponses.forEach((certificateInfoResponse, i) => {
          if (certificateInfoResponse) {
            certificateArray[i].id = certificateInfoResponse.id;
            formMethods.setValue(
              `certificate.${i}.id`,
              certificateInfoResponse.id
            );
          }
          formMethods.setValue(`certificate.${i}.isSubmitted`, true);
        });
        toastSuccess("Certificate Information updated");
      } else {
        throw new Error("Failed to update Certificate information!");
      }
    } catch (error) {
      const err = serverErrorResponse(error);

      toastFail(err);
    }
    setEditForm(false);
  };

  const handleDocImg = async (id: number) => {
    setLoading(true);
    onDocImgOpen();
    await getCertificateInfo(id);
    setLoading(false);
  };

  const handleCloseForm = () => {
    setEditForm(false);
  };
  return (
    <>
      <Card mb={"18px"} minHeight="77vh" maxHeight={"100%"}>
        <Box
          p={"20px"}
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Text
            fontWeight={"700"}
            fontSize={"18px"}
            lineHeight={"22px"}
            color={colors?.primary_dark1}
          >
            Certification Info
          </Text>
          {!editForm && (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              onClick={() => setEditForm(true)}
              cursor="pointer"
            >
              <Button
                px={6}
                borderRadius="xl"
                backgroundColor={colors.primary}
                _hover={{ bg: colors.primary_blue }}
              >
                <Icon as={EditIcon} boxSize={5} color={colors?.white} mr={3} />
                <Text
                  color={colors?.white}
                  fontWeight={"400"}
                  fontSize={"16px"}
                  lineHeight={"19px"}
                >
                  Edit
                </Text>
              </Button>
            </Box>
          )}
        </Box>
        <Box>
          <Divider />
        </Box>
        <CardBody>
          <ModalComponent
            heading={
              <HStack>
                <svgs.logo_small />
                <Text>List of Image</Text>
              </HStack>
            }
            isOpen={isDocImgOpen}
            onClose={onDocImgClose}
            footer={
              <HStack w="100%" gap={3}>
                <Button
                  flex={1}
                  onClick={onDocImgClose}
                  background={colors.primary}
                  color={colors.white}
                >
                  Done
                </Button>
              </HStack>
            }
          >
            <VStack>
              {loading ? (
                <Spinner />
              ) : (
                certificateInfo.map((e: any) => (
                  <AspectRatio width={"100%"} key={e?.id} ratio={16 / 9}>
                    <Image
                      key={e?.id}
                      objectFit="cover"
                      src={getImageUrl(e?.file)}
                    />
                  </AspectRatio>
                ))
              )}
            </VStack>
          </ModalComponent>

          {editForm ? (
            <FormProvider {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(handleFormUpdate)}>
                <Grid>
                  <GridItem
                    height={"60vh"}
                    css={{
                      "&::-webkit-scrollbar": {
                        width: "4px",
                      },
                      "&::-webkit-scrollbar-track": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: `${colors.light_gray}`,
                        borderRadius: "24px",
                      },
                      overflowY: "scroll",
                    }}
                  >
                    <CertificationInfoForm
                      editMode={true}
                      doctorProfileData={doctorProfileData}
                    />
                  </GridItem>
                  <GridItem>
                    <SubmitButton
                      handleCloseForm={handleCloseForm}
                      isLoading={
                        updateCertificateInfoRegister.isLoading ||
                        certificateFileRegister.isLoading
                      }
                    />
                  </GridItem>
                </Grid>
              </form>
            </FormProvider>
          ) : doctorProfileData?.doctor_certification_info?.length ? (
            doctorProfileData?.doctor_certification_info?.map(
              (singleCertificationInfo: IDoctorCertificationInfo, i) => {
                // const fileURL = singleCertificationInfo?.certificate_document
                //   ? `${normalURL}${singleCertificationInfo?.certificate_document}`
                //   : "";
                return (
                  <SimpleGrid
                    columns={
                      doctorProfileData?.doctor_certification_info?.length
                        ? { base: 1, md: 1, lg: 2, xl: 3 }
                        : undefined
                    }
                    borderBottom={`1px solid ${colors.grey_light}`}
                    pb={10}
                    key={i}
                  >
                    <GridItem colSpan={1} mt={"30px"} w="100%">
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
                      </VStack>
                    </GridItem>
                    <GridItem colSpan={1} mt={"30px"} w="100%">
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
                    <GridItem colSpan={1} mt={"30px"} w="100%">
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
                    <GridItem colSpan={1} mt={"30px"} w="100%">
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
                      </VStack>
                    </GridItem>

                    <GridItem colSpan={1} mt={"30px"} w="100%">
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
                            Document
                          </Text>
                          <Text
                            fontWeight={"600"}
                            fontSize={"16px"}
                            lineHeight={"19px"}
                            color={colors?.main}
                            cursor="pointer"
                            onClick={() =>
                              handleDocImg(singleCertificationInfo.id ?? 0)
                            }
                          >
                            :&nbsp;
                            {singleCertificationInfo?.certificate_document
                              ?.length === 1 ? (
                              <>
                                {
                                  singleCertificationInfo?.certificate_document
                                    ?.length
                                }
                                &nbsp; Image
                              </>
                            ) : (
                              <>
                                {
                                  singleCertificationInfo?.certificate_document
                                    ?.length
                                }
                                &nbsp; Images
                              </>
                            )}
                          </Text>
                        </Box>
                      </VStack>
                    </GridItem>
                  </SimpleGrid>
                );
              }
            )
          ) : (
            <Center>
              <Text>No Data Found</Text>
            </Center>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default EditCertification;
