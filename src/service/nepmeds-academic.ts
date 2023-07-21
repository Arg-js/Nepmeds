import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IDoctorAcademicInfo } from "./nepmeds-doctor-profile";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export type AcademicInfo = IRegisterFields["academic"][number];

const createAcademicData = async (data: AcademicInfo) => {
  const response = await HttpClient.post(api.academic, data);
  return response;
};

export const useAcademicInfoRegister = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse<any, any>, unknown, AcademicInfo>(
    createAcademicData,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(api.doctor_profile);
        queryClient.fetchQuery(api.doctor_profile);
      },
    }
  );

  return mutation;
};
const createAcademicFile = async (data: AcademicInfo) => {
  const formData = new FormData();

  formData.append("doctor_id", data.doctor.toString());
  if (data.academic_documents) {
    // Append multiple files to formData
    data.academic_documents.forEach((file, index) => {
      if (file !== null && file instanceof File)
        formData.append(`files[${index}]`, file);
    });
  }
  const response = await HttpClient.post(api.academic_file, formData);
  return response;
};

export const useAcademicFileRegister = () => useMutation(createAcademicFile);

const updateAcademicData = async (id: number, data: AcademicInfo) => {
  const response = await HttpClient.patch(api.academic + `${id}/`, data);
  return response;
};

export const useUpdateAcademicInfo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<any, any>,
    unknown,
    { id: number; data: AcademicInfo }
  >(variables => updateAcademicData(variables.id, variables.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(api.doctor_profile);
      queryClient.fetchQuery(api.doctor_profile);
    },
  });

  return mutation;
};

const deleteAcademicData = async (id: number) => {
  const response = await HttpClient.delete(api.academic + `${id}/`);
  return response;
};

export const useDeleteAcademicInfo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse<any, any>, unknown, number>(
    id => deleteAcademicData(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(api.doctor_profile);
        queryClient.fetchQuery(api.doctor_profile);
      },
    }
  );

  return mutation;
};

//Get Single Academic Info
export const getSingleAcademicInfo = async (id: number) => {
  const response = await HttpClient.get<NepMedsResponse<IDoctorAcademicInfo>>(
    api.academic + `${id}/`
  );
  return response.data.data;
};

//Delete Academic File
export const deleteAcademicFile = async (id: number) => {
  const response = await HttpClient.delete(api.academic_file_delete + `${id}/`);
  return response;
};
