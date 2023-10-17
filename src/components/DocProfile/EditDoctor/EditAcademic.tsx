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
import { toastFail } from "@nepMeds/components/Toast";
import {
  useAcademicFileRegister,
  useAcademicInfoRegisterProfile,
  useUpdateAcademicInfo,
} from "@nepMeds/service/nepmeds-academic";
import {
  IDoctorAcademicInfo,
  IGetDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { showImagesIndexWise } from "@nepMeds/utils/getArrayWithIndex";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface handleFormUpdateProps {
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

  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleEditMode = () => {
    setShowEditForm(true);
  };
  const [index, setIndex] = useState(0);

  const handleCloseForm = () => {
    setShowEditForm(false);
  };

  const formMethods = useForm();
  // const downloadImageFile = useDownloadImage();
  const academicFileRegister = useAcademicFileRegister();
  const updateAcademicInfoRegister = useUpdateAcademicInfo();
  const academicInfoRegister = useAcademicInfoRegisterProfile();

  const handleFormUpdate = async () => {
    try {
      const academicArray = formMethods.getValues("academic");
      const academicDataArray: any[] = [];

      for (const element of academicArray) {
        const createAcademicFileResponse =
          await academicFileRegister.mutateAsync(element);
        const data = {
          ...element,
          doctor: doctorProfileData?.id ?? 0,
          academic_documents: createAcademicFileResponse.data.data.map(
            (file: string) => ({
              file: file,
            })
          ),
        };

        const partialData: Partial<{
          doctor: number;
          academic_documents: any;
          degree_program: string;
          major: string;
          id: number;
          university: string;
          other_university: string;
          graduation_year: string;
          isSubmitted: boolean;
        }> = data;
        data?.university === "0"
          ? delete partialData?.university
          : delete partialData?.other_university;

        academicDataArray.push(
          partialData as {
            doctor: number;
            academic_documents: any;
            degree_program: string;
            major: string;
            id: number;
            university: string;
            other_university: string;
            graduation_year: string;
            isSubmitted: boolean;
          }
        );
      }

      if (doctorProfileData?.doctor_academic_info?.length === 0) {
        await academicInfoRegister.mutateAsync(academicDataArray as any);
      } else {
        await updateAcademicInfoRegister.mutateAsync(academicDataArray);
      }
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
    setShowEditForm(false);
  };

  const handleDocImg = async (i: number) => {
    setLoading(true);
    onDocImgOpen();
    setIndex(i);
    setLoading(false);
  };

  return (
    <>
      <Card
        mb={"18px"}
        height={"85dvh"}
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
        <Box
          p={"20px"}
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Text
            fontWeight={"700"}
            fontSize={"lg"}
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
              {/* TODO: add button with icon */}
              <Button px={6} borderRadius="xl">
                <Icon as={EditIcon} boxSize={5} color={colors?.white} mr={3} />
                <Text
                  color={colors?.white}
                  fontWeight={"400"}
                  fontSize={"md"}
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
            size={"4xl"}
            footer={
              <HStack w="100%" gap={3}>
                <Button flex={1} onClick={onDocImgClose}>
                  Done
                </Button>
              </HStack>
            }
          >
            <VStack bg={colors.grey_90}>
              {loading && <Spinner />}
              {!loading &&
              doctorProfileData?.doctor_academic_info?.length === 0 ? (
                <>No Images Found!</>
              ) : (
                showImagesIndexWise?.(
                  doctorProfileData?.doctor_academic_info,
                  index
                )?.academic_document?.map(
                  ({ file, id }: { file: string; id: number }) => (
                    <AspectRatio width={"100%"} key={id} ratio={16 / 9}>
                      <Image
                        key={id}
                        objectFit="cover"
                        src={getImageUrl(file)}
                        boxShadow={"4px 5px 40px rgba(43, 102, 177, 0.05)"}
                        p={"20px"}
                      />
                    </AspectRatio>
                  )
                )
              )}
            </VStack>
          </ModalComponent>

          {showEditForm ? (
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
                    <AcademicInfoForm doctorProfileData={doctorProfileData} />
                  </GridItem>
                  <GridItem>
                    <SubmitButton
                      handleCloseForm={handleCloseForm}
                      isLoading={
                        updateAcademicInfoRegister.isLoading ||
                        academicFileRegister.isLoading
                      }
                    />
                  </GridItem>
                </Grid>
              </form>
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
                    <GridItem colSpan={1} mt={"30px"} w="100%" gap={4}>
                      <VStack spacing={10} align="stretch">
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"16px"}
                            letterSpacing={"0.4px"}
                            color={colors.grey_100}
                            w={"94px"}
                          >
                            Degree
                          </Text>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"19px"}
                            color={colors?.black}
                          >
                            :&nbsp;{singleAcademicInfo?.degree_program}
                          </Text>
                        </Box>
                        <Box display={"flex"} alignItems={"center"} gap={3}>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"16px"}
                            letterSpacing={"0.4px"}
                            color={colors.grey_100}
                            w={"94px"}
                          >
                            Passed Year
                          </Text>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"19px"}
                            color={colors?.black}
                          >
                            :&nbsp;{singleAcademicInfo?.graduation_year}
                          </Text>
                        </Box>
                      </VStack>
                    </GridItem>
                    <GridItem colSpan={1} mt={"30px"} w="100%">
                      <VStack spacing={5} align="stretch">
                        <Box display={"flex"} alignItems={"center"} gap={3}>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"16px"}
                            letterSpacing={"0.4px"}
                            color={colors.grey_100}
                            w={"94px"}
                          >
                            College/ Uni
                          </Text>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"19px"}
                            color={colors?.black}
                          >
                            :&nbsp;
                            {singleAcademicInfo?.other_university ||
                              singleAcademicInfo?.university_name}
                          </Text>
                        </Box>
                        <Box display={"flex"} alignItems={"center"} gap={3}>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"16px"}
                            letterSpacing={"0.4px"}
                            color={colors.grey_100}
                            w={"94px"}
                          >
                            Tole
                          </Text>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"19px"}
                            color={colors?.black}
                          >
                            :&nbsp;{singleAcademicInfo?.degree_program}
                          </Text>
                        </Box>
                      </VStack>
                    </GridItem>
                    <GridItem colSpan={1} mt={"30px"} w="100%">
                      <VStack spacing={10} align="stretch">
                        <Box display={"flex"} alignItems={"center"} gap={3}>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"16px"}
                            letterSpacing={"0.4px"}
                            color={colors.grey_100}
                            w={"94px"}
                          >
                            Major
                          </Text>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"19px"}
                            color={colors?.black}
                          >
                            :&nbsp;{singleAcademicInfo?.major}
                          </Text>
                        </Box>
                        <Box display={"flex"} alignItems={"center"} gap={3}>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"16px"}
                            letterSpacing={"0.4px"}
                            color={colors.grey_100}
                            w={"94px"}
                          >
                            Document
                          </Text>
                          <Text
                            fontWeight={"600"}
                            fontSize={"sm"}
                            lineHeight={"19px"}
                            color={colors?.main}
                            cursor="pointer"
                            onClick={() => handleDocImg(i)}
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
  handleCloseForm,
  isLoading,
}) => {
  return (
    <Grid
      borderTop={`1px solid ${colors.grey_light}`}
      py={5}
      className="test"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
      gap={2}
    >
      <GridItem colSpan={1}>
        <Button variant={"primaryOutline"} onClick={handleCloseForm}>
          Cancel
        </Button>
      </GridItem>
      <GridItem colSpan={1}>
        <Button
          // borderRadius="xl"
          type="submit"
          isLoading={isLoading}
        >
          Update
        </Button>
      </GridItem>
    </Grid>
  );
};
export default EditAcademic;
