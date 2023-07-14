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
import {
  IGetDoctorProfile,
  IUser,
} from "@nepMeds/service/nepmeds-doctor-profile";
import {
  PrimaryInfo,
  useUpdatePersonalInfoRegister,
} from "@nepMeds/service/nepmeds-register";
import { normalURL } from "@nepMeds/service/service-axios";
import { colors } from "@nepMeds/theme/colors";
import { imageToBase64 } from "@nepMeds/utils/imgToBase64";
import { AxiosError } from "axios";
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
  handleFormUpdate,
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
        <Button
          px={6}
          // borderRadius="xl"
          // backgroundColor={colors.primary}
          // _hover={{ bg: colors.primary_blue }}
          // color={colors.white}
          onClick={cancelButton}
        >
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
    try {
      const frontImage = getValues("id_front_image")?.[0];
      const backImage = getValues("id_back_image")?.[0];

      const user = {
        first_name: getValues("first_name"),
        middle_name: getValues("middle_name"),
        last_name: getValues("last_name"),
        province: getValues("province"),
        district: getValues("district"),
        municipality: getValues("municipality"),
        ward: getValues("ward"),
        tole: getValues("tole"),
      } as IUser;

      const doctorProfile = {
        user: user,
        specialization: getValues("specialization").map(
          (e: { id: string; value: string }) => Number(e.value)
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
      const err = error as AxiosError<{ errors: [0] }>;
      const errorObject = err?.response?.data?.errors?.[0];
      const firstErrorMessage = errorObject
        ? Object.values(errorObject)[0]
        : null;
      toastFail(
        firstErrorMessage?.toString() || "Failed to edit basic information!"
      );
    }
  };

  return (
    <>
      <Card mb={"18px"} minHeight={"80vh"} maxHeight={"100%"}>
        <Box
          p={7}
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
            Primary Information
          </Text>
          {!editPrimaryFormToggle ? (
            <Button
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              // onClick={onPrimaryOpen}
              onClick={() => setEditPrimaryFormToggle(true)}
              cursor="pointer"
              borderRadius="xl"
              backgroundColor={colors.primary}
              _hover={{ bg: colors.primary_blue }}
              px={6}
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
                fontSize={"16px"}
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
                <VStack spacing={4} align="stretch">
                  <Flex gap={{ base: 3, xl: 0 }}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"14px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                      flexBasis={{ base: "18%", xl: "24%" }}
                    >
                      Mobile No
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.mobile_number}
                    </Text>
                  </Flex>
                  <Flex gap={{ base: 3, xl: 0 }}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"14px"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                      flexBasis={{ base: "18%", xl: "24%" }}
                    >
                      Email
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.email}
                    </Text>
                  </Flex>
                </VStack>
              </Box>
              <Box w="65%">
                <VStack spacing={4} align="stretch">
                  <Flex gap={{ base: 3, xl: 0 }}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"14px"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                      flexBasis={{ base: "28%", xl: "50%" }}
                    >
                      Gender
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
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
                      fontSize={"14px"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                      flexBasis={{ base: "28%", xl: "50%" }}

                      //
                    >
                      Date of Birth
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
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
                <VStack spacing={4} align="stretch">
                  <Flex gap={{ base: 3, xl: 0 }}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"14px"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                      flexBasis={{ base: "37%", xl: "50%" }}
                    >
                      Pan No.
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.pan_number}
                    </Text>
                  </Flex>
                  <Flex gap={{ base: 3, xl: 0 }}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"14px"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                      flexBasis={{ base: "37%", xl: "50%" }}
                    >
                      ID Type
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
                      lineHeight={"19px"}
                      color={colors?.black}
                      flexBasis={"50%"}
                    >
                      :&nbsp;{doctorProfileData.id_type}
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
                fontSize={"14px"}
                lineHeight={"16px"}
                letterSpacing={"0.4px"}
                color={"#4D4D4D"}
              >
                Specialization
              </Text>

              <Text
                fontWeight={"500"}
                fontSize={"16px"}
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
                        bg={"#c4d2e8"}
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
                fontSize={"14px"}
                lineHeight={"16px"}
                letterSpacing={"0.4px"}
                color={"#4D4D4D"}
              >
                {doctorProfileData?.id_type} Detail
              </Text>
            </Box>
            <Grid mt={5} templateColumns="repeat(2,1fr)" gap={2}>
              <GridItem colSpan={1}>
                <AspectRatio ratio={16 / 7}>
                  <Image
                    src={`${normalURL}/media/${doctorProfileData?.id_front_image}`}
                    objectFit="cover"
                  />
                </AspectRatio>
              </GridItem>
              <GridItem colSpan={1}>
                <AspectRatio ratio={16 / 7}>
                  <Image
                    src={`${normalURL}/media/${doctorProfileData?.id_back_image}`}
                    objectFit="cover"
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
                <VStack spacing={4} align="stretch">
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"14px"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                      //
                    >
                      {doctorProfileData?.id_type} No.
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.id_number}
                    </Text>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"14px"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                    >
                      Province
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.province}
                    </Text>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"14px"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                    >
                      Ward
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.ward}
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
                      //
                    >
                      Issued District
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.id_issued_district}
                    </Text>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"14px"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                    >
                      District
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.district}
                    </Text>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"14px"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                    >
                      Tole
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.tole}
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
                    >
                      Issued Date
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.id_issued_district}
                    </Text>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"14px"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                    >
                      Municipality
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"16px"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{doctorProfileData?.user?.municipality}
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
