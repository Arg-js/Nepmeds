import { useMutation } from "react-query";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";

type PrimaryInfo = Pick<
  IRegisterFields,
  | "title"
  | "first_name"
  | "middle_name"
  | "last_name"
  | "password"
  | "confirm_password"
  | "mobile_number"
  | "email"
>;

const createPrimaryData = async (data: PrimaryInfo) => {
  const response = await HttpClient.post(api.register, data);
  return response;
};

export const usePrimaryInfoRegister = () => useMutation(createPrimaryData);
