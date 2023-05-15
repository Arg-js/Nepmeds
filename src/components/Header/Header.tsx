import { Flex, Image } from "@chakra-ui/react";
const Header = () => {
  return (
    <Flex py={3.75} px={3.75} background="white">
      <Image
        src="../src/assets/images/logo.png"
        alt="nepmeds logo"
        objectFit="contain"
        w="180px"
      />
    </Flex>
  );
};

export default Header;
