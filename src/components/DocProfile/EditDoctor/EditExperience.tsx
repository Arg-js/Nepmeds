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
  useDisclosure
} from "@chakra-ui/react";

import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { ExperienceForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  IDoctorExperience,
  IGetDoctorProfile
} from "@nepMeds/service/nepmeds-doctor-profile";
import {
  // useDeleteExperienceInfo,
  useExperienceFileRegister,
  useExperienceInfoRegisterProfile,
  useUpdateExperienceInfo
} from "@nepMeds/service/nepmeds-experience";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { showImagesIndexWise } from "@nepMeds/utils/getArrayWithIndex";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
// import { AiOutlineMore } from "react-icons/ai";

interface handleFormUpdateProps {
  handleCloseForm: () => void;
  isLoading: boolean;
}

const SubmitButton: React.FC<handleFormUpdateProps> = ({
  handleCloseForm,
  isLoading
}) => {
  return (
    <Grid
      borderTop={`1px solid ${colors.grey_light}`}
      py={5}
      className="test"
      style={{
        display: "flex",
        justifyContent: "space-between"
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
  doctorProfileData
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const {
    isOpen: isDocImgOpen,
    onClose: onDocImgClose,
    onOpen: onDocImgOpen
  } = useDisclosure();
  const formMethods = useForm();
  const experienceFileRegister = useExperienceFileRegister();
  const updateExperienceFileRegister = useUpdateExperienceInfo();
  const experienceInfoRegister = useExperienceInfoRegisterProfile();
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);

  const [editForm, setEditForm] = useState(false);

  const handleFormUpdate = async () => {
    try {
      const experienceArray = formMethods.getValues("experience");
      const experienceDataArray: any[] = [];

      for (const element of experienceArray) {
        if (element?.currently_working) {
          delete element?.to_date;
        }
        const createExperienceFileResponse =
          await experienceFileRegister.mutateAsync(element);

        experienceDataArray.push({
          ...element,
          doctor: doctorProfileData?.id ?? 0,
          experience_documents: createExperienceFileResponse.data.data.map(
            (file: string) => ({
              file: file
            })
          )
        });
      }

      if (doctorProfileData?.doctor_experience?.length === 0) {
        await experienceInfoRegister.mutateAsync(experienceDataArray as any);
      } else {
        await updateExperienceFileRegister.mutateAsync(experienceDataArray);
      }

      toastSuccess("Experience data updated successfully");
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
    setEditForm(false);
  };
  const handleDocImg = async (ind: number) => {
    setLoading(true);
    onDocImgOpen();
    setIndex(ind);
    setLoading(false);
  };

  const handleCloseForm = () => {
    setEditForm(false);
  };
  return (
    <>
      <Card
        height={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px"
          },
          "&::-webkit-scrollbar-track": {
            width: "6px"
          },
          "&::-webkit-scrollbar-thumb": {
            background: `${colors.light_gray}`,
            borderRadius: "24px"
          },
          overflowY: "scroll"
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
                showImagesIndexWise?.(
                  doctorProfileData?.doctor_experience,
                  index
                )?.experience_document?.map((e: any) => (
                  <AspectRatio width={"100%"} key={e?.id} ratio={16 / 9}>
                    <Image
                      key={e?.id}
                      objectFit="cover"
                      src={getImageUrl(e.file)}
                      boxShadow={"4px 5px 40px rgba(43, 102, 177, 0.05)"}
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
                        width: "4px"
                      },
                      "&::-webkit-scrollbar-track": {
                        width: "6px"
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: `${colors.light_gray}`,
                        borderRadius: "24px"
                      },
                      overflowY: "scroll"
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
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"16px"}
                            letterSpacing={"0.4px"}
                            color={colors.grey_100}
                            w={"auto"}
                          >
                            Hospital/ Clinic Name
                          </Text>
                          <Text
                            fontWeight={"500"}
                            fontSize={"sm"}
                            lineHeight={"19px"}
                            color={colors?.black}
                          >
                            :&nbsp;{singleExperience?.hospital as string}
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
                            color={colors.grey_100}
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
                      <VStack spacing={1} align={"stretch"}>
                        {singleExperience?.currently_working ? (
                          <Text
                            fontWeight={"700"}
                            fontSize={"sm"}
                            lineHeight={"16px"}
                            letterSpacing={"0.4px"}
                            color={colors.grey_100}
                          >
                            Currently Working
                          </Text>
                        ) : (
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"sm"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={colors.grey_100}
                              w={"20px"}
                            >
                              To
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
                        )}
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
