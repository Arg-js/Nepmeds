export const NAVIGATION_ROUTES = {
  REGISTER: "/register",
  REGISTRATION: {
    BASIC_INFO: "/register/basic-info",
    PRIMARY_INFO: "/register/primary-info",
    ACADEMIC_INFO: "/register/academic-info",
    CERTIFICATION_INFO: "/register/certification-info",
    EXPERIENCE_INFO: "/register/experience-info",
  },
  LOGIN: "/",
  SIGNUP: "/signup",
  FORGOTPASSWORD: "/forgot-password",
  CONFIRMPASSWORD: "/reset-password/:uidb64/:token",
  OTPVERIFY: "/otp-verify",

  LOGGEDIN: "/",
  DASHBOARD: "dashboard",
  MASTER_DATA: "master-data",
  PATIENTS: "/patients",
  USER_ROLE: "user-role",
  CONSULT_REQUEST: "/consult-request",

  DOCTOR_LIST: "/doctor-list",
  DOCTOR_PROFILE: "/doctor-profile",
  APPOINTMENTS: "appointments",
  FOLLOWUP: "followup",
  PATIENT_HISTORY: "patient-history",
  CALENDER: "calendar",
  BANK_DETAILS: "bank-details",
  PAYMENT: "payment",

  DOC_PROFILE: "/doc-profile/:id",
  //Add Navigation
  DOCTOR_LIST_REGISTRATION: "/doctor-list/registration",
  DOCTOR_LIST_PAYMENT: "/doctor-list/payment",

  // PATIENT MODULE
  DOCTOR_CONSULTATION: "/patient/doctor-consultation",
  DOCTOR_LIST_PATIENT_MODULE: "/patient/doctor-list",
  NO_MATCH: "*",

  PAYMENTS: "/payment",
};
