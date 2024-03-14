import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import PatientHistory from "@nepMeds/pages/Admin/PatientHistory";
import PatientHistoryDetails from "@nepMeds/pages/Admin/PatientHistory/PatientHistoryDetails";
import VisaPayment from "@nepMeds/pages/Payment/Component/VisaPayment";

const Appointment = lazy(() => import("@nepMeds/pages/Doctor/Appointment"));
const DoctorDetails = lazy(
  () => import("@nepMeds/pages/Patient/DoctorDetails")
);
const AllPaymentAdmin = lazy(
  () => import("@nepMeds/pages/Admin/Payment/AllPayment")
);
const RescheduleAppointment = lazy(
  () => import("@nepMeds/pages/Patient/Reschedule")
);
const DoctorRescheduled = lazy(
  () => import("@nepMeds/pages/Doctor/Rescheduled")
);
const RescheduledListAdmin = lazy(
  () => import("@nepMeds/pages/Admin/Rescheduled")
);
const VideoIndex = lazy(() => import("@nepMeds/pages/VideoCall/VideoIndex"));
const Patients = lazy(() => import("@nepMeds/pages/Admin/Patients"));
const UserRole = lazy(() => import("@nepMeds/pages/Admin/UserRole"));
const AdminAppointment = lazy(
  () => import("@nepMeds/pages/Admin/Appointments")
);
const Layout = lazy(() => import("@nepMeds/components/Layout"));
const DoctorsList = lazy(() => import("@nepMeds/components/Table/Doctor"));
const PaymentList = lazy(
  () => import("@nepMeds/components/Table/Payment/PaymentList")
);
const PaymentStatus = lazy(
  () => import("@nepMeds/components/Payment/PaymentStatus")
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
const Faq = lazy(() => import("@nepMeds/pages/Faq"));
const FollowUp = lazy(() => import("@nepMeds/pages/Doctor/FollowUp"));
const Discount = lazy(() => import("@nepMeds/pages/Admin/Discount"));
const PatientFAQ = lazy(() => import("@nepMeds/pages/Patient/FAQ"));
const PatientProfile = lazy(() => import("@nepMeds/pages/Patient/Profile"));
const AdminFollowUp = lazy(() => import("@nepMeds/pages/Admin/FollowUp"));

const registerRoute = [
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
    path: NAVIGATION_ROUTES.SIGNUP,
    element: <SignUp />,
  },
];

export const openRoutes = [
  ...registerRoute,
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <DoctorConsultation />,
  },
  {
    path: NAVIGATION_ROUTES.DOCTOR_LOGIN,
    element: <Login />,
  },

  {
    path: NAVIGATION_ROUTES.FORGOTPASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: NAVIGATION_ROUTES.CONFIRMPASSWORD,
    element: <ConfirmPassword />,
  },

  {
    path: NAVIGATION_ROUTES.PATIENT.DOCTOR_CONSULTATION,
    element: <DoctorConsultation />,
  },
  {
    path: NAVIGATION_ROUTES.PATIENT.DOCTOR_LIST_PATIENT_MODULE,
    element: <DoctorList />,
  },
  {
    path: `${NAVIGATION_ROUTES.PATIENT.DOCTOR_DETAILS}/:id`,
    element: <DoctorDetails />,
  },

  {
    path: NAVIGATION_ROUTES.PATIENT.FAQ,
    element: <PatientFAQ />,
  },
  {
    path: NAVIGATION_ROUTES.NO_MATCH,
    element: (
      <Navigate to={NAVIGATION_ROUTES.PATIENT.DOCTOR_CONSULTATION} replace />
    ),
  },
];

export const doctorRoutes = [
  {
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
        path: NAVIGATION_ROUTES.RESCHEDULE,
        element: <DoctorRescheduled />,
      },

      {
        path: NAVIGATION_ROUTES.FOLLOWUP,
        element: <FollowUp />,
      },
      {
        path: NAVIGATION_ROUTES.PATIENT_HISTORY,
        element: <PatientHistory />,
      },
      {
        path: NAVIGATION_ROUTES.PATIENT_HISTORY_ID,
        element: <PatientHistoryDetails />,
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
        path: NAVIGATION_ROUTES.PATIENT.DOCTOR_CONSULTATION,
        element: <DoctorConsultation />,
      },
      {
        path: NAVIGATION_ROUTES.PATIENT.DOCTOR_LIST_PATIENT_MODULE,
        element: <DoctorList />,
      },
    ],
  },
  {
    path: NAVIGATION_ROUTES.VIDEOCALL,
    element: <VideoIndex />,
  },
  {
    path: NAVIGATION_ROUTES.NO_MATCH,
    element: <Navigate to={NAVIGATION_ROUTES.DASHBOARD} replace />,
  },
];
export const paientRoutes = [
  ...registerRoute,
  {
    path: NAVIGATION_ROUTES.PATIENT.DOCTOR_CONSULTATION,
    element: <DoctorConsultation />,
  },
  {
    path: NAVIGATION_ROUTES.PATIENT.DOCTOR_LIST_PATIENT_MODULE,
    element: <DoctorList />,
  },
  {
    path: `${NAVIGATION_ROUTES.PATIENT.DOCTOR_DETAILS}/:id`,
    element: <DoctorDetails />,
  },
  {
    path: `${NAVIGATION_ROUTES.VISA_PAYMENT}`,
    element: <VisaPayment />,
  },
  {
    path: NAVIGATION_ROUTES.PATIENT.RESCHEDULE_APPOINTMENT,
    element: <RescheduleAppointment />,
  },

  {
    path: NAVIGATION_ROUTES.PATIENT_PROFILE,
    element: <PatientProfile />,
  },
  {
    path: NAVIGATION_ROUTES.VIDEOCALL,
    element: <VideoIndex />,
  },
  {
    path: NAVIGATION_ROUTES.PAYMENT_SUCCESS,
    element: <PaymentStatus isSuccess={true} />,
  },
  {
    path: NAVIGATION_ROUTES.PAYMENT_FAILURE,
    element: <PaymentStatus isSuccess={false} />,
  },
  {
    path: NAVIGATION_ROUTES.PATIENT.FAQ,
    element: <PatientFAQ />,
  },
  {
    path: NAVIGATION_ROUTES.NO_MATCH,
    element: (
      <Navigate to={NAVIGATION_ROUTES.PATIENT.DOCTOR_CONSULTATION} replace />
    ),
  },
];
export const adminRoutes = [
  {
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
        element: <Patients />,
      },
      {
        path: NAVIGATION_ROUTES.RESCHEDULE,
        element: <RescheduledListAdmin />,
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
        path: NAVIGATION_ROUTES.FOLLOWUP,
        element: <AdminFollowUp />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_PAYMENT,
        element: <AllPaymentAdmin />,
      },
      {
        path: NAVIGATION_ROUTES.AMOUNT_HISTORY,
        element: <RateHistory />,
      },
      {
        path: NAVIGATION_ROUTES.FAQ,
        element: <Faq />,
      },
      {
        path: NAVIGATION_ROUTES.DISCOUNT,
        element: <Discount />,
      },
    ],
  },
  {
    path: NAVIGATION_ROUTES.NO_MATCH,
    element: <Navigate to={NAVIGATION_ROUTES.DASHBOARD} replace />,
  },
];
