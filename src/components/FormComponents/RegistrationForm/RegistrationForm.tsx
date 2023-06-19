import { Button } from "@chakra-ui/button";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import {
  Step,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
} from "@chakra-ui/stepper";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import AcademicInfo from "@nepMeds/pages/Register/AcademicInfo";
import BasicInfo from "@nepMeds/pages/Register/BasicInfo";
import CertificationInfo from "@nepMeds/pages/Register/CertificationInfo";
import ExperienceInfo from "@nepMeds/pages/Register/ExperienceInfo";
import PrimaryInfo from "@nepMeds/pages/Register/PrimaryInfo";
import { useAcademicInfoRegister } from "@nepMeds/service/nepmeds-academic";
import { useCertificateInfoRegister } from "@nepMeds/service/nepmeds-certificate";
import { useExperienceInfoRegister } from "@nepMeds/service/nepmeds-experience";
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const registerDefaultValues = {
  first_name: "",
  middle_name: "",
  last_name: "",
  mobile_number: "",
  profile_picture: undefined as undefined | File[],
  district: 1,
  ward: 1,
  tole: 1,
  municipality: 1,
  province: 1,
  gender: "",
  date_of_birth: "",
  email: "",
  title: "",
  password: "",
  confirm_password: "",
  bio_detail: "",
  phone: "",
  specialization: [] as { label: string; value: string }[],
  pan_number: "",
  id_type: "",
  id_number: "",
  id_issued_date: "",
  id_issued_district: 1,
  id_front_image: undefined as undefined | File[],
  id_back_image: undefined as undefined | File[],

  age: 0,
  medical_degree: "",
  designation: "",

  academic: [
    {
      doctor: 0,
      degree_program: "",
      major: "",
      university: "",
      graduation_year: "",
      file: undefined as File | string | undefined,
    },
  ],
  experience: [
    {
      doctor: 0,
      hospital: "",
      description: "",
      from_date: "",
      to_date: "",
      currently_working: false,
      file: undefined as File | string | undefined,
    },
  ],
  certification: [
    {
      doctor: 0,
      title: "",
      issued_by: "",
      certificate_number: "",
      certificate_issued_date: "",
      file: undefined as File | string | undefined,
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
  const certificationInfoRegister = useCertificateInfoRegister();
  const experienceInfoRegister = useExperienceInfoRegister();

  const editPrimaryInfoRegister = useUpdatePrimaryInfoRegister();

  const schema = yup.object().shape({
    // pan_number: yup.string().required("Email is required!"),
  });
  const formMethods = useForm({
    defaultValues: registerDefaultValues,
    resolver: yupResolver(schema),
  });

  const onClickHandler = (index: number) => {
    setActiveStep(index);
  };

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
    const profilePicture = formMethods.getValues("profile_picture")?.[0];
    // const idFontImage = values.id_front_image?.[0];
    // const idBackImage = values.id_back_image?.[0];

    const specializationValues = formMethods.getValues("specialization");
    const specializationArray = specializationValues.map(
      specialization => specialization.value
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
      // id_back_image: idBackImage ? await base64(idBackImage) : "",
      // id_front_image: idFontImage ? await base64(idFontImage) : "",
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
              specialization: values.specialization.map(s => s.value),
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
              setActiveStep(2);
            });
        } catch (error) {
          console.log(error);
          const err = error as AxiosError<{ message: string }>;
          toastFail(
            err?.response?.data?.message ||
              "Failed to update primary information!"
          );
        }
        break;
      }
      case 2: {
        try {
          const lastValue = values.academic.length - 1;

          academicInfoRegister
            .mutateAsync({
              doctor: doctor,
              degree_program: values.academic[lastValue].degree_program,
              major: values.academic[lastValue].major,
              university: values.academic[lastValue].university,
              graduation_year: values.academic[lastValue].graduation_year,
              file: values.academic[lastValue].file,
            })
            .then(response => response && setActiveStep(3))
            .catch(error => {
              {
                const err = error as AxiosError<{ message: string }>;
                toastFail(
                  err?.response?.data?.message ||
                    "Failed to add academic information!"
                );
              }
            });
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          toastFail(
            err?.response?.data?.message ||
              "Failed to add academic information!"
          );
        }
        break;
      }
      case 3: {
        try {
          const lastValue = values.certification.length - 1;
          certificationInfoRegister
            .mutateAsync({
              doctor: doctor,
              title: values.certification[lastValue].title,
              issued_by: values.certification[lastValue].issued_by,
              certificate_issued_date:
                values.certification[lastValue].certificate_issued_date,
              certificate_number:
                values.certification[lastValue].certificate_number,
              file: values.certification[lastValue].file,
            })
            .then(response => response && setActiveStep(4))
            .catch(error => {
              {
                const err = error as AxiosError<{ message: string }>;
                toastFail(
                  err?.response?.data?.message ||
                    "Failed to add certification information!"
                );
              }
            });
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          toastFail(
            err?.response?.data?.message ||
              "Failed to add certification information!"
          );
        }
        break;
      }
      case 4: {
        try {
          const lastValue = values.experience.length - 1;
          await experienceInfoRegister.mutateAsync({
            doctor: doctor,
            hospital: values.experience[lastValue].hospital,
            description: values.experience[lastValue].description,
            currently_working: values.experience[lastValue].currently_working,
            from_date: values.experience[lastValue].from_date,
            to_date: values.experience[lastValue].to_date,
            file: values.experience[lastValue].file,
          });
          onOpenConfirmation();
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          toastFail(
            err?.response?.data?.message ||
              "Failed to add experience information!"
          );
        }
        break;
      }
    }
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
      console.log(location.state);
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
  console.log(content);

  return (
    <Container maxW="container.xl" m="auto">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmitForm)}>
          <HStack pt={12} spacing={0} alignItems="flex-start">
            <VStack
              bg={colors.main}
              alignItems="flex-start"
              pt={24}
              pl={12}
              pb={24}
              gap={12}
              h="100vh"
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
                w={330}
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
                        cursor: "pointer",
                      }}
                      onClick={() => onClickHandler(index)}
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

            <Box h="100vh">{content}</Box>
          </HStack>

          <Flex justifyContent="space-between" mt={6}>
            <Button
              onClick={() => {
                setActiveStep(prevStep => prevStep - 1);
              }}
              background={colors.main}
              color={colors.white}
              fontWeight={400}
              isDisabled={activeStep === 0}
              variant="register"
            >
              Go Back
            </Button>

            <Flex gap={4}>
              {activeStep > 1 && activeStep < 4 && (
                <Button
                  onClick={() => {
                    if (activeStep === steps.length) {
                      return onOpenConfirmation();
                    }
                    setActiveStep(prev => prev + 1);
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
                  type="submit"
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
