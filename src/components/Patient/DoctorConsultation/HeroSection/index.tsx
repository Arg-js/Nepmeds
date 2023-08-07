import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { colors } from "@nepMeds/theme/colors";

const HeroSection = () => {
  return (
    <Flex direction={"column"} gap={4}>
      <Text color={colors.dark_blue} fontWeight={600} fontSize={"16px"}>
        The right care, is wherever you are.
      </Text>
      <Text fontWeight={700} fontSize={"36px"} maxWidth={"391px"}>
        Consult Nepal’s Top Doctors Online, Safely From Home.
      </Text>
      <Flex gap={"10"} alignItems={"center"}>
        <Flex width="auto">
          <Image
            borderRadius="full"
            boxSize="42px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
          <Image
            borderRadius="full"
            boxSize="42px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
          <Image
            borderRadius="full"
            boxSize="42px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
        </Flex>

        <Text fontWeight={500} fontSize={"16px"}>
          +128 Doctors enlisted
        </Text>
      </Flex>
      <Button
        fontWeight={600}
        fontSize={"16px"}
        width={"max-content"}
        bg={colors.primary}
        color={colors.white}
        // same
        borderRadius={"3px"}
        height={"42px"}
        px={7}
      >
        Consult Now
      </Button>
    </Flex>
  );
};

export default HeroSection;
