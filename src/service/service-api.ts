export const api = {
  login: "login/token/",
  register: "register/",
  symptom: "/api/v1/doctor_consult/symptom/",
};

export interface NepMedsResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
