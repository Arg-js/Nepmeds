import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
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

      {/* TODO */}
      {/* <Flex width="auto" position={"relative"}>
          <Image
          borderRadius="full"
          boxSize="42px"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
          position="absolute"
          />
          <Image
          borderRadius="full"
          boxSize="42px"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
          position="absolute"
          left={"150px"}
          />
          <Image
          borderRadius="full"
          boxSize="42px"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
          position="absolute"
          />
        </Flex> */}
      <Flex gap={"5"} alignItems={"center"}>
        <AvatarGroup size="md" max={2}>
          <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
          <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
          <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
        </AvatarGroup>

        <Text fontWeight={500} fontSize={"16px"} fontFamily={"Quicksand"}>
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
