import { Grid, GridItem, Flex, Text } from "@chakra-ui/react";
import SectionHeading from "@nepMeds/components/Patient/DoctorConsultation/SectionHeading";
import { colors } from "@nepMeds/theme/colors";
import { ConsultationSteps } from "@nepMeds/utils/Patient/DummyData";

const ConsultationStepSection = () => {
  return (
    <>
      <SectionHeading heading="How Our Doctor Consultation works?" />
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
        gap={10}
      >
        {ConsultationSteps.map(consultationStep => {
          return (
            <GridItem
              width={{ base: "350px", md: "600px" }}
              key={consultationStep.id}
              mt={4}
            >
              <Grid
                templateColumns="min-content 1fr "
                gap={8}
                alignItems={"center"}
              >
                <GridItem>{consultationStep.image}</GridItem>
                <GridItem>
                  <Flex direction={"column"}>
                    <Text
                      fontWeight={700}
                      // TODO: RESPONSIVE
                      fontSize={{ base: "27px", md: "27px" }}
                    >
                      {consultationStep.id}
                    </Text>
                    <Text
                      fontWeight={700}
                      fontSize={{ base: "15px", md: "22px" }}
                      color={colors.dark_blue}
                    >
                      {consultationStep.title}
                    </Text>
                    <Text
                      fontWeight={400}
                      fontSize={{ base: "15px", md: "18px" }}
                    >
                      {consultationStep.description}
                    </Text>
                  </Flex>
                </GridItem>
              </Grid>
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};

export default ConsultationStepSection;
