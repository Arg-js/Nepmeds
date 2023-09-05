import { Flex, Image } from "@chakra-ui/react";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import NepmedsLogo from "@nepMeds/assets/images/logo.png";
import { colors } from "@nepMeds/theme/colors";

const Header: React.FC = () => {
  return (
    <WrapperBox
      backgroundColor={colors.white}
      height={"100px"}
      padding={"6"}
      boxShadow={"rgba(99, 99, 99, 0.2) 0px 0px 10px 0px"}
      style={{
        mb: "2px",
      }}
    >
      <Flex>
        <Image
          src={NepmedsLogo}
          alt={"Nepmemds logo"}
          onClick={() =>
            (window.location.href =
              import.meta.env.VITE_APP_NEPMEDS_LOGIN_ROUTE)
          }
          cursor={"pointer"}
        />
        {/* Search Field */}
      </Flex>
    </WrapperBox>
  );
};

export default Header;
