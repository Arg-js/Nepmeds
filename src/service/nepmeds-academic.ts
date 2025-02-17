import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { HttpClient } from "@nepMeds/service/service-axios";
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IDoctorAcademicInfo } from "./nepmeds-doctor-profile";
import { NepMedsResponse, api } from "./service-api";

export type AcademicInfo = IRegisterFields["academic"][number];

const createAcademicData = async (data: AcademicInfo) => {
  const response = await HttpClient.post(api.academic, { data });
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

// Post From Profile

const createAcademicDataProfile = async (data: AcademicInfo) => {
  const response = await HttpClient.post(api.academicProfile, { data: data });
  return response;
};

export const useAcademicInfoRegisterProfile = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse<any, any>, unknown, AcademicInfo>(
    createAcademicDataProfile,
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

  formData.append("doctor_id", data?.doctor?.toString());
  if (data.academic_documents) {
    // Append multiple files to formData
    data.academic_documents.forEach((file: File, index: number) => {
      if (file !== null && file instanceof File)
        formData.append(`files[${index}]`, file);
    });
  }
  const response = await HttpClient.post(api.academic_file, formData);
  return response;
};

export const useAcademicFileRegister = () => useMutation(createAcademicFile);

const updateAcademicData = async (data: AcademicInfo[]) => {
  const response = await HttpClient.patch(api.academic, { data: data });
  return response;
};

export const useUpdateAcademicInfo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateAcademicData, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.doctor_profile]);
      queryClient.invalidateQueries([api.doctordetails]);
    },
  });

  return mutation;
};

const deleteAcademicData = async (id: number) => {
  const response = await HttpClient.delete(api.deleteAcademic + `${id}/`);
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
export const getSingleAcademicInfo = async (id: number, isDoctor?: boolean) => {
  if (!isDoctor) {
    const response = await HttpClient.get<NepMedsResponse<IDoctorAcademicInfo>>(
      `${api.doctor_profile}/doctor_id=${id}/`
    );
    return response.data.data;
  }
  const response = await HttpClient.get<NepMedsResponse<IDoctorAcademicInfo>>(
    api.doctor_profile
  );
  return response.data.data;
};

//Delete Academic File
const deleteAcademicFile = async (id: number) => {
  const response = await HttpClient.delete(api.academic_file_delete + `${id}/`);
  return response;
};

export const useDeleteAcademicFile = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAcademicFile, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.doctor_profile);
    },
  });
};
