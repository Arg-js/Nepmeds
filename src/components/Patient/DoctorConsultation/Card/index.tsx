import { CardBody, Card as ChakraCard } from "@chakra-ui/card";
import { Flex, Text, Grid } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { DummyImageIcon } from "@nepMeds/assets/svgs";
// import { Specialization } from "@nepMeds/service/nepmeds-specialization";
// import { Symptom } from "@nepMeds/service/nepmeds-symptoms";
import { colors } from "@nepMeds/theme/colors";

enum Type {
  SPECIALIST,
  SYMPTOM,
  DOCTOR,
}

const Card: React.FC<{ data: any; type: number }> = ({ data, type }) => {
  return (
    <Grid templateColumns={"repeat(6, 1fr)"} gap={8} my={10}>
      {data.map((datum: any) => {
        const truncatedSymptomsList =
          type === Type.SPECIALIST &&
          datum.symptom_list &&
          datum?.symptom_list.slice(0, 4);
        return (
          <ChakraCard
            variant={"elevated"}
            width={"255px"}
            height={"282px"}
            textAlign={"center"}
            key={datum.id}
            pb={4}
          >
            <Flex gap={3} direction={"column"}>
              {datum.image ? (
                <Image
                  src={datum.image}
                  alt="Doctor Image"
                  width={"255px"}
                  height={"160px"}
                  objectFit={"cover"}
                />
              ) : (
                <DummyImageIcon />
              )}
              <Text
                size="md"
                fontWeight={700}
                fontSize={"14px"}
                color={colors.dark_blue}
              >
                {type === Type.SPECIALIST && datum.name}
                {type === Type.SYMPTOM && datum.name}
              </Text>
              <CardBody py={0}>
                <Flex direction={"column"} gap={4}>
                  <Text
                    display={"flex"}
                    justifyContent={"center"}
                    fontWeight={400}
                    fontSize={"11px"}
                    height={"35px"}
                  >
                    {type === Type.SPECIALIST &&
                      truncatedSymptomsList &&
                      truncatedSymptomsList.map(
                        (symptom: any, index: number) => {
                          return `${symptom.name}${
                            truncatedSymptomsList.length - 1 !== index
                              ? ","
                              : ""
                          } `;
                        }
                      )}
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
    </Grid>
  );
};

export default Card;
