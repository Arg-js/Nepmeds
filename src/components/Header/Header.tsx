import { Flex } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
const Header = () => {
  return (
    <>
      <Flex py={15} px={15}>
        <Image
          src="../src/assets/images/logo.png"
          alt="nepmeds logo"
          objectFit="contain"
          w="180px"
        />
      </Flex>
    </>
  );
};

export default Header;
