import {
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import NepmedsLogo from "@nepMeds/assets/images/logo.png";
import { colors } from "@nepMeds/theme/colors";
import { SearchIcon } from "@chakra-ui/icons";
import { SignInIcon } from "@nepMeds/assets/svgs";

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
      <Flex justifyContent={"space-between"}>
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
        <Flex alignItems={"center"} justifyContent={"space-around"} gap={6}>
          <InputGroup
            style={{ width: "561px", minWidth: "200px", height: "46px" }}
          >
            <InputRightElement pointerEvents="none">
              <IconButton
                right="1px"
                aria-label="button"
                height="38px"
                size="sm"
                borderLeftRadius={0}
                borderRightRadius="30px"
                width={{ base: "30px", md: "61px" }}
              >
                <SearchIcon fill="#fff" />
              </IconButton>
            </InputRightElement>
            <Input
              type="text"
              placeholder="Search for doctors"
              borderRadius="30px"
              borderColor={colors.primary}
              color={colors.gray_text_header}
            />
          </InputGroup>
          <Flex
            gap={1}
            cursor={"pointer"}
            onClick={() =>
              (window.location.href =
                import.meta.env.VITE_APP_NEPMEDS_LOGIN_ROUTE)
            }
          >
            <SignInIcon />
            <Text fontWeight={500} fontSize={"sm"} color={colors.black}>
              Login/SignUp
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </WrapperBox>
  );
};

export default Header;
