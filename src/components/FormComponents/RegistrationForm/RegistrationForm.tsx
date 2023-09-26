import { Button } from "@chakra-ui/button";
import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import {
  Step,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/stepper";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { toastSuccess } from "@nepMeds/components/Toast";
import AcademicInfo from "@nepMeds/pages/Register/AcademicInfo";
import BasicInfo from "@nepMeds/pages/Register/BasicInfo";
import ExperienceInfo from "@nepMeds/pages/Register/ExperienceInfo";
import NmcInfo from "@nepMeds/pages/Register/NmcInfo";
import PrimaryInfo from "@nepMeds/pages/Register/PrimaryInfo";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import {
  useAcademicFileRegister,
  useAcademicInfoRegister,
  useUpdateAcademicInfo,
} from "@nepMeds/service/nepmeds-academic";
import { useCertificateInfoRegister } from "@nepMeds/service/nepmeds-certificate";
import {
  useExperienceFileRegister,
  useExperienceInfoRegister,
} from "@nepMeds/service/nepmeds-experience";
import {
  useNmcInfoUpdate,
  usePrimaryInfoRegister,
  useUpdatePrimaryInfoRegister,
} from "@nepMeds/service/nepmeds-register";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { toastFail } from "@nepMeds/service/service-toast";
import { colors } from "@nepMeds/theme/colors";
import { AxiosError } from "axios";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const registerDefaultValues = {
  first_name: "",
  middle_name: "",
  last_name: "",
  mobile_number: "",
  profile_picture: undefined as undefined | File[],
  district: (0 as number) || null,
  ward: "",
  tole: "",
  municipality: (0 as number) || null,
  province: (0 as number) || null,
  gender: "",
  date_of_birth: "",
  email: "",
  title: "",
  password: "",
  confirm_password: "",
  bio_detail: "",
  phone: "+977",
  specialization_names: [] as { label: string; value: string }[],
  pan_number: "",
  id_type: "Citizenship",
  id_number: "",
  id_issued_date: "",
  id_issued_district: (0 as number) || null,
  id_front_image: undefined as undefined | File[],
  id_back_image: undefined as undefined | File[],
  is_email_verified: false,
  is_mobile_number_verified: false,
  age: 0,
  medical_degree: "",
  designation: "",

  doctor_id: 0,

  academic: [
    {
      doctor: 0,
      degree_program: "",
      major: "",
      id: 0,
      university: "",
      graduation_year: "2023",
      academic_documents: undefined as undefined | File[],
      isSubmitted: false,
    },
  ],
  experience: [
    {
      doctor: 0,
      hospital: "",
      description: "",
      from_date: "",
      to_date: undefined as undefined | string, // Make 'to_date' field optional
      currently_working: undefined as undefined | boolean, // Make 'currently_working' field optiona
      experience_documents: undefined as undefined | File[],
      id: "",
      isSubmitted: false,
    },
  ],
  certification: [
    {
      doctor: 0,
      title: "",
      issued_by: "",
      certificate_number: "",
      certificate_issued_date: "",
      certificate_documents: undefined as undefined | File[],
      id: "",
      isSubmitted: false,
    },
  ],
  nmc: {
    nmc_number: 12345,
    nmc_issued_date: "",
    nmc_expiry_date: "",
    nmc_file: null as null | File[] | string,
    isSubmitted: false,
  },
};
export type IRegisterFields = typeof registerDefaultValues;

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [doctor, setDoctor] = React.useState(Number(0));
  const [name, setName] = React.useState("");
  const [isPrimarySubmitted, setIsPrimarySubmitted] = React.useState(false);

  const { isOpen: isConfirmationOpen, onOpen: onOpenConfirmation } =
    useDisclosure();
  const primaryInfoRegister = usePrimaryInfoRegister();
  const primaryInfoUpdate = useNmcInfoUpdate();
  const academicInfoRegister = useAcademicInfoRegister();
  const academicFileRegister = useAcademicFileRegister();
  const updateAcademicInfoRegister = useUpdateAcademicInfo();
  const certificationInfoRegister = useCertificateInfoRegister();
  const experienceInfoRegister = useExperienceInfoRegister();
  const experienceFileRegister = useExperienceFileRegister();

  const editPrimaryInfoRegister = useUpdatePrimaryInfoRegister();

  const formMethods = useForm({
    defaultValues: registerDefaultValues,
  });

  const base64 = async (image: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = (): void => {
        const base64String: string = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (): void => {
        console.error("Failed to convert the image to base64.");
        reject(new Error("Failed to convert the image to base64."));
      };
    });
  };

  const editPrimaryInfoRegisterHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      const profilePicture = formMethods.getValues("profile_picture")?.[0];

      const specializationValues = formMethods.getValues(
        "specialization_names"
      );
      const specializationArray = specializationValues.map(specialization =>
        Number(specialization.value)
      );
      const doctorData = {
        user: {
          first_name: formMethods.getValues("first_name"),
          middle_name: formMethods.getValues("middle_name"),
          last_name: formMethods.getValues("last_name"),
          profile_picture: profilePicture ? await base64(profilePicture) : "",

          district: formMethods.getValues("district"),
          ward: formMethods.getValues("ward"),
          tole: formMethods.getValues("tole"),
          municipality: formMethods.getValues("municipality"),
          province: formMethods.getValues("province"),
          gender: formMethods.getValues("gender"),
          date_of_birth: formMethods.getValues("date_of_birth"),
          password: formMethods.getValues("password"),
          confirm_password: formMethods.getValues("confirm_password"),
          is_email_verified: formMethods.getValues("is_email_verified"),
          is_mobile_number_verified: formMethods.getValues(
            "is_mobile_number_verified"
          ),
        },

        doctor_nmc_info: {
          nmc_number: formMethods.getValues("nmc.nmc_number"),
          nmc_issued_date: formMethods.getValues("nmc.nmc_issued_date"),
          nmc_expiry_date: formMethods.getValues("nmc.nmc_expiry_date"),
          nmc_file:
            formMethods.getValues("nmc.nmc_file")?.[0] &&
            (await base64(formMethods.getValues("nmc.nmc_file")?.[0] as File)),
        },
        title: formMethods.getValues("title"),
        bio_detail: formMethods.getValues("bio_detail"),
        specialization: specializationArray,
        age: 20,
        medical_degree: "test",
        designation: "Test",
        pan_number: formMethods.getValues("pan_number"),
        id_number: formMethods.getValues("id_number"),
        id_type: formMethods.getValues("id_type"),
        id_issued_district: formMethods.getValues("id_issued_district"),
        id_issued_date: formMethods.getValues("id_issued_date"),
      };

      await editPrimaryInfoRegister
        .mutateAsync({ id: doctor, data: doctorData })
        .then(response => {
          const { data } = response.data;
          setDoctor(data?.id);
          setName(data?.user.first_name);

          setIsPrimarySubmitted(true);
          setActiveStep(3);
        });
    } catch (error) {
      const err = serverErrorResponse(
        error,
        "Failed to update primary information!"
      );

      toastFail(err);
    }
  };
  const onSubmitForm = async (values: IRegisterFields) => {
    switch (activeStep) {
      case 0: {
        setActiveStep(1);
        break;
      }
      case 1: {
        setActiveStep(2);
        break;
      }
      case 2: {
        try {
          const profilePicture = values.profile_picture?.[0];
          const idFontImage = values.id_front_image?.[0];
          const idBackImage = values.id_back_image?.[0];
          const nmcData = values.nmc;
          const formatedData = {
            user: {
              first_name: values.first_name,
              middle_name: values.middle_name,
              last_name: values.last_name,
              profile_picture: profilePicture
                ? await base64(profilePicture)
                : "",
              mobile_number: values.mobile_number,
              district: values.district,
              ward: values.ward,
              tole: values.tole,
              municipality: values.municipality,
              province: values.province,
              gender: values.gender,
              date_of_birth: values.date_of_birth,
              password: values.password,
              confirm_password: values.confirm_password,
              email: values.email,
              is_email_verified: values.is_email_verified,
              is_mobile_number_verified: values.is_mobile_number_verified,
            },
            title: values.title,
            bio_detail: values.bio_detail,
            specialization: values.specialization_names.map(s =>
              Number(s.value)
            ),
            doctor_nmc_info: {
              nmc_number: Number(nmcData.nmc_number),
              nmc_issued_date: nmcData.nmc_issued_date,
              nmc_expiry_date: nmcData.nmc_expiry_date,
              nmc_file:
                nmcData.nmc_file?.[0] &&
                (await base64(nmcData.nmc_file?.[0] as File)),
            },
            age: 20,
            medical_degree: "test",
            designation: "Test",
            pan_number: values.pan_number,
            id_number: values.id_number,
            id_type: values.id_type,
            id_issued_district: values.id_issued_district,
            id_back_image: idBackImage ? await base64(idBackImage) : "",
            id_front_image: idFontImage ? await base64(idFontImage) : "",

            id_issued_date: values.id_issued_date,
          };
          if (nmcData.isSubmitted) {
            await primaryInfoUpdate.mutateAsync({
              ...formatedData,
              doctorId: doctor,
            });
            toastSuccess("Nmc data updated");
            setActiveStep(3);
          } else {
            await primaryInfoRegister
              .mutateAsync(formatedData)
              .then(response => {
                const { data } = response.data;
                setDoctor(data?.id);
                setName(data?.user.first_name);
                setIsPrimarySubmitted(true);
                formMethods.setValue("doctor_id", data?.id);
                formMethods.setValue("nmc.isSubmitted", true);
                setActiveStep(3);
              });
          }
        } catch (error) {
          const err = serverErrorResponse(
            error,
            "Failed to add primary information!"
          );

          toastFail(err);
        }
        break;
      }
      case 3: {
        try {
          const academicArray = formMethods.getValues("academic");
          //  set data
          const academicInfoData: typeof academicArray = [];
          // new register data
          const academicPromises = academicArray.map(async academicData => {
            const createAcademicFileResponse =
              await academicFileRegister.mutateAsync(academicData);

            const data = {
              ...academicData,
              doctor: doctor,
              academic_documents: createAcademicFileResponse.data.data.map(
                (file: string) => ({
                  file: file,
                })
              ),
            };
            academicInfoData.push(data);
            return data;
          });

          await Promise.all(academicPromises);

          if (academicArray?.filter(data => data.id)?.length > 0) {
            const res = await updateAcademicInfoRegister.mutateAsync(
              academicInfoData
            );
            res.data?.data?.map(
              (
                e: {
                  degree_program: string;
                  major: string;
                  id: number;
                  university_data: {
                    id: string;
                  };
                  graduation_year: string;
                  academic_document: File | undefined | any;
                },
                i: number
              ) => {
                formMethods.setValue(`academic.${i}`, {
                  doctor: doctor,
                  degree_program: e?.degree_program,
                  major: e?.major,
                  id: e?.id,
                  university: e?.university_data?.id,
                  graduation_year: e?.graduation_year,
                  academic_documents: e?.academic_document,
                  isSubmitted: true,
                });
                setActiveStep(4);
              }
            );
            toastSuccess("Academic Information updated");
            setActiveStep(4);
          } else {
            const academicRegister = await academicInfoRegister.mutateAsync(
              academicInfoData as any
            );
            if (academicRegister.data.data) {
              academicRegister.data?.data?.map(
                (
                  e: {
                    degree_program: string;
                    major: string;
                    id: number;
                    university_data: {
                      id: string;
                    };
                    graduation_year: string;
                    academic_document: File | undefined | any;
                  },
                  i: number
                ) => {
                  formMethods.setValue(`academic.${i}`, {
                    doctor: doctor,
                    degree_program: e?.degree_program,
                    major: e?.major,
                    id: e?.id,
                    university: e?.university_data?.id,
                    graduation_year: e?.graduation_year,
                    academic_documents: e?.academic_document,
                    isSubmitted: true,
                  });
                  setActiveStep(4);
                }
              );
              academicRegister.data?.data?.map(
                (
                  e: {
                    degree_program: string;
                    major: string;
                    id: number;
                    university_data: {
                      id: string;
                    };
                    graduation_year: string;
                    academic_document: File | undefined | any;
                  },
                  i: number
                ) => {
                  formMethods.setValue(`academic.${i}`, {
                    doctor: doctor,
                    degree_program: e?.degree_program,
                    major: e?.major,
                    id: e?.id,
                    university: e?.university_data?.id,
                    graduation_year: e?.graduation_year,
                    academic_documents: e?.academic_document,
                    isSubmitted: true,
                  });
                  setActiveStep(4);
                }
              );
              toastSuccess("Academic Information created");
              return academicRegister.data.data;
            } else {
              throw new Error("Failed to add academic information!");
            }
          }
        } catch (error) {
          const err = serverErrorResponse(
            error,
            "Failed to update academic information!"
          );

          toastFail(err);
        }

        break;
      }
      case 4: {
        try {
          const experienceArray = formMethods.getValues("experience");

          // set experience data
          const experienceInfoData: typeof experienceArray = [];

          const experiencePromises = experienceArray.map(
            async experienceData => {
              const createExperienceFileResponse =
                await experienceFileRegister.mutateAsync(experienceData);

              if (createExperienceFileResponse) {
                const experienceInfoDataObj = {
                  ...experienceData,
                  doctor: doctor,
                  experience_documents:
                    createExperienceFileResponse.data.data.map(
                      (file: string) => ({
                        file: file,
                      })
                    ),
                };
                if (experienceData.currently_working) {
                  delete experienceInfoDataObj.to_date; // Remove 'to_date' property when currently_working is true
                }
                experienceInfoData.push(experienceInfoDataObj);
              } else {
                throw new Error("Failed to upload experience files!");
              }
            }
          );

          await Promise.all(experiencePromises);

          const experienceInfoResponses =
            await experienceInfoRegister.mutateAsync(experienceInfoData as any);

          if (experienceInfoResponses) {
            onOpenConfirmation();
            experienceInfoResponses.data.data.forEach(
              ({ id }: { id: number }, index: number) => {
                if (id) {
                  formMethods.setValue(`experience.${index}.id`, String(id));
                  formMethods.setValue(`experience.${index}.isSubmitted`, true);
                }
              }
            );

            toastSuccess("Experience Information created");
          } else {
            toastFail("Failed to add experience information!");
            throw new Error("Failed to add experience information!");
          }
        } catch (error) {
          const err = error as AxiosError<{ errors: [0] }>;
          const errorObject = err?.response?.data?.errors?.[0];
          const firstErrorMessage = errorObject
            ? Object.values(errorObject)[0]
            : null;
          toastFail(
            firstErrorMessage?.toString() ||
              "Failed to add experience information!"
          );
        }

        break;
      }
    }
  };
  const profileImage = formMethods.getValues().profile_picture as File[];
  const docFrontImage = formMethods.getValues().id_front_image as File[];
  const docBackImage = formMethods.getValues().id_back_image as File[];

  const disableButton =
    (activeStep === 0 && profileImage?.[0]?.size / 1048576 > 1) ||
    (activeStep === 1 && docFrontImage?.[0]?.size / 1048576 > 1) ||
    docBackImage?.[0]?.size / 1048576 > 1;
  const handleNextButtonClick = () => {
    formMethods.handleSubmit(onSubmitForm)();
  };

  const steps = [
    {
      title: "Registration",
      content: <BasicInfo />,
    },
    {
      title: "Primary Info",
      content: <PrimaryInfo />,
    },
    {
      title: "NMC Info",
      content: <NmcInfo />,
    },
    {
      title: "Academic Info",
      content: <AcademicInfo />,
    },
    // {
    //   title: "Certification Info",
    //   content: <CertificationInfo />,
    // },
    {
      title: "Experience",
      content: <ExperienceInfo />,
    },
  ];

  const { content } = steps[activeStep];

  return (
    <Container maxW={"container.xl"} m="auto">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmitForm)}>
          <HStack pt={8} spacing={0} alignItems="flex-start">
            <VStack
              bg={colors.main}
              alignItems="flex-start"
              pt={24}
              pl={12}
              pb={24}
              gap={12}
              h="75vh"
            >
              <Box>
                <Heading
                  fontSize="2xl"
                  fontWeight={400}
                  color={colors.white}
                  mb={"15px"}
                >
                  Step {activeStep + 1}
                </Heading>
                {steps[activeStep + 1] && (
                  <Text fontSize="sm" color={colors.blue_30}>
                    Next - {steps[activeStep + 1].title}
                  </Text>
                )}
              </Box>

              <Stepper
                index={activeStep}
                orientation="vertical"
                gap={1}
                w={260}
                h={350}
                alignItems="center"
              >
                {steps.map((step, index) => (
                  <Step
                    key={index}
                    style={{
                      alignItems: "baseline",
                    }}
                  >
                    <StepIndicator
                      style={{
                        color: colors.white,
                      }}
                    >
                      <StepStatus
                        complete={<StepNumber />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <StepTitle
                      style={{
                        color:
                          activeStep === index ? colors.white : colors.blue_30,
                        cursor: "default",
                      }}
                    >
                      {step?.title}
                    </StepTitle>
                    <StepSeparator
                      style={{ background: "transparent", height: "40px" }}
                    />
                  </Step>
                ))}
              </Stepper>
            </VStack>

            <Flex flexGrow={1} h="75vh">
              {content}
            </Flex>
          </HStack>

          <Flex
            justifyContent={activeStep === 0 ? "flex-end" : "space-between"}
            mt={4}
            mb={4}
          >
            {activeStep !== 0 && (
              <Button
                onClick={() => {
                  setActiveStep(prevStep => prevStep - 1);
                }}
                background={colors.main}
                color={colors.white}
                fontWeight={400}
                variant="register"
              >
                Go Back
              </Button>
            )}
            <Flex gap={4}>
              {activeStep > 2 && activeStep < 5 && (
                <Button
                  onClick={() => {
                    if (activeStep === 4) {
                      return onOpenConfirmation();
                    } else {
                      setActiveStep(prev => prev + 1);
                    }
                  }}
                  border={`1px solid ${colors.primary}`}
                  color={colors.primary}
                  fontWeight={400}
                  variant="register"
                >
                  Skip
                </Button>
              )}
              {activeStep === 1 && isPrimarySubmitted === true ? (
                <Button
                  isLoading={
                    primaryInfoRegister.isLoading ||
                    academicInfoRegister.isLoading ||
                    certificationInfoRegister.isLoading ||
                    experienceInfoRegister.isLoading
                  }
                  background={colors.primary}
                  color={colors.white}
                  fontWeight={400}
                  onClick={editPrimaryInfoRegisterHandler}
                  variant="register"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  isLoading={
                    primaryInfoRegister.isLoading ||
                    academicInfoRegister.isLoading ||
                    certificationInfoRegister.isLoading ||
                    experienceInfoRegister.isLoading
                  }
                  isDisabled={disableButton}
                  background={colors.primary}
                  color={colors.white}
                  fontWeight={400}
                  onClick={handleNextButtonClick}
                  variant="register"
                >
                  Next Step
                </Button>
              )}
            </Flex>
          </Flex>
        </form>
      </FormProvider>

      <ModalComponent
        isOpen={isConfirmationOpen}
        onClose={() => navigate(NAVIGATION_ROUTES.DOCTOR_LOGIN)}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Confirmation</Text>
          </HStack>
        }
        footer={
          <HStack gap={3}>
            <Button
              variant="outline"
              onClick={() => navigate(NAVIGATION_ROUTES.DOCTOR_LOGIN)}
              flex={1}
              background={colors.primary}
              color={colors.white}
            >
              Okay
            </Button>
          </HStack>
        }
        alignment="center"
      >
        <svgs.confirmed style={{ margin: "0 auto" }} />
        <VStack>
          <Heading
            fontSize="lg"
            fontWeight={600}
          >{`Hello, Dr. ${name}`}</Heading>
          <Text>
            Your account has been on approval process. After approval you will
            be informed on your email or mobile number.
          </Text>
        </VStack>
      </ModalComponent>
    </Container>
  );
};

export default RegistrationForm;
