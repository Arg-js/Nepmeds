export const api = {
  login: "user_management/login/",
  forgotPassword: "user_management/reset-password/",
  resetPassword: "user_management/confirm-password-reset/{uidb64}/{token}/",
  signup: "user_management/otp-send/",
  otp_verify: "user_management/otp-verify/",
  register: "/doctor_consult/register/",
  symptom: "/doctor_consult/symptom",
  academic: "/user_management/academic",
  certificate: "/user_management/certificate",
  experience: "/user_management/experience",
  doctor_profile: "/user_management/doctor-profile/",
  specialization: "/core/specialization",
  registereddoctor: "/dashboard/registered_doctor_list",
  pendingdoctor: "/dashboard/pending_doctor_list",
  approveddoctor: "/dashboard/approved_doctor_list",
  approvesingledoctor: "/dashboard/approve_doctor/{id}/",
  rejectsingledoctor: "/dashboard/reject_doctor/{id}/",
  doctordetails: "/dashboard/view_doctor_profile/{id}/",
  // certificate fetch garda ko id
  certificate_update: "/user_management/certificate/{id}",
  experience_update: "/user_management/experience/{id}",
  academic_update: "/user_management/academic/{id}",

  province: "core/province",
  district: "core/district",
};

export interface NepMedsResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
