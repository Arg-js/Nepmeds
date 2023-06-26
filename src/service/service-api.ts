export const api = {
  login: "user_management/login/",
  forgotPassword: "user_management/reset-password/",
  resetPassword: "user_management/confirm-password-reset/{uidb64}/{token}/",
  signup: "user_management/otp-send/",
  otp_verify: "user_management/otp-verify/",
  register: "/doctor_consult/register/",
  symptom: "/doctor_consult/symptom",
  academic: "/doctor_consult/academic-info/",
  certificate: "/doctor_consult/certificate-info/",
  experience: "/doctor_consult/experience-info/",
  academic_file: "doctor_consult/academic-files-upload/",
  certificate_file: "doctor_consult/certificate-files-upload/",
  experience_file: "doctor_consult/experience-files-upload/",
  doctor_profile: "/doctor_consult/doctor-profile/",
  edit_doctor_profile: "/doctor_consult/doctor-profile-update/",
  specialization: "/core/specialization-list/",
  registereddoctor: "/dashboard/registered_doctor_list",
  pendingdoctor: "/dashboard/pending_doctor_list",
  approveddoctor: "/dashboard/approved_doctor_list",
  approvesingledoctor: "/dashboard/approve_doctor/{id}/",
  rejectsingledoctor: "/dashboard/reject_doctor/{id}/",
  doctordetails: "/dashboard/view_doctor_profile/{id}/",
  // certificate fetch garda ko id
  certificate_update: "/user_management/certificate/{id}",
  experience_update: "/user_management/experience/{id}",

  province: "core/provinces/",
  district: "core/districts/",
  municipality: "/core/municipalities",
};

export interface NepMedsResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
