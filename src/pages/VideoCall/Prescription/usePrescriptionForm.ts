import {
  IPrescriptionAdditionalInfo,
  IPrescriptionDrugReferralInfo,
  IPrescriptionPatientInfo,
  useAddAdditionalInfo,
  useAddPatientInfo,
  useDrugReferralInfo,
  useEditAdditionalInfo,
  useEditPatientInfo,
} from "@nepMeds/service/nepmeds-prescription";
import { useForm } from "react-hook-form";
export function useAddPrescription() {
  //React Queires
  const patientInfo = useAddPatientInfo();
  const updatePatientInfo = useEditPatientInfo();
  const additionalInfo = useAddAdditionalInfo();
  const editAdditionalInfo = useEditAdditionalInfo();
  const drugReferralInfo = useDrugReferralInfo();

  //Forms
  const patientInfoForm = useForm<IPrescriptionPatientInfo>();
  const additionalInfoForm = useForm<IPrescriptionAdditionalInfo>();
  const drugReferralInfoForm = useForm({
    defaultValues: {
      drug: [
        {
          dose: "",
          frequency: "",
          medicine: "",
          remarks: "",
          id: "",
        },
      ] as IPrescriptionDrugReferralInfo[],
    },
  });

  const onSubmitPatientInfo = async ({
    doctor_consult,
    id,
  }: {
    doctor_consult: string;
    id?: string;
  }) => {
    if (id) {
      updatePatientInfo.mutate({
        ...patientInfoForm.getValues(),
        doctor_consult,
        id,
      });
    } else {
      const res = await patientInfo.mutateAsync({
        ...patientInfoForm.getValues(),
        doctor_consult,
      });
      patientInfoForm.setValue("id", res.data.id);
    }
  };

  const onSubmitAdditionalInfo = async ({
    doctor_consult,
    id,
  }: {
    doctor_consult: string;
    id?: string;
  }) => {
    if (id) {
      editAdditionalInfo.mutate({
        ...additionalInfoForm.getValues(),
        doctor_consult,
        id,
      });
    } else {
      const res = await additionalInfo.mutateAsync({
        ...additionalInfoForm.getValues(),
        doctor_consult,
      });
      patientInfoForm.setValue("id", res.data.id);
    }
  };

  const onSubmitDrugReferralInfo = async ({
    doctor_consult,
  }: {
    doctor_consult: string;
  }) => {
    const res = await drugReferralInfo.mutateAsync({
      drug: drugReferralInfoForm.getValues().drug,
      doctor_consult,
    });

    drugReferralInfoForm.setValue("drug", res.data);
  };

  return {
    //Patient Info
    patientInfoForm,
    onSubmitPatientInfo,
    patientInfoLoading: patientInfo.isLoading || updatePatientInfo.isLoading,
    // Additional Info,
    additionalInfoForm,
    onSubmitAdditionalInfo,
    additionalInfoLoading:
      additionalInfo.isLoading || editAdditionalInfo.isLoading,
    //Drug Referral Info
    drugReferralInfoForm,
    onSubmitDrugReferralInfo,
    drugReferralInfoLoading: drugReferralInfo.isLoading,
  };
}
