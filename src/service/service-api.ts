export const api = {
  login: "login/token/",
  signup: "user_management/mobile/",
  otp_verify: "user_management/mobile/verify/",
  register: "register/",
  symptom: "/api/v1/doctor_consult/symptom/",
};

export interface NepMedsResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
