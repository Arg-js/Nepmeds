import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useLocation } from "react-router-dom";

const hideNavArr = [NAVIGATION_ROUTES.DOCTOR_PROFILE_UNAPPROVED];

const useShouldHideNavBar = () => {
  const { pathname } = useLocation();

  return hideNavArr.includes(pathname);
};

export default useShouldHideNavBar;
