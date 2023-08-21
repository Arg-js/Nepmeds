import { CardBody, Card as ChakraCard } from "@chakra-ui/card";
import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import userAvatar from "@nepMeds/assets/images/userAvatar.png";
import { colors } from "@nepMeds/theme/colors";
import { AxiosError } from "axios";
import "react-multi-carousel/lib/styles.css";

const Card: React.FC<{
  name: string;
  image: string;
  // TODO
  // description: Record<string, string | number>[];
  description: Record<string, any>[];
  isLoading: boolean;
  error: AxiosError;
}> = ({ name, image, description, error }) => {
  return error?.response?.status === 500 ? (
    <Flex width={"255px"} height={"282px"} alignItems={"center"}>
      Oops something went wrong!!
    </Flex>
  ) : (
    <ChakraCard
      variant={"elevated"}
      width={"255px"}
      height={"282px"}
      textAlign={"center"}
      mb={1}
      pb={4}
    >
      <Flex gap={3} direction={"column"}>
        <Image
          src={image || userAvatar}
          alt="Doctor Image"
          width={"255px"}
          height={"160px"}
          objectFit={"contain"}
        />

        <Text
          size="md"
          fontWeight={700}
          fontSize={"14px"}
          color={colors.dark_blue}
        >
          {name}
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
              {description?.map(
                (symptom: any, index: number) =>
                  `${symptom.name}${
                    description.length - 1 !== index ? "," : ""
                  } `
              )}
            </Text>
            <Text fontWeight={600} fontSize={"11px"} color={colors.primary}>
              Consult now &gt;
            </Text>
          </Flex>
        </CardBody>
      </Flex>
    </ChakraCard>
  );
};

export default Card;
