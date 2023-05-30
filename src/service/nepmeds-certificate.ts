import { useMutation, useQueryClient } from "react-query";
import { api } from "./service-api";
import { HttpClient, toFormData } from "./service-axios";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";

export type CertificateInfo = IRegisterFields["certification"][number];

const createCertificateData = async (data: CertificateInfo) => {
  const response = await HttpClient.post(api.certificate, toFormData(data));
  return response;
};

export const useCertificateInfoRegister = () =>
  useMutation(createCertificateData);

const updateCertificateData = async (data: {
  id: any;
  data: CertificateInfo;
}) => {
  const response = await HttpClient.patch(
    api.certificate_update.replace("{id}", data?.id),
    toFormData(data.data)
  );
  return response;
};

export const useUpdateCertificateInfo = () => {
  const queryClient = useQueryClient();

  return useMutation(updateCertificateData, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.doctor_profile);
    },
  });
};
