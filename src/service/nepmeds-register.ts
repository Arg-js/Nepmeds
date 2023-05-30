import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { toFormData } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

type PrimaryInfo = Pick<
  IRegisterFields,
  | "title"
  | "first_name"
  | "middle_name"
  | "last_name"
  | "password"
  | "confirm_password"
  | "image"
  | "bio_detail"
  | "mobile_number"
  | "email"
  | "gender"
  | "date_of_birth"
  | "age"
  | "medical_degree"
  | "designation"
  | "province"
  | "id_type"
  | "district"
  | "municipality_vdc"
  | "citizenship_issued_date"
  | "citizenship_number"
  | "citizenship_issued_district"
  | "ward"
  | "tole"
  | "pan_number"
> & {
  specialization: string[];
};

const signUpUser = async (data: { mobile_number: string }) => {
  const response = (await HttpClient.post)<NepMedsResponse<string>>(
    api.signup,
    toFormData(data)
  );
  return response;
};

export const useSignUpUser = () => useMutation(signUpUser);

const verifySingUpOTP = async (data: { otp: string }) => {
  const response = await HttpClient.post(api.otp_verify, toFormData(data));
  return response;
};

export const useVerifySingUpOTP = () => useMutation(verifySingUpOTP);

const createPrimaryData = async (data: PrimaryInfo) => {
  const formData = new FormData();
  data.specialization.forEach(s => {
    formData.append("specialization", s);
  });
  const response = await HttpClient.post(
    api.register,
    toFormData(data, formData)
  );
  return response;
};

export const usePrimaryInfoRegister = () => useMutation(createPrimaryData);

const editPersonalData = async (
  data: Pick<PrimaryInfo, "title" | "bio_detail" | "image"> & {
    user: Pick<PrimaryInfo, "first_name" | "middle_name" | "last_name">;
  }
) => {
  const response = await HttpClient.patch(
    api.doctor_profile,
    // toFormData(data, formData)
    data
  );
  return response;
};
export const useUpdatePersonalInfoRegister = () => {
  const queryClient = useQueryClient();
  return useMutation(editPersonalData, {
    onSuccess() {
      queryClient.invalidateQueries(api.doctor_profile);
    },
  });
};

const editPrimaryData = async (
  data: Pick<
    PrimaryInfo,
    | "mobile_number"
    | "email"
    | "gender"
    | "date_of_birth"
    | "specialization"
    | "pan_number"
    | "id_type"
    | "citizenship_number"
    | "citizenship_issued_district"
    | "citizenship_issued_date"
    | "province"
    | "district"
    | "municipality_vdc"
    | "tole"
    | "ward"
  >
) => {
  const formData = new FormData();
  const response = await HttpClient.patch(
    api.doctor_profile,
    toFormData(data, formData)
  );
  return response;
};
export const useUpdatePrimaryInfoRegister = () => {
  const queryClient = useQueryClient();
  return useMutation(editPrimaryData, {
    onSuccess() {
      queryClient.invalidateQueries(api.doctor_profile);
    },
  });
};
