import {
  Avatar,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";

import { useLogoutMutation } from "@nepMeds/service/nepmeds-auth";
import { colors } from "@nepMeds/theme/colors";

import { useProfileData } from "@nepMeds/context/index";
import { Link, useLocation } from "react-router-dom";
import { HamburgerMenuIcon } from "@nepMeds/assets/svgs";
import { Dispatch, SetStateAction } from "react";
import { useSetDoctorOnline } from "@nepMeds/service/nepmeds-doctor-availability";

const Navbar = ({
  setSidebarCollapsed,
}: {
  setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
}) => {
  const { mutateAsync: setDoctorOnline } = useSetDoctorOnline();
  const logoutAction = useLogoutMutation({});
  const logout = () => {
    logoutAction.mutate({});
  };

  const profileData = useProfileData();

  const { pathname } = useLocation();

  return (
    <>
      <Stack p={"15px 21px"} background="white">
        <HStack justify={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={4}>
            <HamburgerMenuIcon
              cursor={"pointer"}
              onClick={() => setSidebarCollapsed((prev: boolean) => !prev)}
            />

            <Text
              fontWeight={"500"}
              fontSize={"xl"}
              color={colors.black_60}
              textTransform={"capitalize"}
            >
              {/* TODO: keep this in utils */}
              {pathname
                ? pathname.split("/")[1].replaceAll("-", " ")
                : "Dashboard"}
            </Text>
          </Flex>

          <HStack justifyContent={"end"}>
            {/* TODO: notification in progress */}
            {/* <Notification
              size="large"
              set="bulk"
              primaryColor={colors.blue_100}
            /> */}

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
              {/* TODO: UPDATE THIS UI fix*/}
              <MenuList minWidth="240px">
                <MenuItem as={Link} to={"/doctor-profile"}>
                  Profile
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
            {profileData?.data?.is_doctor && (
              <Switch
                size={"lg"}
                colorScheme={"green"}
                // Since there is a validation check to confirm whether the data represents a doctor,
                // it is safe to assume that a doctor object will always be present in the response body.
                // Therefore, using the following assertion (!) is secure:
                defaultChecked={profileData.data.doctor!.is_online}
                onChange={e => {
                  setDoctorOnline({ is_online: e.target.checked });
                }}
              />
            )}
          </HStack>
        </HStack>
        {/* TODO: consult with design */}
        {/* <Divider mt={"14px"} />
        <Box>
          <Home set="bulk" primaryColor={colors.blue_100} />
        </Box> */}
      </Stack>
    </>
  );
};

export default Navbar;
