import React from "react";
import { useForm } from "react-hook-form";
import { AcademicInfoForm } from "../AcademicInfoForm/AcademicInfoForm";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
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
      <Stepper index={activeStep} orientation="vertical" gap="0" h="80vh">
        {steps.map((step, index) => (
          <>
            <Step
              key={index}
              style={{
                background: colors.main,
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
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber style={{ background: colors.main }} />}
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

              <StepSeparator />
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
    </Box>
  );
};

export default RegistrationForm;
