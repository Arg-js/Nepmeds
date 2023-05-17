import { Flex, Image } from "@chakra-ui/react";
import NepmedsLogo from "@nepMeds/assets/images/logo.png";

const Header = () => {
  return (
    <Flex py={3.75} px={3.75} background="white">
      <Image src={NepmedsLogo} alt="nepmeds logo" h={20} />
    </Flex>
  );
};

export default Header;
