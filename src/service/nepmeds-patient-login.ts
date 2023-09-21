import { useMutation } from "react-query";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastSuccess } from "./service-toast";

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
  });
};

export { useAuthenticatePatient };
