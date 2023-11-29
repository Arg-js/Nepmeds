import { useMutation, useQueryClient, useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "@nepMeds/service/service-axios";
import { toastFail, toastSuccess } from "./service-toast";
import serverErrorResponse from "./serverErrorResponse";
import { generatePath } from "react-router-dom";
import { objectToFormData } from "@nepMeds/utils/toFormData";

// Prescription Patient Info
export interface IPrescriptionPatientInfo {
  history: string;
  examination: string;
  investigation: string;
  diagnosis: string;
  advice: string;
  doctor_consult?: string;
  id?: string;
}

const addPatientInfoPrescription = async (data: IPrescriptionPatientInfo) => {
  const response = await HttpClient.post<
    NepMedsResponse<IPrescriptionPatientInfo>
  >(api.prescription.addPatientInfo, data);
  return response.data;
};

export function useAddPatientInfo() {
  const queryClient = useQueryClient();

  return useMutation(addPatientInfoPrescription, {
    onSuccess: () => {
      queryClient.invalidateQueries("prescriptionPatientInfo");
      toastSuccess("Prescription added successfully");
    },
    onError: e => {
      const err = serverErrorResponse(e);
      toastFail(err);
    },
  });
}

// Edit Prescription Patient Info
const editPatientInfoPrescription = async (data: IPrescriptionPatientInfo) => {
  const response = await HttpClient.patch<
    NepMedsResponse<IPrescriptionPatientInfo>
  >(generatePath(api.prescription.updatePatientInfo, { id: data.id }), data);
  return response.data;
};

export function useEditPatientInfo() {
  const queryClient = useQueryClient();

  return useMutation(editPatientInfoPrescription, {
    onSuccess: () => {
      queryClient.invalidateQueries("prescriptionPatientInfo");
      toastSuccess("Prescription edited successfully");
    },
    onError: e => {
      const err = serverErrorResponse(e);
      toastFail(err);
    },
  });
}

// Prescription Additional Information
export interface IPrescriptionAdditionalInfo {
  recommendation: string;
  follow_up_date: string;
  remarks: string;
  doctor_consult?: string;
  id?: string;
}

const addAdditionalInfoPrescription = async (
  data: IPrescriptionAdditionalInfo
) => {
  const response = await HttpClient.post<
    NepMedsResponse<IPrescriptionAdditionalInfo>
  >(api.prescription.addAdditionalInfo, data);
  return response.data;
};

export function useAddAdditionalInfo() {
  const queryClient = useQueryClient();

  return useMutation(addAdditionalInfoPrescription, {
    onSuccess: () => {
      queryClient.invalidateQueries("prescriptionPatientInfo");
      toastSuccess("Additional Information added successfully");
    },
    onError: e => {
      const err = serverErrorResponse(e);
      toastFail(err);
    },
  });
}

// Edit Prescription Additional Information
const editAdditionalInfoPrescription = async (
  data: IPrescriptionAdditionalInfo
) => {
  const response = await HttpClient.patch<
    NepMedsResponse<IPrescriptionAdditionalInfo>
  >(generatePath(api.prescription.updateAdditionalInfo, { id: data.id }), data);
  return response.data;
};

export function useEditAdditionalInfo() {
  const queryClient = useQueryClient();

  return useMutation(editAdditionalInfoPrescription, {
    onSuccess: () => {
      queryClient.invalidateQueries("prescriptionPatientInfo");
      toastSuccess("Additional Information edited successfully");
    },
    onError: e => {
      const err = serverErrorResponse(e);
      toastFail(err);
    },
  });
}

// Prescription Drug Referral Information

export interface Root {
  patient_info: PatientInfo;
  drug_referral: IPrescriptionDrugReferralInfo[];
  additional_info: AdditionalInfo;
  prescription_image: PrescriptionImage[];
}

export interface PatientInfo {
  history: any;
  examination: any;
  investigation: any;
  diagnosis: any;
  advice: any;
}

export interface IPrescriptionDrugReferralInfo {
  id?: string;
  medicine: string;
  dose: string;
  frequency: string;
  remarks: string;
}

export interface AdditionalInfo {
  recommendation: any;
  follow_up_date: any;
  remarks: any;
  doctor_consult: any;
  follow_up: any;
}

export interface PrescriptionImage {
  id: number;
  image: string;
}

// Add / Edit Prescription Drug Referral Information
const addDrugReferralPrescription = async (data: {
  drug: IPrescriptionDrugReferralInfo[];
  doctor_consult: string;
}) => {
  const response = await HttpClient.patch<
    NepMedsResponse<IPrescriptionDrugReferralInfo[]>
  >(api.prescription.addDrugReferralInfo, {
    drugs: data.drug,
    doctor_consult: data.doctor_consult,
  });
  return response.data;
};

export function useDrugReferralInfo() {
  const queryClient = useQueryClient();

  return useMutation(addDrugReferralPrescription, {
    onSuccess: () => {
      queryClient.invalidateQueries("prescriptionPatientInfo");
      toastSuccess("Drug Referral Information added successfully");
    },
    onError: e => {
      const err = serverErrorResponse(e);
      toastFail(err);
    },
  });
}

// Delete Prescription Drug Referral Information
const deleteDrugReferralPrescription = async (id: string) => {
  const response = await HttpClient.delete(
    generatePath(api.prescription.deleteDrugReferralInfo, { id })
  );
  return response.data;
};

export function useDeleteDrugReferralInfo() {
  const queryClient = useQueryClient();

  return useMutation(deleteDrugReferralPrescription, {
    onSuccess: () => {
      queryClient.invalidateQueries("prescriptionPatientInfo");
      toastSuccess("Drug Referral Information deleted successfully");
    },
    onError: e => {
      const err = serverErrorResponse(e);
      toastFail(err);
    },
  });
}

export interface IPrescriptionInfo {
  patient_info: IPrescriptionPatientInfo;
  drug_referral: IPrescriptionDrugReferralInfo[];
  additional_info: IPrescriptionAdditionalInfo;
  prescription_image: {
    id: string;
    image: string;
  }[];
}

// Get All Prescription Info
const getAllPrescriptionInfo = async (id: string) => {
  const response = await HttpClient.get<NepMedsResponse<IPrescriptionInfo>>(
    generatePath(api.prescription.getAllInfo, { id })
  );
  return response.data;
};

export function useGetAllPrescriptionInfo(id: string) {
  return useQuery(
    ["prescriptionPatientInfo", id],
    () => getAllPrescriptionInfo(id),
    {
      select: data => data.data,
    }
  );
}

// Upload Prescription image
export interface IUploadPrescriptionImage {
  doctor_consult_id?: string;
  follow_up_id?: string;
  images: File[];
}

const uploadPrescriptionImage = async (data: IUploadPrescriptionImage) => {
  const formData = objectToFormData(data);

  const response = await HttpClient.post<
    NepMedsResponse<IUploadPrescriptionImage>
  >(api.prescription.uploadImages, formData);
  return response.data;
};

export function useUploadPrescriptionImage() {
  const queryClient = useQueryClient();

  return useMutation(uploadPrescriptionImage, {
    onSuccess: () => {
      queryClient.invalidateQueries("prescriptionPatientInfo");
      toastSuccess("Prescription Image added successfully");
    },
    onError: e => {
      const err = serverErrorResponse(e);
      toastFail(err);
    },
  });
}

// Delete Prescription Image
const deletePrescriptionImage = async (id: string) => {
  const response = await HttpClient.delete(
    generatePath(api.prescription.deleteImages, { id })
  );
  return response.data;
};

export function useDeletePrescriptionImage() {
  const queryClient = useQueryClient();

  return useMutation(deletePrescriptionImage, {
    onSuccess: () => {
      queryClient.invalidateQueries("prescriptionPatientInfo");
      toastSuccess("Prescription Image deleted successfully");
    },
    onError: e => {
      const err = serverErrorResponse(e);
      toastFail(err);
    },
  });
}
