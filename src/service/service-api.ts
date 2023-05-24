export const api = {
  login: "user_management/login/token/",
  forgotPassword: "user_management/reset-password/",
  resetPassword: "user_management/confirm-password-reset/{uid}/{token}",
  signup: "user_management/mobile/",
  otp_verify: "user_management/mobile/verify/",
  register: "user_management/register/",
  symptom: "/doctor_consult/symptom",
  academic: "/user_management/academic",
  certificate: "/user_management/certificate",
  experience: "/user_management/experience",
  specialization: "/doctor_consult/specialization",
  registereddoctor: "/dashboard/registered_doctor_list",
  pendingdoctor: "/dashboard/pending_doctor_list",
  approveddoctor: "/dashboard/approved_doctor_list",

  province: "core/province",
  district: "core/districtlist",
};

export interface NepMedsResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
