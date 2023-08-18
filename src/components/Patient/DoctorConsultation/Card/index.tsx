import { CardBody, Card as ChakraCard } from "@chakra-ui/card";
import { Flex, Text } from "@chakra-ui/layout";
import { Image, Spinner } from "@chakra-ui/react";
import { DummyImageIcon } from "@nepMeds/assets/svgs";
// import { Specialization } from "@nepMeds/service/nepmeds-specialization";
// import { Symptom } from "@nepMeds/service/nepmeds-symptoms";
import { colors } from "@nepMeds/theme/colors";
import { AxiosError } from "axios";

export enum Type {
  SPECIALIST,
  SYMPTOM,
  DOCTOR,
}

const Card: React.FC<{
  data: any;
  type: number;
  isLoading: boolean;
  error: AxiosError;
}> = ({ data, type, isLoading, error }) => {
  return error?.response?.status === 500 ? (
    <Flex width={"255px"} height={"282px"} alignItems={"center"}>
      Oops something went wrong!!
    </Flex>
  ) : (
    data && (
      <Flex gap={3}>
        {data.map((datum: any) => {
          const truncatedSymptomsList =
            type === Type.SPECIALIST &&
            datum.symptom_list &&
            datum?.symptom_list.slice(0, 4);
          return isLoading ? (
            <Spinner />
          ) : (
            // <Carousel.Item key={datum.id}>
            <ChakraCard
              variant={"elevated"}
              width={"255px"}
              height={"282px"}
              textAlign={"center"}
              mb={1}
              pb={4}
              key={datum.id}
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
            // </Carousel.Item>
          );
        })}
      </Flex>
    )
  );
};

export default Card;
