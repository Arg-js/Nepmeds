import { useMutation } from "react-query";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastFail, toastSuccess } from "./service-toast";

const authenticatePatient = async ({
  patientToken,
}: {
  patientToken: string;
}) => {
  const response = await HttpClient.post(api.patient.login.post, {
    refresh: patientToken,
  });
  return response;
};
const useAuthenticatePatient = () => {
  return useMutation(authenticatePatient, {
    onSuccess: () => toastSuccess("Login Successful!"),
    onError: () => toastFail("Something Went wrong!"),
  });
};

const logout = async ({ refresh }: { refresh?: string }) => {
  return await HttpClient.post(api.logout, { refresh });
};

export { useAuthenticatePatient, logout };
