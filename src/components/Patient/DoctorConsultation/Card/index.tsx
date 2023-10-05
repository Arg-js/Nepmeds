import { CardBody, Card as ChakraCard } from "@chakra-ui/card";
import { Flex, Text } from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import userAvatar from "@nepMeds/assets/images/userAvatar.png";
import { Symptom } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { AxiosError } from "axios";
import "react-multi-carousel/lib/styles.css";

const Card: React.FC<{
  name: string;
  image: string;
  description: Symptom[] | string;
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
      width={"90%"}
      height={"282px"}
      textAlign={"center"}
      mb={1}
      pb={4}
      cursor={"pointer"}
    >
      <Flex gap={3} direction={"column"}>
        <Image
          src={image || userAvatar}
          alt="Doctor Image"
          width={"full"}
          height={"160px"}
          objectFit={"cover"}
          objectPosition={"top"}
        />

        <Text
          size="md"
          fontWeight={700}
          fontSize={"sm"}
          color={colors.dark_blue}
          textTransform={"capitalize"}
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
              {typeof description === "string"
                ? description.split(", ").slice(0, 4).join(", ")
                : description?.map(
                    (symptom: Symptom, index: number) =>
                      `${symptom.name}${
                        description.length - 1 !== index ? "," : ""
                      } `
                  )}
            </Text>
            <Button
              variant={"link"}
              fontWeight={600}
              fontSize={"11px"}
              color={colors.primary}
            >
              Consult now &gt;
            </Button>
          </Flex>
        </CardBody>
      </Flex>
    </ChakraCard>
  );
};

export default Card;
