import { Grid, GridItem, Flex, Text, Box } from "@chakra-ui/react";
import Heading from "@nepMeds/components/Patient/DoctorConsultation/Heading";
import { colors } from "@nepMeds/theme/colors";
import { WhyChooseUs } from "@nepMeds/utils/Patient/DummyData";

const ChooseUsSection = () => {
  return (
    <Box my={16}>
      <Heading heading="Why Choose Us?" />
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {WhyChooseUs.map(WhyChooseUsStep => {
          return (
            <GridItem width={"518px"} key={WhyChooseUsStep.id}>
              <Flex gap={8}>
                {WhyChooseUsStep.image}
                <Flex direction={"column"}>
                  <Text
                    fontWeight={700}
                    fontSize={"22px"}
                    color={colors.dark_blue}
                  >
                    {WhyChooseUsStep.title}
                  </Text>
                  <Text fontWeight={400} fontSize={"18px"}>
                    {WhyChooseUsStep.description}
                  </Text>
                </Flex>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ChooseUsSection;
