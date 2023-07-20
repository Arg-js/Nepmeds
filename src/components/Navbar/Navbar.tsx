import { Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Home, Notification } from "react-iconly";

import Input from "@nepMeds/components/Form/Input";
import { useLogoutMutation } from "@nepMeds/service/nepmeds-auth";
import { useDoctorBasicProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { colors } from "@nepMeds/theme/colors";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = () => {
  const logoutAction = useLogoutMutation();
  const logout = () => {
    logoutAction.mutate();
  };
  const { register } = useForm();

  const { data } = useDoctorBasicProfile();
  return (
    <>
      <Stack p={"15px 21px"} background="white">
        <HStack>
          <Box w={"55%"}>
            <Text fontWeight={"500"} fontSize={"20px"} color={"#45464E"}>
              Dashboard
            </Text>
          </Box>
          <Box w={"20%"}>
            <Input
              height={"32px"}
              borderRadius={"8px"}
              name="search"
              register={register}
              type="text"
              border="none"
              endIcons={
                <Icon
                  mr={"18px"}
                  fontSize={20}
                  color={colors.blue_100}
                  as={Search2Icon}
                />
              }
              backgroundColor={colors.blue_10}
              placeholder="Search"
            />
          </Box>
          <Flex alignItems={"center"} w={"5%"}>
            <Notification
              size="large"
              set="bulk"
              primaryColor={colors.blue_100}
            />
          </Flex>
          <Flex gap={"20px"} alignItems={"center"}>
            <Text
              display={"flex"}
              fontSize={{ sm: "12px", xl: "18px", base: "16px" }}
            >
              {data?.user_details?.first_name} {data?.user_details?.middle_name}{" "}
              {data?.user_details?.last_name}
            </Text>

            <Avatar
              src={data?.user_details?.profile_picture}
              // as={Link}
              // to="/doctor-profile"
              size="md"
              // mr={"-100%"}
            />
            <Menu>
              <MenuButton>
                <Box
                  display={"flex"}
                  flexDir={"row"}
                  justifyContent={"center"}
                  alignItems={"end"}
                  ml={"-100%"}
                >
                  <RiArrowDropDownLine
                    fontSize={"45px"}
                    color={colors.primary}
                  />
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to={"/doctor-profile"}>
                  Profile
                </MenuItem>
                <MenuItem onClick={logout}>LogOut</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
        <Divider mt={"14px"} />
        <Box>
          <Home set="bulk" primaryColor={colors.blue_100} />
        </Box>
      </Stack>
    </>
  );
};

export default Navbar;
