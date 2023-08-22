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
  academic: "/doctor-consult/academic-info/",
  certificate: "/doctor-consult/certificate-info/",
  experience: "/doctor-consult/experience-info/",
  academic_file: "doctor-consult/academic-files-upload/",
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
  doctordetails: "/dashboard/view-doctor-profile/{id}/",
  // certificate fetch garda ko id
  certificate_update: "/user-management/certificate/{id}",
  experience_update: "/user-management/experience/{id}",

  province: "core/provinces/",
  district: "core/districts/",
  municipality: "/core/municipalities/",
  college_list: "/core/college/",
  detail_address: "/core/detail-address/",

  doctor_availability: "/doctor-consult/doctor-availability/",
  doctorProfileById: "/dashboard/view-doctor-profile/{id}",
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

  //amount
  add_amount_create: "/doctor-consult/doctor-amount-set/",
  edit_amount: "/doctor-consult/doctor-amount-set/:id/",

  added_payment_methods:
    "/doctor-consult/doctorwise-paymentdetail-list/:doctor_id/",
  allpaymentList: "/dashboard/doctor-list-asper-payment-status/",

  patient: {
    doctorList: {
      get: "/patient/filter-doctor-list/",
      getById: "/patient/doctor-details-appointment/:id/",
    },
    appointment: {
      post: "/patient/appointment/",
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
