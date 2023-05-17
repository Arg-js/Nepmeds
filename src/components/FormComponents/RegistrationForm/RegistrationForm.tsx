import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import {
  Step,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from "@chakra-ui/stepper";
import AcademicInfo from "@nepMeds/pages/Register/AcademicInfo";
import BasicInfo from "@nepMeds/pages/Register/BasicInfo";
import CertificationInfo from "@nepMeds/pages/Register/CertificationInfo";
import ExperienceInfo from "@nepMeds/pages/Register/ExperienceInfo";
import PrimaryInfo from "@nepMeds/pages/Register/PrimaryInfo";
import { colors } from "@nepMeds/theme/colors";

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
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const { content } = steps[activeStep - 1];
  const onClickHandler = (index: number) => {
    setActiveStep(index);
  };
  const submitForm = () => null;

  return (
    <Box mx={30} mt={13.5} mb={10}>
      <HStack color={colors.white} pt={12} gap={2}>
        <VStack bg={colors.main}>
          <Heading as="h6" fontWeight={400}>
            Step {activeStep}
          </Heading>
          <p style={{ color: colors.blue_30, marginBottom: "55px" }}>
            Next -{steps[activeStep + 1].title}
          </p>

          <Stepper
            index={activeStep}
            orientation="vertical"
            gap={2}
            h={390}
            pl={8}
            alignItems="center"
          >
            {steps.map((step, index) => (
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
            ))}
          </Stepper>
        </VStack>

        <Box flexShrink="0" position="absolute" right={0} left="27%" h="80vh">
          {content}
        </Box>
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
            onClick={() => {
              activeStep !== steps.length - 1
                ? setActiveStep(prevStep => prevStep + 1)
                : submitForm;
            }}
            background={colors.primary}
            color={colors.white}
            fontWeight={400}
          >
            {activeStep !== steps.length - 1 ? "Next Step" : "Submit Form"}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RegistrationForm;
