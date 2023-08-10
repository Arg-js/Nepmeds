import { CardBody, Card as ChakraCard } from "@chakra-ui/card";
import { Flex, Text } from "@chakra-ui/layout";
import { DummyImageIcon } from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";
import { SpecilaizationDatas } from "@nepMeds/utils/Patient/DummyData";

const Card = () => {
  return (
    <Flex gap={5} my={10}>
      {SpecilaizationDatas.map(SpecilaizationData => {
        return (
          <ChakraCard
            variant={"elevated"}
            width={"auto"}
            textAlign={"center"}
            key={SpecilaizationData.id}
            pb={4}
          >
            <Flex gap={3} direction={"column"}>
              {/* <Card variant={"outline"} width={203} height={280}> */}
              <DummyImageIcon />
              <Text
                size="md"
                fontWeight={700}
                fontSize={"14px"}
                color={colors.dark_blue}
              >
                {SpecilaizationData.title}
              </Text>
              <CardBody py={0}>
                <Flex direction={"column"} gap={3}>
                  <Text fontWeight={400} fontSize={"11px"}>
                    {SpecilaizationData.description}
                  </Text>
                  <Text
                    fontWeight={600}
                    fontSize={"11px"}
                    color={colors.primary}
                  >
                    Consult now &gt;
                  </Text>
                </Flex>
              </CardBody>
            </Flex>
          </ChakraCard>
        );
      })}
    </Flex>
  );
};

export default Card;
