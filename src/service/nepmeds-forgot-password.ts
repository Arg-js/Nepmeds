import { useMutation } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

const generateForgetPasswordLink = async ({ email }: { email: string }) => {
  const response = (await HttpClient.post)<NepMedsResponse<string>>(
    api.forgotPassword,
    { email }
  );
  return response;
};

export const useGenerateForgetPasswordLink = () =>
  useMutation(generateForgetPasswordLink);

const resetPassword = async ({
  uid,
  token,
  new_password,
  confirm_new_password,
}: {
  uid: string;
  token: string;
  new_password: string;
  confirm_new_password: string;
}) => {
  const response = (await HttpClient.post)<NepMedsResponse<string>>(
    api.resetPassword,
    {
      uid,
      token,
      new_password,
      confirm_new_password,
    }
  );
  return response;
};

export const useResetPasswordMutation = () => useMutation(resetPassword);
