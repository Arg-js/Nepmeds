import { CardBody, Card as ChakraCard } from "@chakra-ui/card";
import { Flex, Text } from "@chakra-ui/layout";
import { Image, Spinner } from "@chakra-ui/react";
import { DummyImageIcon } from "@nepMeds/assets/svgs";
// import { Specialization } from "@nepMeds/service/nepmeds-specialization";
// import { Symptom } from "@nepMeds/service/nepmeds-symptoms";
import { colors } from "@nepMeds/theme/colors";
import { AxiosError } from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export enum Type {
  SPECIALIST,
  SYMPTOM,
  DOCTOR,
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

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
      <Carousel responsive={responsive}>
        {data.map((datum: any) => {
          const truncatedSymptomsList =
            type === Type.SPECIALIST &&
            datum.symptom_list &&
            datum?.symptom_list.slice(0, 4);
          return isLoading ? (
            <Spinner />
          ) : (
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
          );
        })}
      </Carousel>
    )
  );
};

export default Card;
