import { useMutation } from "react-query";
import { api } from "./service-api";
import { HttpClient, toFormData } from "./service-axios";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";

export type AcademicInfo = IRegisterFields["academic"][number];

const createAcademicData = async (data: AcademicInfo) => {
  const response = await HttpClient.post(api.academic, toFormData(data));
  return response;
};

export const useAcademicInfoRegister = () => useMutation(createAcademicData);
