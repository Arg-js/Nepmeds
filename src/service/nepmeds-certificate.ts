import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { HttpClient } from "@nepMeds/service/service-axios";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IDoctorCertificationInfo } from "./nepmeds-doctor-profile";
import { NepMedsResponse, api } from "./service-api";
import { objectToFormData } from "@nepMeds/utils/toFormData";

export type CertificateInfo = IRegisterFields["nmc"];

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

  if (data) {
    // Append multiple files to formData
    if (data.nmc_file !== null && data.nmc_file instanceof File)
      formData.append(`files[0]`, data.nmc_file);
  }
  const response = await HttpClient.post(api.certificate_file, formData);
  return response;
};

export const useCertificateFileRegister = () =>
  useMutation(createCertificateFile);

const updateCertificateData = async (
  data: CertificateInfo & { id?: number; is_superuser?: boolean }
) => {
  const formatedData = objectToFormData(data);

  if (data.is_superuser) {
    const response = await HttpClient.patch(
      `${api.nmc_update}?doctor_id=${data.id}`,
      formatedData
    );
    return response;
  } else {
    const response = await HttpClient.patch(api.nmc_update, formatedData);
    return response;
  }
};

export const useUpdateCertificateInfo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateCertificateData, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.doctor_profile]);
      queryClient.invalidateQueries([api.doctordetails]);
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
  >(api.nmc_update + `${id}/`);
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
