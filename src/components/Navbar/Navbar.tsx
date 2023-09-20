import {
  Avatar,
  Box,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Home, Notification } from "react-iconly";

import { useLogoutMutation } from "@nepMeds/service/nepmeds-auth";
import { colors } from "@nepMeds/theme/colors";

import { useProfileData } from "@nepMeds/context/index";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const logoutAction = useLogoutMutation();
  const logout = () => {
    logoutAction.mutate();
  };

  const profileData = useProfileData();

  const { pathname } = useLocation();

  return (
    <>
      <Stack p={"15px 21px"} background="white">
        <HStack justify={"space-between"} alignItems={"center"}>
          <Text
            fontWeight={"500"}
            fontSize={"xl"}
            color={colors.black_60}
            textTransform={"capitalize"}
          >
            {pathname ? "Dashboard" : pathname.split("/")[1].replace("-", " ")}
          </Text>
          <HStack justifyContent={"end"}>
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
