import { EditIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Grid,
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
import { AcademicInfoForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  AcademicInfo,
  getSingleAcademicInfo,
  useAcademicFileRegister,
  useAcademicInfoRegister,
  useUpdateAcademicInfo,
} from "@nepMeds/service/nepmeds-academic";
import {
  IDoctorAcademicInfo,
  IGetDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";
import { AxiosError } from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface handleFormUpdateProps {
  handleFormUpdate: () => void;
  handleCloseForm: () => void;
  isLoading: boolean;
}

const EditAcademic = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const {
    isOpen: isDocImgOpen,
    onClose: onDocImgClose,
    onOpen: onDocImgOpen,
  } = useDisclosure();
  const [academicInfo, setAcademicInfo] = useState<
    IDoctorAcademicInfo["academic_document"]
  >([]);

  const getAcademicInfo = async (id: number) => {
    try {
      const res = await getSingleAcademicInfo(id);
      setAcademicInfo(res.academic_document);
    } catch (error) {
      const err = serverErrorResponse(error as AxiosError);
      toastFail(err);
    }
  };

  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleEditMode = () => {
    setShowEditForm(true);
  };

  const handleCloseForm = () => {
    setShowEditForm(false);
  };

  const formMethods = useForm();
  const academicFileRegister = useAcademicFileRegister();
  const updateAcademicInfoRegister = useUpdateAcademicInfo();
  const academicInfoRegister = useAcademicInfoRegister();
  const handleFormUpdate = async () => {
    try {
      const academicArray = formMethods.getValues("academic");
      const academicPromises = academicArray.map(
        async (academicData: AcademicInfo) => {
          const createAcademicFileResponse =
            await academicFileRegister.mutateAsync(academicData);

          const academicInfoData = {
            ...academicData,
            doctor: doctorProfileData?.id ?? 0,
            academic_documents: createAcademicFileResponse.data.data.map(
              (file: string) => ({
                file: file,
              })
            ),
          };
          if (academicData.id) {
            const academicInfoResponse =
              await updateAcademicInfoRegister.mutateAsync({
                id: parseInt(academicData.id),
                data: academicInfoData,
              });

            if (academicInfoResponse) {
              return academicInfoResponse.data.data;
            } else {
              throw new Error("Failed to update academic information!");
            }
          } else {
            const academicInfoResponse = await academicInfoRegister.mutateAsync(
              academicInfoData
            );
            if (academicInfoResponse) {
              return academicInfoResponse.data.data;
            } else {
              throw new Error("Failed to add academic information!");
            }
          }
        }
      );

      const academicInfoResponses = await Promise.all(academicPromises);

      if (academicInfoResponses) {
        // Process the responses or perform any required actions
        academicInfoResponses.forEach((academicInfoResponse, index) => {
          if (academicInfoResponse) {
            const lastValue = index;
            formMethods.setValue(
              `academic.${lastValue}.id`,
              academicInfoResponse.id
            );
            formMethods.setValue(`academic.${lastValue}.isSubmitted`, true);
          }
        });

        toastSuccess("Academic Information updated");
      } else {
        throw new Error("Failed to update academic information!");
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
    setShowEditForm(false);
  };

  const handleDocImg = async (id: number) => {
    setLoading(true);
    onDocImgOpen();
    await getAcademicInfo(id);
    setLoading(false);
  };

  return (
    <>
      <Card mb={"18px"} minHeight={"77vh"} maxHeight={"100%"}>
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
            Academic Info
          </Text>
          {!showEditForm && (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              onClick={handleEditMode}
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
                academicInfo.map((e: any) => (
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

          {showEditForm ? (
            <FormProvider {...formMethods}>
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
                  <AcademicInfoForm doctorProfileData={doctorProfileData} />
                </GridItem>
                <GridItem>
                  <SubmitButton
                    handleFormUpdate={handleFormUpdate}
                    handleCloseForm={handleCloseForm}
                    isLoading={
                      updateAcademicInfoRegister.isLoading ||
                      academicFileRegister.isLoading
                    }
                  />
                </GridItem>
              </Grid>
            </FormProvider>
          ) : doctorProfileData?.doctor_academic_info?.length ? (
            doctorProfileData?.doctor_academic_info?.map(
              (singleAcademicInfo: IDoctorAcademicInfo, i) => {
                return (
                  <SimpleGrid
                    columns={
                      // doctorProfileData?.doctor_certification_info?.length
                      // ?
                      { base: 1, md: 1, lg: 2, xl: 3 }
                      // : undefined
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
                        <Box display={"flex"} alignItems={"center"} gap={3}>
                          <Text
                            fontWeight={"500"}
                            fontSize={"14px"}
                            lineHeight={"16px"}
                            letterSpacing={"0.4px"}
                            color={"#4D4D4D"}
                            w={"94px"}
                          >
                            Tole
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
                              handleDocImg(singleAcademicInfo.id ?? 0)
                            }
                          >
                            :&nbsp;
                            {singleAcademicInfo?.academic_document?.length ===
                            1 ? (
                              <>
                                {singleAcademicInfo?.academic_document?.length}
                                &nbsp; Image
                              </>
                            ) : (
                              <>
                                {singleAcademicInfo?.academic_document?.length}
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

const SubmitButton: React.FC<handleFormUpdateProps> = ({
  handleFormUpdate,
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
          onClick={handleFormUpdate}
          isLoading={isLoading}
        >
          Update
        </Button>
      </GridItem>
    </Grid>
  );
};
export default EditAcademic;
