import { Flex, Image } from "@chakra-ui/react";
import NepmedsLogo from "@nepMeds/assets/images/logo.png";

const Header = () => {
  return (
    <Flex py={3.75} px={3.75} background="white">
      <Image
        src={NepmedsLogo}
        alt="nepmeds logo"
        objectFit="contain"
        w="180px"
      />
    </Flex>
  );
};

export default Header;
