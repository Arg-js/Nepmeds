import { useMutation } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

const generateForgetPasswordLink = async ({ email }: { email: string }) => {
  const response = await HttpClient.post<NepMedsResponse<string>>(
    api.forgotPassword,
    { email }
  );
  return response;
};

export const useGenerateForgetPasswordLink = () =>
  useMutation(generateForgetPasswordLink);

const resetPassword = async ({
  uidb64,
  token,
  new_password,
  confirm_new_password,
}: {
  uidb64: string;
  token: string;
  new_password: string;
  confirm_new_password: string;
}) => {
  const response = await HttpClient.post<NepMedsResponse<string>>(
    api.resetPassword.replace("{uidb64}", uidb64).replace("{token}", token),
    {
      new_password,
      confirm_new_password,
    }
  );
  return response;
};

export const useResetPasswordMutation = () => useMutation(resetPassword);
