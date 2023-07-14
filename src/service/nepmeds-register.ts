import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { AxiosResponse, toFormData } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

export type PrimaryInfo = Pick<
  IRegisterFields,
  | "title"
  | "bio_detail"
  | "age"
  | "medical_degree"
  | "designation"
  | "id_type"
  | "id_issued_date"
  | "id_number"
  | "id_issued_district"
  | "pan_number"
> & {
  specialization?: number[];
  id_front_image?: File | string;
  id_back_image?: File | string;
  user: {
    first_name?: string;
    middle_name?: string;
    password?: string;
    confirm_password?: string;
    last_name?: string;
    mobile_number?: string;
    profile_picture?: File | string;
    district?: number;
    ward?: number | string;
    tole?: number | string;
    municipality?: number;
    province?: number;
    gender?: string;
    date_of_birth?: string;
    email?: string;
    is_mobile_number_verified?: boolean;
    is_email_verified?: boolean;
  };
};

const signUpUser = async (data: { email_or_mobile_number: string }) => {
  const response = (await HttpClient.post)<NepMedsResponse<string>>(
    api.signup,
    toFormData(data)
  );
  return response;
};

export const useSignUpUser = () => useMutation(signUpUser);

const verifySingUpOTP = async (data: {
  otp: string;
  email_or_mobile_number: string;
}) => {
  const response = await HttpClient.post(api.otp_verify, toFormData(data));
  return response;
};

export const useVerifySingUpOTP = () => useMutation(verifySingUpOTP);

const createPrimaryData = async (data: PrimaryInfo) => {
  const response = await HttpClient.post(api.register, data);
  return response;
};

export const usePrimaryInfoRegister = () => useMutation(createPrimaryData);

const editPersonalData = async (data: PrimaryInfo) => {
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

const editPrimaryData = async (id: number, data: PrimaryInfo) => {
  const response = await HttpClient.patch(
    api.edit_doctor_profile + `${id}/`,
    data
  );
  return response;
};

export const useUpdatePrimaryInfoRegister = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<any, any>,
    unknown,
    { id: number; data: PrimaryInfo }
  >(variables => editPrimaryData(variables.id, variables.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(api.edit_doctor_profile);
    },
  });

  return mutation;
};
