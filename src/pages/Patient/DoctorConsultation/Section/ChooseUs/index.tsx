import { Grid, GridItem, Flex, Text, Box } from "@chakra-ui/react";
import Heading from "@nepMeds/components/Patient/DoctorConsultation/Heading";
import { colors } from "@nepMeds/theme/colors";
import { WhyChooseUs } from "@nepMeds/utils/Patient/DummyData";

const ChooseUsSection = () => {
  return (
    <Box my={16}>
      <SectionHeading heading="Why Choose Us?" />
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap={6}
      >
        {WhyChooseUs.map(WhyChooseUsStep => {
          return (
            <GridItem
              width={{ base: "300px", md: "518px" }}
              key={WhyChooseUsStep.id}
            >
              <Flex gap={{ base: 4, md: 8 }}>
                {WhyChooseUsStep.image}
                <Box width={{ base: "250px", md: "518px" }}>
                  <Flex direction={"column"}>
                    <Text
                      fontWeight={700}
                      fontSize={"22px"}
                      color={colors.dark_blue}
                    >
                      {WhyChooseUsStep.title}
                    </Text>
                    <Text
                      fontWeight={400}
                      fontSize={{ base: "15px", md: "18px" }}
                    >
                      {WhyChooseUsStep.description}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ChooseUsSection;
