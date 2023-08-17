import { Image } from "@chakra-ui/react";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import NepmedsLogo from "@nepMeds/assets/images/logo.png";
import { colors } from "@nepMeds/theme/colors";

const Header: React.FC = () => {
  return (
    <WrapperBox backgroundColor={colors.white} height={"100px"} padding={"6"}>
      <Image src={NepmedsLogo} alt={"Nepmemds logo"} />
    </WrapperBox>
  );
};

export default Header;
