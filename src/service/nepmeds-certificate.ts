import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IDoctorCertificationInfo } from "./nepmeds-doctor-profile";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export type CertificateInfo = IRegisterFields["certification"][number];

const createCertificateData = async (data: CertificateInfo) => {
  const response = await HttpClient.post(api.certificate, data);
  return response;
};

export const useCertificateInfoRegister = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<any, any>,
    unknown,
    CertificateInfo
  >(createCertificateData, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.doctor_profile);
      queryClient.fetchQuery(api.doctor_profile);
    },
  });

  return mutation;
};

const createCertificateFile = async (data: CertificateInfo) => {
  const formData = new FormData();
  formData.append("doctor_id", data.doctor.toString());

  if (data.certificate_documents) {
    // Append multiple files to formData
    data.certificate_documents.forEach((file, index) => {
      if (file !== null && file instanceof File)
        formData.append(`files[${index}]`, file);
    });
  }
  const response = await HttpClient.post(api.certificate_file, formData);
  return response;
};

export const useCertificateFileRegister = () =>
  useMutation(createCertificateFile);

const updateCertificateData = async (id: number, data: CertificateInfo) => {
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
      queryClient.invalidateQueries(api.doctor_profile);
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
        queryClient.invalidateQueries(api.doctor_profile);
        queryClient.fetchQuery(api.doctor_profile);
      },
    }
  );

  return mutation;
};

//Get Single Certificate Info
export const getSingleCertificateInfo = async (id: number) => {
  const response = await HttpClient.get<
    NepMedsResponse<IDoctorCertificationInfo>
  >(api.certificate + `${id}/`);
  return response.data.data;
};

//Delete Certificate File
const deleteCertificateFile = async (id: number) => {
  const response = await HttpClient.delete(
    api.certificate_file_delete + `${id}/`
  );
  return response;
};

export const useDeleteCertificateFile = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["delete" + api.certificate_file_delete],
    deleteCertificateFile,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(api.doctor_profile);
      },
    }
  );
};
