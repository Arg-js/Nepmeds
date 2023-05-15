import React from "react";
import {
  Step,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/stepper";
import { Box, Heading } from "@chakra-ui/layout";
import BasicInfo from "@nepMeds/pages/Register/BasicInfo";
import CertificationInfo from "@nepMeds/pages/Register/CertificationInfo";
import { colors } from "@nepMeds/theme/colors";
import PrimaryInfo from "@nepMeds/pages/Register/PrimaryInfo";
import AcademicInfo from "@nepMeds/pages/Register/AcademicInfo";
import ExperienceInfo from "@nepMeds/pages/Register/ExperienceInfo";
import { Button, Flex } from "@chakra-ui/react";
const steps = [
  { title: "Registration", content: <BasicInfo /> },
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

const RegistrationForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { content } = steps[activeStep];
  const onClickHandler = (index: number) => {
    setActiveStep(index);
  };
  return (
    <Box mx={20}>
      <Stepper
        index={activeStep}
        orientation="vertical"
        gap={2}
        h="80vh"
        background={colors.main}
        pl={8}
        alignItems="center"
        pb={20}
      >
        <Flex direction="column" color={colors.white} pt={12} gap={2}>
          <Heading as="h6" fontWeight={400}>
            Step {activeStep + 1}
          </Heading>
          <p style={{ color: colors.blue_30, marginBottom: "55px" }}>
            Next -{steps[activeStep + 1].title}
          </p>
        </Flex>
        {steps.map((step, index) => (
          <>
            <Step
              key={index}
              style={{
                width: "330px",
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
                  color: colors.white,
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
          </>
        ))}

        <Box flexShrink="0" position="absolute" right={0} left="27%" h="80vh">
          {content}
        </Box>
      </Stepper>
      <Flex justifyContent="space-between" mt={6}>
        <Button
          onClick={() => {
            setActiveStep((prevStep) => prevStep - 1);
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
            onClick={() => {
              setActiveStep((prevStep) => prevStep + 1);
            }}
            isDisabled={activeStep === steps.length - 1}
            background={colors.primary}
            color={colors.white}
            fontWeight={400}
          >
            Next Step
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RegistrationForm;
