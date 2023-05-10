import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import BasicInformation from "@nepMeds/pages/Register/BasicInfo";
import Login from "@nepMeds/pages/Login/Login";
import SignUp from "@nepMeds/pages/SignUp/SignUp";
import OtpSignUp from "@nepMeds/pages/SignUp/OtpSignup";

const routes = [
  {
    path: NAVIGATION_ROUTES.REGISTER,
    element: <BasicInformation />,
  },
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: NAVIGATION_ROUTES.SIGNUP,
    element: <SignUp />,
  },
  {
    path: NAVIGATION_ROUTES.OTPVERIFY,
    element: <OtpSignUp />,
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
