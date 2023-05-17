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
import { usePrimaryInfoRegister } from "@nepMeds/service/nepmeds-register";
import { colors } from "@nepMeds/theme/colors";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const registerDefaultValues = {
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
  specialization: "",
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
  academic: [
    {
      degree: "",
      major: "",
      college: "",
      passedYear: "",
      file: undefined as undefined | [],
    },
  ],
  experience: [
    { name: "", from: "", to: "", description: "", currentWorking: false },
  ],
  certification: [
    { title: "", issuedBy: "", credentialId: "", issuedDate: "" },
  ],
};
export type IRegisterFields = typeof registerDefaultValues;

const RegistrationForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const primaryInfoRegister = usePrimaryInfoRegister();

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
          primaryInfoRegister.mutateAsync({
            title: values.title,
            first_name: values.first_name,
            middle_name: values.middle_name,
            last_name: values.last_name,
            password: values.password,
            confirm_password: values.confirm_password,
            email: values.email,
            mobile_number: values.mobile_number,
          });
        } catch (error) {
          <p>error</p>;
        }
        break;
      }
      case 2: {
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
                <Text fontSize="sm" color={colors.blue_30}>
                  Next -{steps[activeStep + 1].title}
                </Text>
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
                      {step.title}
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
                isDisabled={activeStep === steps.length - 1}
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
