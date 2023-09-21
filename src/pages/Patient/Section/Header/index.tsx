import {
  Box,
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
import { SearchIcon } from "@chakra-ui/icons";
import { HamburgerMenuIcon, SignInIcon } from "@nepMeds/assets/svgs";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { colors } from "@nepMeds/theme/colors";
import TokenService from "@nepMeds/service/service-token";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = TokenService.isAuthenticated();
  return (
    <WrapperBox
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
          onClick={() => navigate(NAVIGATION_ROUTES.DOCTOR_CONSULTATION)}
          cursor={"pointer"}
        />
        <Flex alignItems={"center"} justifyContent={"space-around"} gap={6}>
          {/* Search Field */}
          <InputGroup
            style={{ height: "46px" }}
            width={{ base: "auto", lg: "561px" }}
            display={{ base: "none", md: "block" }}
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
          {/* Search Field ends */}

          {/* Login icon */}
          {!isAuthenticated && (
            <Flex
              gap={1}
              cursor={"pointer"}
              onClick={() =>
                (window.location.href =
                  import.meta.env.VITE_APP_NEPMEDS_LOGIN_ROUTE)
              }
              display={{ base: "none", md: "flex" }}
            >
              <SignInIcon />
              <Text fontWeight={500} fontSize={"sm"} color={colors.black}>
                Login/SignUp
              </Text>
            </Flex>
          )}
          {/* Login icon ENDS*/}
        </Flex>

        <Box display={{ base: "block", md: "none" }}>
          <HamburgerMenuIcon />
        </Box>
        {/* ENDS */}
      </Flex>
    </WrapperBox>
  );
};

export default Header;
