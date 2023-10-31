import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { STATUSTYPE } from "@nepMeds/config/enum";
import AuthDataProvider from "@nepMeds/context/AuthDataContext";
import { useProfileData } from "@nepMeds/context/index";
import useShouldHideNavBar from "@nepMeds/hooks/useShouldHideNavBar";
import useWindowResize from "@nepMeds/hooks/useWindowResize";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { colors } from "@nepMeds/theme/colors";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const hideNav = useShouldHideNavBar();

  const sidebarCollapsed = useWindowResize();
  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useState(sidebarCollapsed);

  useEffect(() => {
    if (profileData?.data) {
      if (
        profileData?.data?.is_doctor &&
        // TODO: convert enum to string
        profileData?.data?.doctor?.status !== STATUSTYPE.approved.toString()
      ) {
        navigate(NAVIGATION_ROUTES.DOCTOR_PROFILE_UNAPPROVED, {
          replace: true
        });
      }
    }
  }, [profileData?.data]);

  if (profileData?.isLoading)
    return (
      <Spinner
        style={{
          margin: "0 auto",
          textAlign: "center",
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "25%"
        }}
      />
    );

  return (
    <AuthDataProvider>
      <Grid
        templateAreas={
          profileData?.data?.is_superuser ||
          profileData?.data?.doctor?.status === STATUSTYPE.approved.toString()
            ? `"side nav"`
            : `"nav"`
        }
        gridTemplateColumns={
          profileData?.data?.is_superuser ||
          profileData?.data?.doctor?.status === STATUSTYPE.approved.toString()
            ? isSidebarCollapsed
              ? "78px 1fr"
              : // "minmax(78px 236px) 1fr"
                "205px 1fr"
            : "1fr"
        }
        gap="1"
      >
        {(profileData?.data?.is_superuser ||
          (profileData?.data?.is_doctor &&
            profileData?.data?.doctor?.status ===
              STATUSTYPE.approved.toString())) && (
          <GridItem area={"side"}>
            <Sidebar sidebarCollapsed={isSidebarCollapsed} />
          </GridItem>
        )}

        <GridItem bg={colors.bg} area={"nav"}>
          {!hideNav && <Navbar setSidebarCollapsed={setIsSidebarCollapsed} />}
          <Outlet />
        </GridItem>
      </Grid>
    </AuthDataProvider>
  );
};

export default Layout;
