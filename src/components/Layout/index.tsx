import {
  Box,
  Button,
  Container,
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
        <Container maxW="100%">
          <Box m={"auto"} mt={"7%"}>
            <Box
              justifyContent={"center"}
              alignItems={"center"}
              display={"flex"}
              h={"auto"}
              flexDir={"row"}
              width={"100%"}
              mt={"30px"}
              // bg={"red"}
            >
              <svgs.Work />
            </Box>
            <Stack justifyContent={"center"} alignItems={"center"}>
              <Heading color={"red"}>
                Account on{" "}
                {profileData.data.doctor?.status ===
                STATUSTYPE.rejected.toString()
                  ? "Hold"
                  : "Pending"}
              </Heading>
              <Text
                color={colors.gray_700}
                fontSize={"18px"}
                w={"50%"}
                textAlign={"center"}
              >
                Since, your application has been put on hold due to insufficient
                details provided.{"\n"} To resubmit the application for
                verification please{" "}
                <Button
                  variant={"unstyled"}
                  as={Link}
                  to={"/doctor-profile"}
                  onClick={() => {
                    setActive(false);
                  }}
                  fontSize={"16px"}
                  fontWeight={"500"}
                  color={colors.blue_100}
                >
                  click here
                </Button>
              </Text>

              {profileData.data.doctor?.status ===
                STATUSTYPE.rejected.toString() && (
                <Box
                  p={"18px"}
                  borderRadius={"16px"}
                  bg={"#FEE2E2"}
                  w={"auto"}
                  display={"flex"}
                >
                  <Heading fontSize={"18px"} color={colors.red}>
                    Rejected Reason :{" "}
                  </Heading>
                  <Text color={colors.red}>
                    {profileData.data.doctor.rejected_remarks}
                  </Text>
                </Box>
              )}
            </Stack>
            <Stack pt={"15px"} justifyContent={"center"} alignItems={"center"}>
              <Button onClick={logout}>Logout</Button>
            </Stack>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            pb={"15px"}
            pr={"50px"}
            mt={"3%"}
          >
            <svgs.logo />
          </Box>
        </Container>
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
