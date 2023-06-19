import { useMutation, useQueryClient } from "react-query";
import { api } from "./service-api";
import { HttpClient, toFormData } from "./service-axios";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { AxiosResponse } from "axios";

export type CertificateInfo = IRegisterFields["certification"][number];

const createCertificateData = async (data: CertificateInfo) => {
  const response = await HttpClient.post(api.certificate, toFormData(data));
  return response;
};

export const useCertificateInfoRegister = () =>
  useMutation(createCertificateData);

const updateCertificateData = async (id: number, data: CertificateInfo[]) => {
  const response = await HttpClient.patch(api.certificate + `${id}/`, data);
  return response;
};

export const useUpdateCertificateInfo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<any, any>,
    unknown,
    { id: number; data: CertificateInfo[] }
  >(variables => updateCertificateData(variables.id, variables.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(api.certificate);
    },
  });

  return mutation;
};
