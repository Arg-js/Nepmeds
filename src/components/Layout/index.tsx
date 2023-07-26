import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import { STATUSTYPE } from "@nepMeds/config/enum";
import AuthDataProvider from "@nepMeds/context/AuthDataContext";
import { useProfileData } from "@nepMeds/context/index";
import { useLogoutMutation } from "@nepMeds/service/nepmeds-auth";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <AuthDataProvider>
      <LayoutComponent />
    </AuthDataProvider>
  );
};

const LayoutComponent = () => {
  const profileData = useProfileData();
  const [active, setActive] = useState(true);
  const logoutAction = useLogoutMutation();
  const logout = () => {
    logoutAction.mutate();
  };

  if (profileData?.isLoading)
    return (
      <Spinner
        style={{
          margin: "0 auto",
          textAlign: "center",
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "25%",
        }}
      />
    );

  return (
    <AuthDataProvider>
      {active &&
      profileData?.data?.is_doctor &&
      profileData?.data?.doctor?.status !== STATUSTYPE.approved.toString() ? (
        <>
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            h={"700px"}
            flexDir={"row"}
            width={"100%"}
          >
            <svgs.Work />
          </Box>
          <Stack justifyContent={"center"} alignItems={"center"} mt={"-150px"}>
            <Heading color={"red"}>Account on Hold</Heading>
            <Text color={colors.gray_700} fontSize={"18px"}>
              Since, your application has been put on hold due to insufficient
              details provided. To resubmit the application for verification
              please click here.
            </Text>
          </Stack>
          <Stack pt={"15px"} justifyContent={"center"} alignItems={"center"}>
            <Button
              color={colors.white}
              bg={colors.primary}
              width={"250px"}
              h={"60px"}
              sx={{
                "&:hover": { color: colors.white, bg: colors.primary },
              }}
              as={Link}
              to={"/doctor-profile"}
              onClick={() => {
                setActive(false);
              }}
            >
              {" "}
              Click Here
            </Button>
            <Button onClick={logout}>Logout</Button>
          </Stack>
        </>
      ) : (
        <>
          <Grid
            templateAreas={
              profileData?.data?.is_superuser ||
              profileData?.data?.doctor?.status ===
                STATUSTYPE.approved.toString()
                ? `"side nav"`
                : `"nav"`
            }
            gridTemplateColumns={
              profileData?.data?.is_superuser ||
              profileData?.data?.doctor?.status ===
                STATUSTYPE.approved.toString()
                ? "296px 1fr"
                : "1fr"
            }
            gap="1"
          >
            <GridItem area={"side"}>
              <Sidebar />
            </GridItem>
            {profileData?.data?.is_superuser ? (
              <GridItem area={"side"}>
                <Sidebar />
              </GridItem>
            ) : (
              profileData?.data?.is_doctor &&
              profileData?.data?.doctor?.status ===
                STATUSTYPE.approved.toString() && (
                <GridItem area={"side"}>
                  <Sidebar />
                </GridItem>
              )
            )}

            <GridItem bg={colors.bg} area={"nav"}>
              <Navbar />
              <Box
              //  m={2}
              >
                <Outlet />
              </Box>
            </GridItem>
          </Grid>
        </>
      )}
    </AuthDataProvider>
  );
};

export default Layout;
