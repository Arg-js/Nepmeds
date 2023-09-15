import { Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Divider,
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
import { colors } from "@nepMeds/theme/colors";

import { useProfileData } from "@nepMeds/context/index";
import { Link } from "react-router-dom";

const Navbar = () => {
  const logoutAction = useLogoutMutation();
  const logout = () => {
    logoutAction.mutate();
  };
  const { register } = useForm();

  const profileData = useProfileData();

  return (
    <>
      <Stack p={"15px 21px"} background="white">
        <HStack justify={"space-between"} alignItems={"center"}>
          <Text fontWeight={"500"} fontSize={"20px"} color={colors.black_60}>
            Dashboard
          </Text>
          <HStack justifyContent={"end"}>
            <Box w={"60%"}>
              <Input
                height={"32px"}
                borderRadius={"8px"}
                name="search"
                register={register}
                type="text"
                border="none"
                endIcons={
                  <Icon
                    mb={"8px"}
                    fontSize={20}
                    color={colors.blue_100}
                    as={Search2Icon}
                  />
                }
                backgroundColor={colors.blue_10}
                placeholder="Search"
              />
            </Box>

            <Box px={"2"}>
              <Notification
                size="large"
                set="bulk"
                primaryColor={colors.blue_100}
              />
            </Box>

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
                  {profileData?.data?.first_name || "Admin"}{" "}
                  {profileData?.data?.middle_name}{" "}
                  {profileData?.data?.last_name}
                  &nbsp;
                </Text>

                <Avatar
                  src={profileData?.data?.profile_picture}
                  size="sm"
                  rounded="lg"
                />
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to={"/doctor-profile"}>
                  Profile
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
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
