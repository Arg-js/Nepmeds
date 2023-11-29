export const api = {
  verify_otp_forgotPassword: "user-management/verify-password-reset-otp/",
  login: "user-management/login/",
  forgotPassword: "user-management/request-reset-password/",
  resetPassword: "user-management/reset-password/",
  basicProfile: "/doctor-consult/doctor-basic-info/",
  //validate basic info API
  validateBasicInfo: "/doctor-consult/validate-basic-info/",
  validatePrimaryInfo: "/doctor-consult/validate-primary-info/",

  signup: "user-management/otp-send/",
  otp_verify: "user-management/otp-verify/",
  register: "/doctor-consult/register/",
  academic_file_delete: "doctor-consult/academic-info-document/",
  certificate_file_delete: "doctor-consult/certificate-info-document/",
  experience_file_delete: "doctor-consult/experience-info-document/",
  symptom: "core/symptom/",
  symptom_list: "/core/symptom-list/",
  academic: "/doctor-consult/register-bulk-academic-info/",
  academicProfile: "/doctor-consult/profile-bulk-academic-info/",
  deleteAcademic: "/doctor-consult/academic-info/",
  certificate: "/doctor-consult/certificate-info/",
  experience: "/doctor-consult/register-bulk-experience-info/",
  experienceProfile: "/doctor-consult/profile-bulk-experience-info/",
  nmc_update: "/doctor-consult/nmc-info/",
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
  college_list: {
    get: "/core/college/",
    post: "/core/college/",
  },
  detail_address: "/core/detail-address/",

  hospital_lists: {
    get: "/doctor-consult/list-hospital/",
  },

  hospital_list: {
    get: "/core/hospital/",
    post: "/core/hospital/",
    getById: "/core/hospital/:id/",
    patch: "/core/hospital/:id/",
    delete: "/core/hospital/:id/",
  },

  doctor_availability: "/doctor-consult/doctor-availability/",
  set_doctor_availability: "/doctor-consult/set-online-offline/",

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

  adminAppointment: {
    appointment: "/dashboard/appointment-history/",
  },
  appointmentDetail: "/dashboard/appointment-detail/:id",
  doctorUserRole: "/dashboard/doctor-management/",
  patientUserRole: "/dashboard/patient-management/",
  adminUserRole: "/dashboard/admin-list/",
  adminRegister: "/dashboard/admin-register/",
  userRole: {
    doctorStatus: "/dashboard/doctor-management/:id/",
    patientStatus: "/dashboard/patient-status-update/:id/",
    adminStatus: "/dashboard/admin/:id/",
    changeAdminPassword: "/dashboard/admin-change-password/:id/",
  },
  doctor: {
    appointments: {
      get: "/doctor-consult/new-appointment-request/",
      patch: "/doctor-consult/new-appointment-request/:id/",
      getById: "/doctor-consult/new-appointment-request/:id/",
    },
  },
  refresh_token: {
    post: "/user-management/refresh-token/",
  },
  admin: {
    patient: {
      get: "/dashboard/patient-all-data/",
    },
  },
  patient: {
    login: {
      post: "/user-management/refresh-token/",
    },
    detail: {
      get: "/patient/patient-call-lists-in-dashboard/",
      getById: "/patient/patient-call-detail-in-dashboard/",
    },
    basicProfile: "/patient/patient-basic-info/",

    doctorList: {
      get: "/patient/filter-doctor-list/",
      getById: "/patient/doctor-details-appointment/:id/",
      un_paginated: {
        get: "/patient/unpaginated-doctor-list/",
      },
    },
    appointment: {
      post: "/patient/new-appointment/",
    },
    doctor_availability: {
      get: "/patient/doctor-booking-availabilities/:id/",
    },
  },

  transaction: {
    khalti: "/transaction/khalti-initiate/",
    esewa: "/transaction/esewa-initiate/",
    payment_history: "/transaction/get-payment-history/",
  },

  faq: {
    get: "/dashboard/faq-list/",
    post: "/dashboard/faq/",
    getById: "/dashboard/faq/:id/",
    patch: "/dashboard/faq/:id/",
    delete: "/dashboard/faq/:id/",
  },
  faqUnpaginated: {
    get: "/dashboard/faq/",
  },
  discount: {
    get: "/dashboard/coupon/",
    post: "/dashboard/coupon/",
    getById: "/dashboard/coupon/:id/",
    getByCoupon: "/patient/code-detail/",
    patch: "/dashboard/coupon/:id/",
    delete: "/dashboard/coupon/:id/",
  },

  college: {
    post: "/core/college/",
    patch: "/core/college/:id/",
    get: "/core/college-list/",
    delete: "/core/college/:id/",
    getById: "/core/college/:id/",
  },

  followup: {
    get: "/doctor-consult/follow-up/",
    patch: "/doctor-consult/follow-up-update/:id/",
  },

  videoCall: {
    base: "/video-chat",
    initiate: function () {
      return this.base + "/video-call-initiate/";
    },
    receive: function () {
      return this.base + "/video-call-receive/";
    },
    end: function () {
      return this.base + "/video-call-end/";
    },
    reject: function () {
      return this.base + "/video-call-reject/";
    },
    getRoomInfo: function () {
      return this.base + `/get-room-details/:id/`;
    },
  },
  prescription: {
    addPatientInfo: "/doctor-consult/patient-history-info/",
    updatePatientInfo: "/doctor-consult/update-patient-history-info/:id/",
    addAdditionalInfo: "/doctor-consult/patient-additional-info/",
    updateAdditionalInfo: "/doctor-consult/update-patient-additional-info/:id/",
    addDrugReferralInfo: "/doctor-consult/bulk-create-drug-referral/",
    deleteDrugReferralInfo: "/doctor-consult/drug-referral/:id/",
    uploadImages: "/doctor-consult/upload-patient-prescription-image/",
    deleteImages: "/doctor-consult/delete-prescription-image/:id/",

    getAllInfo: "/doctor-consult/get-patient-history-info/:id/",
  },
  booked_availability: "/doctor-consult/booked-availability/",
  notification: {
    base: "/notification",
    sendCallNotification: function () {
      return this.base + "/send-call-notification/";
    },
    getAll: function () {
      return this.base + "/get-all-notification/";
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
