export const api = {
  login: "user_management/login/token/",
  signup: "user_management/mobile/",
  otp_verify: "user_management/mobile/verify/",
  register: "user_management/register/",
  symptom: "/doctor_consult/symptom",
  academic: "/user_management/academic",
  certificate: "/user_management/certificate",
  experience: "/user_management/experience",
  specialization: "/doctor_consult/specialization",
};

export interface NepMedsResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
