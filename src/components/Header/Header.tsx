import { Flex, Image } from "@chakra-ui/react";
import NepmedsLogo from "@nepMeds/assets/images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Flex py={3.75} px={3.75} background="white">
      <Link to="/">
        <Image src={NepmedsLogo} alt="nepmeds logo" h={15} />
      </Link>
    </Flex>
  );
};

export default Header;
