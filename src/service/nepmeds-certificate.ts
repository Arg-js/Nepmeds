import { useMutation, useQueryClient } from "react-query";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { AxiosResponse } from "axios";

export type CertificateInfo = IRegisterFields["certification"][number];

const createCertificateData = async (data: CertificateInfo) => {
  const response = await HttpClient.post(api.certificate, data);
  return response;
};

export const useCertificateInfoRegister = () =>
  useMutation(createCertificateData);

const createCertificateFile = async (data: CertificateInfo) => {
  const formData = new FormData();
  formData.append("doctor_id", data.doctor.toString());
  console.log(data);
  if (data.certificate_documents) {
    // Append multiple files to formData
    data.certificate_documents.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
  }
  const response = await HttpClient.post(api.certificate_file, formData);
  return response;
};

export const useCertificateFileRegister = () =>
  useMutation(createCertificateFile);

const updateCertificateData = async (id: number, data: CertificateInfo) => {
  console.log(id);
  const response = await HttpClient.patch(api.certificate + `${id}/`, data);
  return response;
};

export const useUpdateCertificateInfo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<any, any>,
    unknown,
    { id: number; data: CertificateInfo }
  >(variables => updateCertificateData(variables.id, variables.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(api.certificate);
      queryClient.fetchQuery(api.doctor_profile);
    },
  });

  return mutation;
};

const deleteCertificateData = async (id: number) => {
  const response = await HttpClient.delete(api.certificate + `${id}/`);
  return response;
};

export const useDeleteCertificateInfo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse<any, any>, unknown, number>(
    id => deleteCertificateData(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(api.certificate);
        queryClient.fetchQuery(api.doctor_profile);
      },
    }
  );

  return mutation;
};
