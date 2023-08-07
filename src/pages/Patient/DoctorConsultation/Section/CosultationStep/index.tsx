import { Grid, GridItem, Flex, Text } from "@chakra-ui/react";
import Header from "@nepMeds/components/Patient/DoctorConsultation/Header";
import { colors } from "@nepMeds/theme/colors";
import { ConsultationSteps } from "@nepMeds/utils/Patient/DummyData";

const ConsultationStepSection = () => {
  return (
    <>
      <Header heading="How Our Doctor Consultation works?" />
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {ConsultationSteps.map(consultationStep => {
          return (
            <GridItem width={"600px"} key={consultationStep.id}>
              <Flex gap={8}>
                {consultationStep.image}
                <Flex direction={"column"}>
                  <Text fontWeight={700} fontSize={"27px"}>
                    {consultationStep.id}
                  </Text>
                  <Text
                    fontWeight={700}
                    fontSize={"22px"}
                    color={colors.dark_blue}
                  >
                    {consultationStep.title}
                  </Text>
                  <Text fontWeight={400} fontSize={"18px"}>
                    {consultationStep.description}
                  </Text>
                </Flex>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};

export default ConsultationStepSection;
