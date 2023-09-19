// import React from "react";
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
import { ExperienceForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  IDoctorExperience,
  IGetDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import {
  ExperienceInfo,
  getSingleExperienceInfo,
  // useDeleteExperienceInfo,
  useExperienceFileRegister,
  useExperienceInfoRegister,
  useUpdateExperienceInfo,
} from "@nepMeds/service/nepmeds-experience";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";
import { AxiosError } from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
// import { AiOutlineMore } from "react-icons/ai";

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
        <Button onClick={handleCloseForm}>Cancel</Button>
      </GridItem>
      <GridItem colSpan={1}>
        <Button
          variant={"secondary"}
          borderRadius="xl"
          type="submit"
          isLoading={isLoading}
        >
          Update
        </Button>
      </GridItem>
    </Grid>
  );
};

const EditExperience = ({
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
  const experienceFileRegister = useExperienceFileRegister();
  const updateExperienceFileRegister = useUpdateExperienceInfo();
  const experienceInfoRegister = useExperienceInfoRegister();
  const [loading, setLoading] = useState(false);
  const [experienceInfo, setExperienceInfo] = useState<
    IDoctorExperience["experience_document"]
  >([]);
  const [editForm, setEditForm] = useState(false);

  const getExperienceInfo = async (id: number) => {
    try {
      const res = await getSingleExperienceInfo(id);
      setExperienceInfo(res.experience_document);
    } catch (error) {
      const err = serverErrorResponse(error);
      error as AxiosError;
      toastFail(err);
    }
  };

  const handleFormUpdate = async () => {
    try {
      const experienceArray = formMethods.getValues("experience");
      const certificatePromises = experienceArray.map(
        async (experience: ExperienceInfo) => {
          const createExperienceFileResponse =
            await experienceFileRegister.mutateAsync(experience);
          const experienceInfoData = {
            ...experience,
            doctor: doctorProfileData.id ?? 0,
            experience_documents: createExperienceFileResponse.data.data.map(
              (file: string) => ({
                file: file,
              })
            ),
          };
          if (experience.currently_working) {
            delete experienceInfoData.to_date; // Remove 'to_date' property when currently_working is true
          }

          if (experience.id) {
            const expeirenceInfoResponse =
              await updateExperienceFileRegister.mutateAsync({
                id: Number(experience.id),
                data: experienceInfoData,
              });
            if (expeirenceInfoResponse) {
              return expeirenceInfoResponse.data.data;
            } else {
              throw new Error("Failed to update academic information!");
            }
          } else {
            const expeirenceInfoResponse =
              await experienceInfoRegister.mutateAsync(experienceInfoData);
            if (expeirenceInfoResponse) {
              return expeirenceInfoResponse.data.data;
            } else {
              throw new Error("Failed to add Certificate information!");
            }
          }
        }
      );

      const experienceResponseInfos = await Promise.all(certificatePromises);
      if (experienceResponseInfos) {
        experienceResponseInfos.forEach((certInfoRes, i) => {
          if (certInfoRes) {
            experienceArray[i].id = certInfoRes.id;
            formMethods.setValue(`experience.${i}.id`, certInfoRes.id);
          }
          formMethods.setValue(`experience.${i}.isSubmitted`, true);
        });
        toastSuccess("Experience Information updated");
      } else {
        throw new Error("Failed to update Experience information!");
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
    await getExperienceInfo(id);
    setLoading(false);
  };

  const handleCloseForm = () => {
    setEditForm(false);
  };
  return (
    <>
      <Card
        minHeight={"77vh"}
        maxHeight={"77vh"}
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
            Experience Info
          </Text>
          {!editForm && (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              onClick={() => setEditForm(true)}
              cursor="pointer"
            >
              <Button borderRadius="xl">
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
            <VStack bg={colors.grey_50}>
              {loading ? (
                <Spinner />
              ) : (
                experienceInfo.map((e: any) => (
                  <AspectRatio width={"100%"} key={e?.id} ratio={16 / 9}>
                    <Image
                      key={e?.id}
                      objectFit="cover"
                      src={getImageUrl(e?.file)}
                      p={"20px"}
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
                    <ExperienceForm doctorProfileData={doctorProfileData} />
                  </GridItem>
                  <GridItem>
                    <SubmitButton
                      handleCloseForm={handleCloseForm}
                      isLoading={
                        updateExperienceFileRegister.isLoading ||
                        experienceFileRegister.isLoading
                      }
                    />
                  </GridItem>
                </Grid>
              </form>
            </FormProvider>
          ) : doctorProfileData?.doctor_experience?.length ? (
            doctorProfileData?.doctor_experience?.map(
              (singleExperience: IDoctorExperience, i) => {
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
                      <VStack spacing={5} align="flex-start">
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"16px"}
                            letterSpacing={"0.4px"}
                            color={"#4D4D4D"}
                            w={"180px"}
                          >
                            Hospital/ Clinic Name
                          </Text>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"19px"}
                            color={colors?.black}
                          >
                            :&nbsp;{singleExperience?.hospital}
                          </Text>
                        </Box>
                      </VStack>
                    </GridItem>
                    <GridItem colSpan={1} mt={"30px"} w="100%">
                      <VStack spacing={1} align="stretch">
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"16px"}
                            letterSpacing={"0.4px"}
                            color={"#4D4D4D"}
                            w={"50px"}
                          >
                            From
                          </Text>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"19px"}
                            color={colors?.black}
                          >
                            :&nbsp;{singleExperience?.from_date}
                          </Text>
                        </Box>
                      </VStack>
                    </GridItem>
                    <GridItem
                      // colSpan={1}
                      colSpan={{ md: 3, lg: 3, xl: 1 }}
                      mt={"30px"}
                      w="100%"
                    >
                      <VStack
                        spacing={1}
                        align={
                          singleExperience?.currently_working
                            ? "center"
                            : "stretch"
                        }
                      >
                        <Box display={"flex"} alignItems={"center"} gap={3}>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"16px"}
                            letterSpacing={"0.4px"}
                            color={"#4D4D4D"}
                            w={"20px"}
                          >
                            {singleExperience?.currently_working ? (
                              <Text>Currently Working</Text>
                            ) : (
                              <>To</>
                            )}
                          </Text>
                          {singleExperience?.currently_working !== true && (
                            <Text
                              fontWeight={"500"}
                              fontSize={"sm"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleExperience?.to_date}
                            </Text>
                          )}
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
                            color={"#4D4D4D"}
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
                            onClick={() =>
                              handleDocImg(singleExperience.id ?? 0)
                            }
                          >
                            :&nbsp;
                            {singleExperience?.experience_document?.length ===
                            1 ? (
                              <>
                                {singleExperience?.experience_document?.length}
                                &nbsp; Image
                              </>
                            ) : (
                              <>
                                {singleExperience?.experience_document?.length}
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

export default EditExperience;
