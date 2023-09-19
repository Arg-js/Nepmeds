import CenterLoader from "@nepMeds/components/Common/Loader";
import {
  useAuthentication,
  useLoginTokenDetailQuery,
} from "@nepMeds/service/nepmeds-auth";
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Appointment from "@nepMeds/pages/Doctor/Appointment";

const UserRole = lazy(() => import("@nepMeds/pages/Admin/UserRole"));
const AdminAppointment = lazy(
  () => import("@nepMeds/pages/Admin/Appointments")
);

const Layout = lazy(() => import("@nepMeds/components/Layout"));
const DoctorsList = lazy(
  () => import("@nepMeds/components/Table/Doctor/DoctorsList")
);
const PaymentList = lazy(
  () => import("@nepMeds/components/Table/Payment/PaymentList")
);
const RateHistory = lazy(
  () => import("@nepMeds/components/Table/Payment/RateHistory")
);
const MasterData = lazy(() => import("@nepMeds/pages/Admin/MasterData"));
const ConfirmPassword = lazy(
  () => import("@nepMeds/pages/ConfirmPassword/ConfirmPassword")
);
const Dashboard = lazy(() => import("@nepMeds/pages/Dashboard"));
const UnApprovedDoctor = lazy(
  () => import("@nepMeds/pages/Dashboard/UnApproved")
);
const DoctorProfile = lazy(
  () => import("@nepMeds/pages/DoctorList/DoctorProfile")
);
const DocProfileAdmin = lazy(
  () => import("@nepMeds/pages/DoctorProfile/DocProfileAdmin")
);
const ForgotPassword = lazy(
  () => import("@nepMeds/pages/ForgotPassword/ForgotPassword")
);
const Login = lazy(() => import("@nepMeds/pages/Login/Login"));
const Calendar = lazy(() => import("@nepMeds/pages/NewCalendar"));
const DoctorConsultation = lazy(
  () => import("@nepMeds/pages/Patient/DoctorConsultation")
);
const DoctorList = lazy(() => import("@nepMeds/pages/Patient/DoctorList"));
const PaymentDetails = lazy(() => import("@nepMeds/pages/Payment"));
const Register = lazy(() => import("@nepMeds/pages/Register"));
const AcademicInfo = lazy(() => import("@nepMeds/pages/Register/AcademicInfo"));
const BasicInfo = lazy(() => import("@nepMeds/pages/Register/BasicInfo"));
const CertificationInfo = lazy(
  () => import("@nepMeds/pages/Register/CertificationInfo")
);
const ExperienceInfo = lazy(
  () => import("@nepMeds/pages/Register/ExperienceInfo")
);
const PrimaryInfo = lazy(() => import("@nepMeds/pages/Register/PrimaryInfo"));
const SignUp = lazy(() => import("@nepMeds/pages/SignUp/SignUp"));

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
        path: NAVIGATION_ROUTES.DOCTOR_PROFILE_UNAPPROVED,
        element: <UnApprovedDoctor />,
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
      {
        path: NAVIGATION_ROUTES.NO_MATCH,
        element: (
          <Navigate to={NAVIGATION_ROUTES.DOCTOR_CONSULTATION} replace />
        ),
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
        element: <AdminAppointment />,
      },
      {
        path: NAVIGATION_ROUTES.USER_ROLE,
        element: <UserRole />,
      },
      {
        path: NAVIGATION_ROUTES.CONSULT_REQUEST,
        element: <>Consult Request</>,
      },
      {
        path: NAVIGATION_ROUTES.AMOUNT_HISTORY,
        element: <RateHistory />,
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
    element: <Navigate to={NAVIGATION_ROUTES.DOCTOR_CONSULTATION} replace />,
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
    return <CenterLoader h="100vh" alignItems={"center"} />;
  }

  return (
    <Suspense fallback={<CenterLoader h={"100vh"} alignItems={"center"} />}>
      {element}
    </Suspense>
  );
};

export default AppRoutes;
