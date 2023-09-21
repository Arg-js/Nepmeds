export const api = {
  verify_otp_forgotPassword: "user-management/verify-password-reset-otp/",
  login: "user-management/login/",
  forgotPassword: "user-management/request-reset-password/",
  resetPassword: "user-management/reset-password/",
  basicProfile: "/doctor-consult/doctor-basic-info/",
  signup: "user-management/otp-send/",
  otp_verify: "user-management/otp-verify/",
  register: "/doctor-consult/register/",
  academic_file_delete: "doctor-consult/academic-info-document/",
  certificate_file_delete: "doctor-consult/certificate-info-document/",
  experience_file_delete: "doctor-consult/experience-info-document/",
  symptom: "core/symptom/",
  symptom_list: "/core/symptom-list/",
  academic: "/doctor-consult/register-bulk-academic-info/",
  certificate: "/doctor-consult/certificate-info/",
  experience: "/doctor-consult/register-bulk-experience-info/",
  nmc_update:"/doctor-consult/nmc-info/",
  academic_file: "/doctor-consult/academic-files-upload/",
  certificate_file: "doctor-consult/certificate-files-upload/",
  experience_file: "doctor-consult/experience-files-upload/",
  doctor_profile: "/doctor-consult/doctor-profile/",
  edit_doctor_profile: "/doctor-consult/doctor-profile-update/",
  specialization_fetch: "/core/specialization-list-auth",
  specialization: "/core/specialization/",
  specialization_register: "/core/specialization-list/",
  registereddoctor: "/dashboard/doctor-list",
  pendingdoctor: "/dashboard/pending-doctor-list",
  approveddoctor: "/dashboard/approved-doctor-list",
  approvesingledoctor: "/dashboard/approve-doctor/{id}/",
  rejectsingledoctor: "/dashboard/reject-doctor/{id}/",
  doctordetails: "/dashboard/view-doctor-profile/{id}",
  // certificate fetch garda ko id
  certificate_update: "/user-management/certificate/{id}",
  experience_update: "/user-management/experience/{id}",

  province: "core/provinces/",
  district: "core/districts/",
  municipality: "/core/municipalities/",
  college_list: "/core/college/",
  detail_address: "/core/detail-address/",

  doctor_availability: "/doctor-consult/doctor-availability/",
  rejectedDoctorList: "/dashboard/rejected-doctor-list",
  rejectionTitle: "/core/rejected-title/",
  specialistRate: {
    fetchAll: "/core/specialist-rate",
    fetchById: "/core/specialist-rate/{id}",
    post: "/core/specialist-rate",
    patch: "/core/specialist-rate/{id}",
    delete: "/core/specialist-rate/{id}",
  },
  doctorList: "/doctor-consult/doctor-list/",

  //payment
  payment_methods_create: "/doctor-consult/doctor-payment/",
  payment_methods: "/core/payment-mode/",
  edit_payment_methods: "/doctor-consult/amount-payment/:id/",
  delete_payment_methods: "/doctor-consult/doctor-payment/:id/",
  approve_payment_methods: "/dashboard/approve-doctor-payment/:id/",
  reject_payment_methods: "/dashboard/reject-doctor-payment/:id/",
  doctor_detail_history: "/dashboard/doctor-detail-rate-history/:id/",

  //amount
  add_amount_create: "/doctor-consult/doctor-amount-set/",
  edit_amount: "/doctor-consult/doctor-amount-set/:id/",

  added_payment_methods:
    "/doctor-consult/doctorwise-paymentdetail-list/:doctor_id/",
  allpaymentList: "/dashboard/doctor-list-asper-payment-status/",
  getAmountHistory: "/dashboard/doctor-rate-history/:id/",

  doctor: {
    appointments: {
      get: "/doctor-consult/new-appointment-request/",
      patch: "/doctor-consult/new-appointment-request/:id/",
      getById: "/doctor-consult/new-appointment-request/:id/",
    },
  },

  patient: {
    login: {
      post: "/user-management/refresh-token/",
    },
    doctorList: {
      get: "/patient/filter-doctor-list/",
      getById: "/patient/doctor-details-appointment/:id/",
    },
    appointment: {
      post: "/patient/new-appointment/",
    },
    doctor_availability: {
      get: "/patient/doctor-booking-availabilities/:id/",
    },
  },
};

export interface NepMedsResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}

export interface PaginatedResponse<T = any> {
  data: {
    count: number;
    page_count?: number;
    next?: number;
    previous?: number;
    results: T[];
  };
}
