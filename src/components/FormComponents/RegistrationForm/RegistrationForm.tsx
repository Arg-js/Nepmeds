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
const steps = [
  { title: "Registration", content: <BasicInfo /> },
  {
    title: "Primary Info",
    content: <PrimaryInfo />,
  },
  {
    title: "Academic Info",
    description: "Select Rooms",
    content: <AcademicInfo />,
  },
];

const RegistrationForm = () => {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });
  return (
    <>
      {" "}
      <Stepper index={activeStep} orientation="vertical" gap="0">
        {steps.map((step, index) => (
          <Step
            key={index}
            style={{
              background: colors.main,
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
              }}
            >
              {step.title}
            </StepTitle>

            <Box flexShrink="0">{step.content}</Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default RegistrationForm;
