import Layout from "@nepMeds/components/Layout";
import MasterData from "@nepMeds/pages/Admin/MasterData";
import Dashboard from "@nepMeds/pages/Dashboard";
import AllDoctors from "@nepMeds/pages/DoctorList/AllDoctors";
import Login from "@nepMeds/pages/Login/Login";
import Register from "@nepMeds/pages/Register";
import AcademicInfo from "@nepMeds/pages/Register/AcademicInfo";
import BasicInfo from "@nepMeds/pages/Register/BasicInfo";
import CertificationInfo from "@nepMeds/pages/Register/CertificationInfo";
import ExperienceInfo from "@nepMeds/pages/Register/ExperienceInfo";
import PrimaryInfo from "@nepMeds/pages/Register/PrimaryInfo";
import SignUp from "@nepMeds/pages/SignUp/SignUp";
import { useAuthentication } from "@nepMeds/service/nepmeds-auth";
import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";

const routes = [
  {
    path: NAVIGATION_ROUTES.LOGGEDIN,
    element: <Layout />,
    children: [
      {
        path: NAVIGATION_ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: NAVIGATION_ROUTES.MASTER_DATA,
        element: <MasterData />,
      },
      {
        path: NAVIGATION_ROUTES.DOCTOR_LIST,
        element: <AllDoctors />,
      },
    ],
  },
  {
    path: NAVIGATION_ROUTES.NO_MATCH,
    element: <Login />,
  },
];

const openRoutes = [
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
];

const AppRoutes = () => {
  const isAuthenticated = useAuthentication();

  return useRoutes(isAuthenticated ? routes : openRoutes);
};

export default AppRoutes;
