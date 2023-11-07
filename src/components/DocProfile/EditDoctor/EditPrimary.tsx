import { EditIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Tag,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { PrimaryInfoForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { PRIMARYIDTYPE } from "@nepMeds/config/enum";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import {
  PrimaryInfo,
  useUpdatePersonalInfoRegister,
} from "@nepMeds/service/nepmeds-register";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";
import { imageToBase64 } from "@nepMeds/utils/imgToBase64";
import React from "react";
import {
  FieldValues,
  FormProvider,
  UseFormReturn,
  useForm,
} from "react-hook-form";

const EditPrimaryForm = ({
  formMethods,
  doctorProfileData,
}: {
  formMethods: UseFormReturn<FieldValues, any>;
  doctorProfileData: IGetDoctorProfile;
}) => {
  return (
    <>
      <VStack p={5}>
        <FormProvider {...formMethods}>
          <PrimaryInfoForm
            doctorProfileData={doctorProfileData}
            isEditable={true}
          />
        </FormProvider>
      </VStack>
    </>
  );
};

interface handleFormUpdateProps {
  handleFormUpdate: () => void;
  cancelButton: () => void;
  isLoading: boolean;
}

const SubmitButton: React.FC<handleFormUpdateProps> = ({
  cancelButton,
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
        <Button variant={"primaryOutline"} onClick={cancelButton}>
          Cancel
        </Button>
      </GridItem>
      <GridItem colSpan={1}>
        <Button borderRadius="xl" type="submit" isLoading={isLoading}>
          Update
        </Button>
      </GridItem>
    </Grid>
  );
};

const EditPrimary = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const { isOpen: isPrimaryOpen, onClose: onPrimaryClose } = useDisclosure();
  const formMethods = useForm();
  const updatePrimaryData = useUpdatePersonalInfoRegister();

  const [editPrimaryFormToggle, setEditPrimaryFormToggle] =
    React.useState(false);
  const onSavePrimaryInfo = async () => {
    const { getValues } = formMethods;
    const editSpecializationData =
      doctorProfileData?.specialization_names ?? [];

    try {
      const frontImage = getValues("id_front_image")?.[0];
      const backImage = getValues("id_back_image")?.[0];

      const user = {
        province: getValues("province"),
        district: getValues("district"),
        municipality: getValues("municipality"),
        ward: getValues("ward"),
        tole: getValues("tole"),
        gender: getValues("gender"),
        mobile_number: getValues("mobile_number"),
      };

      const doctorProfile = {
        id: doctorProfileData?.id,
        user: user,
        specialization: (getValues("specialization_names")
          ? getValues("specialization_names")
          : editSpecializationData
        ).map(
          (e: { label: string; value: string; id?: number }) =>
            Number(e.value) || Number(e.id)
        ),
        pan_number: getValues("pan_number"),
        id_type: getValues("id_type"),
        id_number: getValues("id_number"),
        id_issued_district: getValues("id_issued_district"),
        id_issued_date: getValues("id_issued_date"),
        title: getValues("title"),
        bio_detail: getValues("bio_detail"),
        age: 20,
        medical_degree: "test",
        designation: "Test",
      } as PrimaryInfo;

      if (frontImage) {
        doctorProfile.id_front_image = await imageToBase64(frontImage);
      }
      if (backImage) {
        doctorProfile.id_back_image = await imageToBase64(backImage);
      }

      await updatePrimaryData.mutateAsync(doctorProfile);
      toastSuccess("Personal information updated successfully!");
      setEditPrimaryFormToggle(false);
    } catch (error) {
      const err = serverErrorResponse(error);

      toastFail(err);
    }
  };

  return (
    <>
      <Card mb={"18px"} minHeight={"70vh"} maxHeight={"100%"}>
        <Box
          p={7}
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
            Primary Information
          </Text>
          {!editPrimaryFormToggle ? (
            <Button
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              onClick={() => setEditPrimaryFormToggle(true)}
              cursor="pointer"
              borderRadius="xl"
            >
              <Icon
                as={EditIcon}
                boxSize={5}
                color={colors?.white}
                mr={"8px"}
              />
              <Text
                color={colors?.white}
                fontWeight={"400"}
                fontSize={"md"}
                lineHeight={"19px"}
              >
                Edit
              </Text>
            </Button>
          ) : null}
        </Box>
        <Box>
          <Divider />
        </Box>
        {editPrimaryFormToggle ? (
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSavePrimaryInfo)}>
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
                      // background: scrollbarColor,
                      background: `${colors.light_gray}`,
                      borderRadius: "24px",
                    },
                  }}
                  overflow="scroll"
                >
                  <EditPrimaryForm
                    formMethods={formMethods}
                    doctorProfileData={doctorProfileData}
                  />
                </GridItem>
                <GridItem>
                  <SubmitButton
                    handleFormUpdate={onSavePrimaryInfo}
                    cancelButton={() => setEditPrimaryFormToggle(false)}
                    isLoading={updatePrimaryData.isLoading}
                  />
                </GridItem>
              </Grid>
            </form>
          </FormProvider>
        ) : (
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
                <PrimaryInfoForm
                  doctorProfileData={doctorProfileData}
                  isEditable={true}
                />
              </VStack>
            </ModalComponent>
            <Flex flexDirection={"row"} wrap={{ base: "wrap", xl: "nowrap" }}>
              <Box w="100%">
                <VStack spacing={5} align="stretch">
                  <Flex gap={{ base: 3, xl: 0 }}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                      flexBasis={{ base: "18%", xl: "24%" }}
                    >
                      Mobile No
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.mobile_number}
                    </Text>
                  </Flex>
                  <Flex gap={{ base: 3, xl: 0 }}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                      flexBasis={{ base: "18%", xl: "24%" }}
                    >
                      Email
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.email}
                    </Text>
                  </Flex>
                </VStack>
              </Box>
              <Box w="65%">
                <VStack spacing={5} align="stretch">
                  <Flex gap={{ base: 3, xl: 0 }}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                      flexBasis={{ base: "28%", xl: "50%" }}
                    >
                      Gender
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                      flexBasis={"50%"}
                    >
                      :&nbsp;{doctorProfileData?.user?.gender}
                    </Text>
                  </Flex>
                  <Flex gap={{ base: 3, xl: 0 }}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                      flexBasis={{ base: "28%", xl: "50%" }}
                    >
                      Date of Birth
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                      flexBasis={"50%"}
                    >
                      :&nbsp;{doctorProfileData?.user?.date_of_birth}
                    </Text>
                  </Flex>
                </VStack>
              </Box>
              <Box w="50%">
                <VStack spacing={5} align="stretch">
                  <Flex gap={{ base: 3, xl: 0 }}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                      flexBasis={{ base: "37%", xl: "50%" }}
                    >
                      Pan No.
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.pan_number}
                    </Text>
                  </Flex>
                  <Flex gap={{ base: 3, xl: 0 }}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                      flexBasis={{ base: "37%", xl: "50%" }}
                    >
                      ID Type
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                      flexBasis={"50%"}
                    >
                      :&nbsp;
                      {
                        PRIMARYIDTYPE[
                          doctorProfileData.id_type as keyof typeof PRIMARYIDTYPE
                        ]
                      }
                    </Text>
                  </Flex>
                </VStack>
              </Box>
            </Flex>
            <Box
              w={"full"}
              mt={4}
              display={"flex"}
              alignItems={"center"}
              gap={3}
            >
              <Text
                fontWeight={"500"}
                fontSize={"sm"}
                lineHeight={"16px"}
                letterSpacing={"0.4px"}
                color={colors.grey_100}
              >
                Specialization
              </Text>

              <Text
                fontWeight={"500"}
                fontSize={"md"}
                lineHeight={"19px"}
                color={colors?.black}
                display="flex"
                justifyContent={"space-around"}
              >
                : &nbsp;
                {doctorProfileData &&
                  doctorProfileData?.specialization_names?.map(s => {
                    return (
                      <Tag
                        key={s.id ?? s}
                        color={colors.main}
                        bg={colors.lightish_blue}
                        mx={1}
                      >
                        {s.name ?? s}
                      </Tag>
                    );
                  })}
              </Text>
            </Box>
            <Box mt={5}>
              <Text
                fontWeight={"500"}
                fontSize={"sm"}
                lineHeight={"16px"}
                letterSpacing={"0.4px"}
                color={colors.grey_100}
              >
                {
                  PRIMARYIDTYPE[
                    doctorProfileData.id_type as keyof typeof PRIMARYIDTYPE
                  ]
                }{" "}
                Detail
              </Text>
            </Box>
            <Grid mt={5} templateColumns="repeat(2,1fr)" gap={2}>
              <GridItem colSpan={1}>
                <AspectRatio ratio={16 / 7}>
                  <Image
                    src={getImageUrl(String(doctorProfileData?.id_front_image))}
                    objectFit="cover"
                    cursor={"pointer"}
                    onClick={() =>
                      window.open(
                        getImageUrl(String(doctorProfileData?.id_front_image)),
                        "_blank"
                      )
                    }
                  />
                </AspectRatio>
              </GridItem>
              <GridItem colSpan={1}>
                <AspectRatio ratio={16 / 7}>
                  <Image
                    src={getImageUrl(String(doctorProfileData?.id_back_image))}
                    objectFit="cover"
                    cursor={"pointer"}
                    onClick={() =>
                      window.open(
                        getImageUrl(String(doctorProfileData?.id_back_image)),
                        "_blank"
                      )
                    }
                  />
                </AspectRatio>
              </GridItem>
            </Grid>
            <SimpleGrid
              mt={5}
              // templateColumns="repeat(3, 1fr)"
              columns={{ base: 1, md: 1, lg: 2, xl: 3 }}
            >
              <GridItem w="100%">
                <VStack spacing={5} align="stretch">
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                    >
                      {
                        PRIMARYIDTYPE[
                          doctorProfileData.id_type as keyof typeof PRIMARYIDTYPE
                        ]
                      }{" "}
                      No.
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.id_number}
                    </Text>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                    >
                      Province
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.province_data?.name}
                    </Text>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                    >
                      Ward
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.ward}
                    </Text>
                  </Box>
                </VStack>
              </GridItem>
              <GridItem w="100%">
                <VStack spacing={5} align="stretch">
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                    >
                      Issued District
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.issued_district?.name}
                    </Text>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                    >
                      District
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.district_data?.name}
                    </Text>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                    >
                      Tole
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.tole}
                    </Text>
                  </Box>
                </VStack>
              </GridItem>
              <GridItem w="100%">
                <VStack spacing={5} align="stretch">
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                    >
                      Issued Date
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.id_issued_date}
                    </Text>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={colors.grey_100}
                    >
                      Municipality
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.municipality_data?.name}
                    </Text>
                  </Box>
                </VStack>
              </GridItem>
            </SimpleGrid>
          </CardBody>
        )}
      </Card>
    </>
  );
};

export default EditPrimary;
