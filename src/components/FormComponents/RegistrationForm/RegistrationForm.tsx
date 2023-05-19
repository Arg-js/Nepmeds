import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import {
  Step,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
} from "@chakra-ui/stepper";
import AcademicInfo from "@nepMeds/pages/Register/AcademicInfo";
import BasicInfo from "@nepMeds/pages/Register/BasicInfo";
import CertificationInfo from "@nepMeds/pages/Register/CertificationInfo";
import ExperienceInfo from "@nepMeds/pages/Register/ExperienceInfo";
import PrimaryInfo from "@nepMeds/pages/Register/PrimaryInfo";
import { useAcademicInfoRegister } from "@nepMeds/service/nepmeds-academic";
import { useCertificateInfoRegister } from "@nepMeds/service/nepmeds-certificate";
import { useExperienceInfoRegister } from "@nepMeds/service/nepmeds-experience";
import { usePrimaryInfoRegister } from "@nepMeds/service/nepmeds-register";
import { toastFail } from "@nepMeds/service/service-toast";
import { colors } from "@nepMeds/theme/colors";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const registerDefaultValues = {
  image: undefined as undefined | [],
  title: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  password: "",
  confirm_password: "",
  bio_detail: "",
  phone: "",
  mobile_number: "",
  email: "",
  gender: "",
  date_of_birth: "",
  specialization: [] as { label: string; value: string }[],
  pan_number: "",
  id_type: "",
  citizenship_number: "",
  issued_district: "",
  issued_date: "",
  province: "",
  district: "",
  municipality: "",
  ward: "",
  tole: "",
  age: 0,
  medical_degree: "",
  designation: "",
  municipality_vdc: "",
  citizenship_issued_date: "",
  academic: [
    {
      doctor: 0,
      degree_program: "",
      major: "",
      university: "",
      graduation_year: "",
      file: undefined as File | undefined,
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
      file: undefined as File | undefined,
    },
  ],
  certification: [
    {
      doctor: 0,
      title: "",
      issued_by: "",
      certificate_number: "",
      certificate_issued_date: "",
      file: undefined as File | undefined,
    },
  ],
};
export type IRegisterFields = typeof registerDefaultValues;

const RegistrationForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [doctor, setDoctor] = React.useState(0);
  const primaryInfoRegister = usePrimaryInfoRegister();
  const academicInfoRegister = useAcademicInfoRegister();
  const certificationInfoRegister = useCertificateInfoRegister();
  const experienceInfoRegister = useExperienceInfoRegister();

  const formMethods = useForm({
    defaultValues: registerDefaultValues,
  });

  const onClickHandler = (index: number) => {
    setActiveStep(index);
  };

  const onSubmitForm = async (values: IRegisterFields) => {
    switch (activeStep) {
      case 0: {
        setActiveStep(prev => prev + 1);
        break;
      }
      case 1: {
        try {
          primaryInfoRegister
            .mutateAsync({
              image: values.image,
              title: values.title,
              first_name: values.first_name,
              middle_name: values.middle_name,
              last_name: values.last_name,
              password: values.password,
              confirm_password: values.confirm_password,
              email: values.email,
              mobile_number: values.mobile_number,
              bio_detail: values.bio_detail,
              gender: values.gender,
              date_of_birth: values.date_of_birth,
              specialization: values.specialization.map(s => s.value),
              age: 20,
              medical_degree: "test",
              designation: "Test",
              pan_number: values.pan_number,
              citizenship_number: values.citizenship_number,
              ward: values.ward,
              tole: values.tole,
              municipality_vdc: values.municipality_vdc,
              citizenship_issued_date: values.citizenship_issued_date,
            })
            .then(response => {
              const { data } = response.data;
              setDoctor(data?.doctor.id);
              setActiveStep(prev => prev + 1);
            });
        } catch (error) {
          toastFail("Please check form values");
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
            .then(response => response && setActiveStep(prev => prev + 1));
        } catch (error) {
          toastFail("Please check form values");
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
            .then(response => response && setActiveStep(prev => prev + 1));
        } catch (error) {
          toastFail("Please check form values");
        }
        break;
      }
      case 4: {
        try {
          const lastValue = values.experience.length - 1;
          experienceInfoRegister
            .mutateAsync({
              doctor: doctor,
              hospital: values.experience[lastValue].hospital,
              description: values.experience[lastValue].description,
              currently_working: values.experience[lastValue].currently_working,
              from_date: values.experience[lastValue].from_date,
              to_date: values.experience[lastValue].to_date,
              file: values.experience[lastValue].file,
            })
            .then(
              response => response && alert("Successfully registered doctor!!")
            );
        } catch (error) {
          toastFail("Please check form values");
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

  const { content } = steps[activeStep];

  return (
    <Box mx={20}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmitForm)}>
          <HStack
            pt={12}
            spacing={0}
            alignItems="flex-start"
            height="calc(100vh - 240px)"
          >
            <VStack
              bg={colors.main}
              alignItems="flex-start"
              pt={24}
              pl={12}
              pb={24}
              gap={12}
              h="100%"
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

            <Box h="100%">{content}</Box>
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
            >
              Go Back
            </Button>
            <Flex gap={4}>
              {activeStep > 1 && (
                <Button
                  onClick={() => null}
                  border={`1px solid ${colors.primary}`}
                  color={colors.primary}
                  fontWeight={400}
                >
                  Skip
                </Button>
              )}
              <Button
                onClick={() => onSubmitForm(formMethods.getValues())}
                // isDisabled={activeStep === steps.length - 1}
                background={colors.primary}
                color={colors.white}
                fontWeight={400}
                type="submit"
              >
                Next Step
              </Button>
            </Flex>
          </Flex>
        </form>
      </FormProvider>
    </Box>
  );
};

export default RegistrationForm;
