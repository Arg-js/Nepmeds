import { useMutation } from "react-query";
import { api } from "./service-api";
import { HttpClient, toFormData } from "./service-axios";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";

type CertificateInfo = IRegisterFields["certification"][number];

const createCertificateData = async (data: CertificateInfo) => {
  const response = await HttpClient.post(api.certificate, toFormData(data));
  return response;
};

export const useCertificateInfoRegister = () =>
  useMutation(createCertificateData);
