import Dashboard from "@nepMeds/pages/Dashboard";
import Login from "@nepMeds/pages/Login/Login";
import Register from "@nepMeds/pages/Register";
import AcademicInfo from "@nepMeds/pages/Register/AcademicInfo";
import BasicInfo from "@nepMeds/pages/Register/BasicInfo";
import CertificationInfo from "@nepMeds/pages/Register/CertificationInfo";
import ExperienceInfo from "@nepMeds/pages/Register/ExperienceInfo";
import PrimaryInfo from "@nepMeds/pages/Register/PrimaryInfo";
import OtpSignUp from "@nepMeds/pages/SignUp/OtpSignup";
import SignUp from "@nepMeds/pages/SignUp/SignUp";
import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";

const routes = [
  {
    path: NAVIGATION_ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: NAVIGATION_ROUTES.REGISTRATION.BASIC_INFO,
    element: <BasicInfo />,
  },
  {
    path: NAVIGATION_ROUTES.REGISTRATION.PRIMARY_INFO,
    element: <PrimaryInfo />,
  },
  {
    path: NAVIGATION_ROUTES.REGISTRATION.ACADEMIC_INFO,
    element: <AcademicInfo />,
  },
  {
    path: NAVIGATION_ROUTES.REGISTRATION.CERTIFICATION_INFO,
    element: <CertificationInfo />,
  },
  {
    path: NAVIGATION_ROUTES.REGISTRATION.EXPERIENCE_INFO,
    element: <ExperienceInfo />,
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
  {
    path: NAVIGATION_ROUTES.DASHBOARD,
    element: <Dashboard />,
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
