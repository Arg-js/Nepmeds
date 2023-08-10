import { Grid, GridItem, Flex, Text } from "@chakra-ui/react";
import Heading from "@nepMeds/components/Patient/DoctorConsultation/Heading";
import { colors } from "@nepMeds/theme/colors";
import { ConsultationSteps } from "@nepMeds/utils/Patient/DummyData";

const ConsultationStepSection = () => {
  return (
    <>
      <Heading heading="How Our Doctor Consultation works?" />
      <Grid templateColumns="repeat(2, 1fr)" gap={10}>
        {ConsultationSteps.map(consultationStep => {
          return (
            <GridItem width={"600px"} key={consultationStep.id}>
              <Grid templateColumns="min-content 1fr " gap={8}>
                <GridItem>{consultationStep.image}</GridItem>
                <GridItem>
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
