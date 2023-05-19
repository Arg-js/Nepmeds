import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { toFormData } from "axios";
import { useMutation } from "react-query";
import { api } from "./service-api";
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
  | "municipality_vdc"
  | "citizenship_issued_date"
  | "citizenship_number"
  | "ward"
  | "tole"
  | "pan_number"
> & {
  specialization: string[];
};

const signUpUser = async (data: { mobile_number: string }) => {
  const response = await HttpClient.post(api.signup, toFormData(data));
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
