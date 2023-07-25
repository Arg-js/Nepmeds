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
            <Menu>
              <MenuButton
                sx={{
                  "&>span": { display: "flex", alignItems: "center", gap: 2 },
                }}
              >
                <Text
                  display={"flex"}
                  fontSize={{ sm: "12px", xl: "18px", base: "16px" }}
                >
                  {data?.first_name || "Admins"} {data?.middle_name}{" "}
                  {data?.last_name}&nbsp;
                </Text>

                <Avatar src={data?.profile_picture} size="md" />
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to={"/doctor-profile"}>
                  Profile
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
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
