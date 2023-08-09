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
import CertificationInfo from "@nepMeds/pages/Register/CertificationInfo";
import ExperienceInfo from "@nepMeds/pages/Register/ExperienceInfo";
import PrimaryInfo from "@nepMeds/pages/Register/PrimaryInfo";
import {
  useAcademicFileRegister,
  useAcademicInfoRegister,
  useUpdateAcademicInfo,
} from "@nepMeds/service/nepmeds-academic";
import {
  useCertificateFileRegister,
  useCertificateInfoRegister,
  useUpdateCertificateInfo,
} from "@nepMeds/service/nepmeds-certificate";
import {
  useExperienceFileRegister,
  useExperienceInfoRegister,
} from "@nepMeds/service/nepmeds-experience";
import {
  usePrimaryInfoRegister,
  useUpdatePrimaryInfoRegister,
} from "@nepMeds/service/nepmeds-register";
import { toastFail } from "@nepMeds/service/service-toast";
import { colors } from "@nepMeds/theme/colors";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

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
  gender: "Male",
  date_of_birth: "",
  email: "",
  title: "Dr",
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

  age: 0,
  medical_degree: "",
  designation: "",

  doctor_id: 0,

  academic: [
    {
      doctor: 0,
      degree_program: "",
      major: "",
      id: "",
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
};
export type IRegisterFields = typeof registerDefaultValues;

const RegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeStep, setActiveStep] = React.useState(0);
  const [doctor, setDoctor] = React.useState(0);
  const [name, setName] = React.useState("");
  const [isPrimarySubmitted, setIsPrimarySubmitted] = React.useState(false);

  const [isMobileVerified, setIsMobileVerified] = React.useState(false);
  const [isEmailVerified, setIsEmailVerified] = React.useState(false);

  const { isOpen: isConfirmationOpen, onOpen: onOpenConfirmation } =
    useDisclosure();
  const primaryInfoRegister = usePrimaryInfoRegister();
  const academicInfoRegister = useAcademicInfoRegister();
  const academicFileRegister = useAcademicFileRegister();
  const updateAcademicInfoRegister = useUpdateAcademicInfo();
  const certificationInfoRegister = useCertificateInfoRegister();
  const certificateFileRegister = useCertificateFileRegister();
  const updateCertificateInfoRegister = useUpdateCertificateInfo();
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
          is_mobile_number_verified: isMobileVerified,
          is_email_verified: isEmailVerified,
          password: formMethods.getValues("password"),
          confirm_password: formMethods.getValues("confirm_password"),
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
          setActiveStep(2);
        });
    } catch (error) {
      const err = error as AxiosError<{ errors: [0] }>;

      const errorObject = err?.response?.data?.errors?.[0];
      const firstErrorMessage = errorObject
        ? Object.values(errorObject)[0]
        : null;
      toastFail(
        firstErrorMessage?.toString() || "Failed to update primary information!"
      );
    }
  };

  const onSubmitForm = async (values: IRegisterFields) => {
    switch (activeStep) {
      case 0: {
        setActiveStep(1);
        break;
      }
      case 1: {
        try {
          const profilePicture = values.profile_picture?.[0];
          const idFontImage = values.id_front_image?.[0];
          const idBackImage = values.id_back_image?.[0];

          await primaryInfoRegister
            .mutateAsync({
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
                is_mobile_number_verified: isMobileVerified,
                is_email_verified: isEmailVerified,
                password: values.password,
                confirm_password: values.confirm_password,
                email: values.email,
              },
              title: values.title,

              bio_detail: values.bio_detail,
              specialization: values.specialization_names.map(s =>
                Number(s.value)
              ),
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
            })
            .then(response => {
              const { data } = response.data;
              setDoctor(data?.id);
              setName(data?.user.first_name);
              setIsPrimarySubmitted(true);
              formMethods.setValue("doctor_id", data?.id);
              setActiveStep(2);
            });
        } catch (error) {
          const err = error as AxiosError<{ errors: [0] }>;

          const errorObject = err?.response?.data?.errors?.[0];
          const firstErrorMessage = errorObject
            ? Object.values(errorObject)[0]
            : null;
          toastFail(
            firstErrorMessage?.toString() ||
              "Failed to add primary information!"
          );
        }
        break;
      }
      case 2: {
        try {
          const academicArray = formMethods.getValues("academic");

          const academicPromises = academicArray.map(async academicData => {
            const createAcademicFileResponse =
              await academicFileRegister.mutateAsync(academicData);

            const academicInfoData = {
              ...academicData,
              doctor: doctor,
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
              const academicInfoResponse =
                await academicInfoRegister.mutateAsync(academicInfoData);

              if (academicInfoResponse) {
                return academicInfoResponse.data.data;
              } else {
                throw new Error("Failed to add academic information!");
              }
            }
          });

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
                setActiveStep(3);
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

        break;
      }
      case 3: {
        try {
          const certificationArray = formMethods.getValues("certification");

          const certificationPromises = certificationArray.map(
            async certificationData => {
              const createCertificateFileResponse =
                await certificateFileRegister.mutateAsync(certificationData);

              if (createCertificateFileResponse) {
                const certificateInfoData = {
                  ...certificationData,
                  doctor: doctor,
                  certificate_documents:
                    createCertificateFileResponse.data.data.map(
                      (file: string) => ({
                        file: file,
                      })
                    ),
                };

                if (certificationData.id) {
                  const certificateInfoResponse =
                    await updateCertificateInfoRegister.mutateAsync({
                      id: parseInt(certificationData.id),
                      data: certificateInfoData,
                    });

                  if (certificateInfoResponse) {
                    return certificateInfoResponse.data.data;
                  } else {
                    throw new Error(
                      "Failed to update certificate information!"
                    );
                  }
                } else {
                  const certificateInfoResponse =
                    await certificationInfoRegister.mutateAsync(
                      certificateInfoData
                    );

                  if (certificateInfoResponse) {
                    return certificateInfoResponse.data.data;
                  } else {
                    throw new Error("Failed to add certificate information!");
                  }
                }
              } else {
                throw new Error("Failed to upload certificate files!");
              }
            }
          );

          const certificateInfoResponses = await Promise.all(
            certificationPromises
          );

          if (certificateInfoResponses) {
            setActiveStep(4);

            certificateInfoResponses.forEach(
              (certificateInfoResponse, index) => {
                if (certificateInfoResponse) {
                  formMethods.setValue(
                    `certification.${index}.id`,
                    certificateInfoResponse.id
                  );
                  formMethods.setValue(
                    `certification.${index}.isSubmitted`,
                    true
                  );
                }
              }
            );

            toastSuccess("Certificate Information updated");
          } else {
            throw new Error("Failed to add certificate information!");
          }
        } catch (error) {
          const err = error as AxiosError<{ errors: [0] }>;
          const errorObject = err?.response?.data?.errors?.[0];
          const firstErrorMessage = errorObject
            ? Object.values(errorObject)[0]
            : null;

          toastFail(
            firstErrorMessage?.toString() ||
              "Failed to add certificate information!"
          );
        }

        break;
      }
      case 4: {
        try {
          const experienceArray = formMethods.getValues("experience");

          const experiencePromises = experienceArray.map(
            async experienceData => {
              const createExperienceFileResponse =
                await experienceFileRegister.mutateAsync(experienceData);

              if (createExperienceFileResponse) {
                const experienceInfoData = {
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
                  delete experienceInfoData.to_date; // Remove 'to_date' property when currently_working is true
                }
                try {
                  const experienceInfoResponse =
                    await experienceInfoRegister.mutateAsync(
                      experienceInfoData
                    );

                  if (experienceInfoResponse) {
                    return experienceInfoResponse.data.data;
                  } else {
                    throw new Error("Failed to add experience information!");
                  }
                } catch (error) {
                  const err = error as AxiosError<{ errors: [0] }>;
                  const errorObject = err?.response?.data?.errors?.[0];
                  const firstErrorMessage = errorObject
                    ? Object.values(errorObject)[0]
                    : null;
                  throw new Error(
                    firstErrorMessage?.toString() ||
                      "Failed to add experience information!"
                  );
                }
              } else {
                throw new Error("Failed to upload experience files!");
              }
            }
          );

          const experienceInfoResponses = await Promise.all(experiencePromises);

          if (experienceInfoResponses) {
            onOpenConfirmation();

            experienceInfoResponses.forEach((experienceInfoResponse, index) => {
              if (experienceInfoResponse) {
                formMethods.setValue(
                  `experience.${index}.id`,
                  experienceInfoResponse.id
                );
                formMethods.setValue(`experience.${index}.isSubmitted`, true);
              }
            });

            toastSuccess("Experience Information updated");
          } else {
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
      title: "Academic Info",
      content: <AcademicInfo />,
    },
    {
      title: "Certification Info",
      content: <CertificationInfo />,
    },
    {
      title: "Experience",
      content: <ExperienceInfo />,
    },
  ];

  function checkNumberMatch(number: string): boolean {
    const pattern = /^(?:\+977[-\s]?)?9[78]\d{8}$/;
    return pattern.test(number);
  }
  useEffect(() => {
    if (location.state) {
      const mobileNumber = (location.state as { mobile: string }).mobile;
      if (checkNumberMatch(mobileNumber)) {
        formMethods.setValue("mobile_number", mobileNumber);
        setIsMobileVerified(true);
      } else {
        formMethods.setValue("email", mobileNumber);
        setIsEmailVerified(true);
      }
    } else {
      navigate("/signup");
    }
  }, [location.state]);

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
                <Heading fontSize="2xl" fontWeight={400} color={colors.white}>
                  Step {activeStep + 1}
                </Heading>
                {steps[activeStep + 1] && (
                  <Text fontSize="sm" color={colors.blue_30}>
                    Next -{steps[activeStep + 1].title}
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
              {activeStep > 1 && activeStep < 5 && (
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
        onClose={() => navigate("/login")}
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
              onClick={() => navigate("/login")}
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
