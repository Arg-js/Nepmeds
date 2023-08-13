import { CardBody, Card as ChakraCard } from "@chakra-ui/card";
import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { DummyImageIcon } from "@nepMeds/assets/svgs";
// import { Specialization } from "@nepMeds/service/nepmeds-specialization";
// import { Symptom } from "@nepMeds/service/nepmeds-symptoms";
import { colors } from "@nepMeds/theme/colors";
import Carousel from "better-react-carousel";

enum Type {
  SPECIALIST,
  SYMPTOM,
  DOCTOR,
}

const Card: React.FC<{ data: any; type: number }> = ({ data, type }) => {
  return (
    <Carousel cols={9} rows={1} gap={20} loop key={data}>
      {data.map((datum: any) => {
        const truncatedSymptomsList =
          type === Type.SPECIALIST &&
          datum.symptom_list &&
          datum?.symptom_list.slice(0, 4);
        return (
          <Carousel.Item key={datum.id}>
            <ChakraCard
              variant={"elevated"}
              width={"255px"}
              height={"282px"}
              textAlign={"center"}
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
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Card;
