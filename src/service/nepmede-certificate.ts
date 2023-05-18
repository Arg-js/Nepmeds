// import { useMutation } from "react-query";
// import { api } from "./service-api";
// import { HttpClient } from "./service-axios";
// import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";

// type CertificateInfo = Pick<
//   NonNullable<IRegisterFields["academic"]>,
//   "degree_program" | "major" | "university" | "graduation_year" | "file"
// >;

// const createCertificateData = async (data: CertificateInfo) => {
//   const response = await HttpClient.post(api.certificate, data);
//   return response;
// };

// export const useCertificateInfoRegister = () =>
//   useMutation(createCertificateData);
