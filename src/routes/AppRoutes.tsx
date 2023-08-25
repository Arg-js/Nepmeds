import { Center, Spinner } from "@chakra-ui/react";
import Layout from "@nepMeds/components/Layout";
import MasterData from "@nepMeds/pages/Admin/MasterData";
import ConfirmPassword from "@nepMeds/pages/ConfirmPassword/ConfirmPassword";
import Dashboard from "@nepMeds/pages/Dashboard";
import DoctorProfile from "@nepMeds/pages/DoctorList/DoctorProfile";
import DocProfileAdmin from "@nepMeds/pages/DoctorProfile/DocProfileAdmin";
import ForgotPassword from "@nepMeds/pages/ForgotPassword/ForgotPassword";
import Login from "@nepMeds/pages/Login/Login";
import Calendar from "@nepMeds/pages/NewCalendar";
import PaymentDetails from "@nepMeds/pages/Payment";
import Register from "@nepMeds/pages/Register";
import AcademicInfo from "@nepMeds/pages/Register/AcademicInfo";
import BasicInfo from "@nepMeds/pages/Register/BasicInfo";
import CertificationInfo from "@nepMeds/pages/Register/CertificationInfo";
import ExperienceInfo from "@nepMeds/pages/Register/ExperienceInfo";
import PrimaryInfo from "@nepMeds/pages/Register/PrimaryInfo";
import SignUp from "@nepMeds/pages/SignUp/SignUp";
import {
  useAuthentication,
  useLoginTokenDetailQuery,
} from "@nepMeds/service/nepmeds-auth";
import { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import DoctorConsultation from "@nepMeds/pages/Patient/DoctorConsultation";
import DoctorList from "@nepMeds/pages/Patient/DoctorList";
import DoctorsList from "@nepMeds/components/Table/Doctor/DoctorsList";
import PaymentList from "@nepMeds/components/Table/Payment/PaymentList";
import Appointment from "@nepMeds/pages/Doctor/Appointment";

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
        path: NAVIGATION_ROUTES.APPOINTMENTS,
        element: <Appointment />,
      },
      {
        path: NAVIGATION_ROUTES.FOLLOWUP,
        element: <>Followup</>,
      },
      {
        path: NAVIGATION_ROUTES.PATIENT_HISTORY,
        element: <>patient history</>,
      },
      {
        path: NAVIGATION_ROUTES.CALENDER,
        element: <Calendar />,
      },

      {
        path: NAVIGATION_ROUTES.PAYMENT,
        element: <PaymentDetails />,
      },
      {
        path: NAVIGATION_ROUTES.DOCTOR_PROFILE,
        element: <DoctorProfile />,
      },
      {
        path: NAVIGATION_ROUTES.DOCTOR_CONSULTATION,
        element: <DoctorConsultation />,
      },
      {
        path: NAVIGATION_ROUTES.DOCTOR_LIST_PATIENT_MODULE,
        element: <DoctorList />,
      },
    ],
  },
  {
    path: NAVIGATION_ROUTES.NO_MATCH,
    element: <Navigate to={NAVIGATION_ROUTES.DASHBOARD} replace />,
  },
];
const paientRoutes = [
  {
    path: NAVIGATION_ROUTES.LOGGEDIN,
    children: [
      {
        path: NAVIGATION_ROUTES.DOCTOR_CONSULTATION,
        element: <DoctorConsultation />,
      },
      {
        path: NAVIGATION_ROUTES.DOCTOR_LIST_PATIENT_MODULE,
        element: <DoctorList />,
      },
    ],
  },
];
const adminRoutes = [
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
        children: [
          {
            path: NAVIGATION_ROUTES.DOCTOR_LIST_REGISTRATION,
            element: <DoctorsList />,
          },
          {
            path: NAVIGATION_ROUTES.DOCTOR_LIST_PAYMENT,
            element: <PaymentList />,
          },
        ],
      },
      {
        path: NAVIGATION_ROUTES.DOC_PROFILE,
        element: <DocProfileAdmin />,
      },

      {
        path: NAVIGATION_ROUTES.PATIENTS,
        element: <>Patients</>,
      },
      {
        path: NAVIGATION_ROUTES.APPOINTMENTS,
        element: <>Appointments</>,
      },
      {
        path: NAVIGATION_ROUTES.USER_ROLE,
        element: <>User Role</>,
      },
      {
        path: NAVIGATION_ROUTES.CONSULT_REQUEST,
        element: <>Consult Request</>,
      },
    ],
  },
  {
    path: NAVIGATION_ROUTES.NO_MATCH,
    element: <Navigate to={NAVIGATION_ROUTES.DASHBOARD} replace />,
  },
];
const openRoutes = [
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <DoctorConsultation />,
  },
  {
    path: NAVIGATION_ROUTES.DOCTOR_LOGIN,
    element: <Login />,
  },
  {
    path: NAVIGATION_ROUTES.SIGNUP,
    element: <SignUp />,
  },
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
    path: NAVIGATION_ROUTES.FORGOTPASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: NAVIGATION_ROUTES.CONFIRMPASSWORD,
    element: <ConfirmPassword />,
  },

  // {
  //   path: NAVIGATION_ROUTES.DASHBOARD,
  //   element: <Dashboard />,
  // },
  {
    path: NAVIGATION_ROUTES.DOCTOR_CONSULTATION,
    element: <DoctorConsultation />,
  },
  {
    path: NAVIGATION_ROUTES.DOCTOR_LIST_PATIENT_MODULE,
    element: <DoctorList />,
  },
  {
    path: NAVIGATION_ROUTES.NO_MATCH,
    element: <Navigate to={NAVIGATION_ROUTES.DOCTOR_CONSULTATION} />,
  },
];

const AppRoutes = () => {
  const { data: isAuthenticated, isLoading } = useAuthentication();
  const { data: userInfo } = useLoginTokenDetailQuery();
  const element = useRoutes(
    isAuthenticated
      ? userInfo?.is_superuser
        ? adminRoutes
        : userInfo?.is_patient
        ? paientRoutes
        : routes
      : openRoutes
  );

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  return <Suspense fallback={<Spinner />}>{element}</Suspense>;
};

export default AppRoutes;
