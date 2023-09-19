import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { images } from "@nepMeds/assets/images";
import React from "react";

import { extendTheme } from "@chakra-ui/react";
import { BasicInfoForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  IGetDoctorProfile,
  IUser,
} from "@nepMeds/service/nepmeds-doctor-profile";
import { useUpdatePersonalInfoRegister } from "@nepMeds/service/nepmeds-register";
import { normalURL } from "@nepMeds/service/service-axios";
import { colors } from "@nepMeds/theme/colors";
import { imageToBase64 } from "@nepMeds/utils/imgToBase64";
import { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";

const EditBasic = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const updatePersonalInfo = useUpdatePersonalInfoRegister();
  const formMethods = useForm();
  const [imageDataUrl, setImageDataUrl] = React.useState<string | null>(null);
  const [editBasicFormToggle, setEditBasicFormToggle] = React.useState(false);

  const theme = extendTheme({
    components: {
      Card: {
        baseStyle: {
          _focus: {
            boxShadow: "none",
          },
        },
      },
    },
  });

  const handleFormUpdate = async () => {
    try {
      const profilePicture = formMethods.getValues("profile_picture")?.[0];
      const user = {
        first_name: formMethods.getValues("first_name"),
        middle_name: formMethods.getValues("middle_name"),
        last_name: formMethods.getValues("last_name"),
      } as IUser;

      const doctor_nmc_info = {
        nmc_number: formMethods.getValues("nmc.nmc_number"),
        nmc_issued_date: formMethods.getValues("nmc.nmc_issued_date"),
        nmc_expiry_date: formMethods.getValues("nmc.nmc_expiry_date"),
        nmc_file: formMethods.getValues("nmc.nmc_file")?.[0] as File,
      };

      if (profilePicture) {
        user.profile_picture = await imageToBase64(profilePicture);
      }

      await updatePersonalInfo.mutateAsync({
        id: doctorProfileData.id?.toString(),
        user: user,
        doctor_nmc_info,
        specialization: formMethods.getValues("specialization"),
        pan_number: formMethods.getValues("pan_number"),
        id_type: formMethods.getValues("id_type"),
        id_number: formMethods.getValues("id_number"),
        id_issued_district: formMethods.getValues("id_issued_district"),
        id_issued_date: formMethods.getValues("id_issued_date"),
        title: formMethods.getValues("title"),

        bio_detail: formMethods.getValues("bio_detail"),
        age: 20,
        medical_degree: "test",
        designation: "Test",
        id_back_image: formMethods.getValues("id_back_image"),
        id_front_image: formMethods.getValues("id_front_image"),
      });
      toastSuccess("Personal information updated successfully!");
      setEditBasicFormToggle(false);
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

  const handleCloseForm = () => {
    setEditBasicFormToggle(false);
  };

  React.useEffect(() => {
    if (doctorProfileData?.user?.profile_picture) {
      const { profile_picture } = doctorProfileData.user;

      if (typeof profile_picture === "string") {
        setImageDataUrl(profile_picture);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setImageDataUrl(reader.result);
          }
        };
        reader.readAsDataURL(profile_picture);
      }
    }
  }, [doctorProfileData]);

  return (
    <Card>
      <Flex alignItems={"center"} justifyContent={"space-between"} p={5}>
        <Text fontWeight={600} fontSize="20px">
          Profile
        </Text>

        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => setEditBasicFormToggle(true)}
          cursor="pointer"
        >
          {/* TODO: icon button */}
          {!editBasicFormToggle && (
            <Button borderRadius="xl">
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
          )}
        </Flex>
      </Flex>
      <Box>
        <Divider />
      </Box>

      {editBasicFormToggle ? (
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
                    // background: scrollbarColor,
                    background: `${colors.light_gray}`,
                    borderRadius: "24px",
                  },
                }}
                overflow="scroll"
              >
                <EditBasicForm doctorProfileData={doctorProfileData} />
              </GridItem>
              <GridItem>
                <SubmitButton
                  handleFormUpdate={handleFormUpdate}
                  handleCloseForm={handleCloseForm}
                  isLoading={updatePersonalInfo.isLoading}
                />
              </GridItem>
            </Grid>
          </form>
        </FormProvider>
      ) : (
        <>
          {Object.keys(doctorProfileData).length === 0 && (
            <Center>
              <Spinner />
            </Center>
          )}
          <Card
            direction={{ base: "column", sm: "row" }}
            mb={"18px"}
            p={4}
            boxShadow={theme}
          >
            {imageDataUrl && (
              <Image
                w={"159px"}
                h={"159px"}
                src={`${normalURL}/media/${imageDataUrl}`}
                objectFit="cover"
              />
            )}
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
                  {doctorProfileData?.user?.last_name}&nbsp;
                  {doctorProfileData?.specialization_names?.length
                    ? `(${doctorProfileData?.specialization_names?.[0]?.name})`
                    : ""}
                  {doctorProfileData?.status === "approved" && (
                    <Image
                      display={"inline-block"}
                      ml={"9px"}
                      src={images?.verified}
                      alt="verified"
                      fontSize={"sm"}
                      fontWeight={"normal"}
                      whiteSpace={"nowrap"}
                    />
                  )}
                </Text>
              </Box>
              <Box width={"80%"}>
                <Text
                  fontWeight={"400"}
                  fontSize={"16px"}
                  lineHeight={"28px"}
                  color={"#5B5B5B"}
                >
                  {doctorProfileData?.bio_detail}
                </Text>
              </Box>
            </CardBody>
          </Card>
        </>
      )}
    </Card>
  );
};

const EditBasicForm = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  return (
    <>
      <Box p={5}>
        <BasicInfoForm
          hidePasswordField={false}
          doctorProfileData={doctorProfileData}
          isEditable={true}
        />
      </Box>
    </>
  );
};

interface handleFormUpdateProps {
  handleFormUpdate: () => void;
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
          borderRadius="xl"
          variant={"secondary"}
          isLoading={isLoading}
          type="submit"
        >
          Update
        </Button>
      </GridItem>
    </Grid>
  );
};

export default EditBasic;
