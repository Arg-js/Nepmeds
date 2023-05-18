import { useMutation } from "react-query";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { toFormData } from "axios";

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
  | "pan_number"
> & {
  specialization: string[];
};

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
