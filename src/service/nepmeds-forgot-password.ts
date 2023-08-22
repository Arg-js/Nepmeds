import { useMutation } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

const generateForgetPasswordLink = async ({
  email_or_mobile_number,
}: {
  email_or_mobile_number: string;
}) => {
  const response = await HttpClient.post<NepMedsResponse<string>>(
    api.forgotPassword,
    { email_or_mobile_number }
  );
  return response;
};

export const useGenerateForgetPasswordOTP = () =>
  useMutation(generateForgetPasswordLink);

// Verify OTP for forget password
const verifyForgetPasswordOTP = async ({
  email_or_mobile_number,
  otp,
}: {
  email_or_mobile_number: string;
  otp: string;
}) => {
  await HttpClient.post<NepMedsResponse<string>>(
    api.verify_otp_forgotPassword,
    { email_or_mobile_number, otp }
  );
};

export const useVerifyForgetPasswordOTP = () =>
  useMutation(verifyForgetPasswordOTP);

const resetPassword = async (data: {
  email_or_mobile_number: string;
  otp: string;
  new_password: string;
  confirm_new_password: string;
}) => {
  const response = await HttpClient.post<NepMedsResponse<string>>(
    api.resetPassword,
    data
  );
  return response;
};

export const useResetPasswordMutation = () => useMutation(resetPassword);
