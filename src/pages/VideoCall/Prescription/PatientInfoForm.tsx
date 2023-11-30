import { Button, Grid } from "@chakra-ui/react";
import { useAddPrescription } from "./usePrescriptionForm";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { IPrescriptionInfo } from "@nepMeds/service/nepmeds-prescription";

const PatientInfoForm = ({
  appointment_id,
  follow_up,
  patient_info,
}: {
  // If appointment_id is undefined, then it is a follow up
  appointment_id?: string;
  follow_up?: string;
  patient_info: IPrescriptionInfo["patient_info"] | undefined;
}) => {
  const {
    onSubmitPatientInfo,
    patientInfoLoading,
    patientInfoForm: { register, formState, handleSubmit, setValue },
  } = useAddPrescription();

  if (patient_info?.id) setValue("id", patient_info?.id);

  return (
    <form
      onSubmit={handleSubmit(() =>
        onSubmitPatientInfo({
          doctor_consult: appointment_id ?? "",
          id: patient_info?.id,
          follow_up: follow_up ?? "",
        })
      )}
    >
      <Grid templateColumns="repeat(3, 1fr)" gap={2} mb={2}>
        <FloatingLabelInput
          label="History"
          name="history"
          required
          register={register}
          defaultValue={patient_info?.history}
          style={{
            background: colors.forminput,
            border: "none",
          }}
          error={formState?.errors.history?.message}
          rules={{
            required: "History is required.",
          }}
        />
        <FloatingLabelInput
          label="Examination"
          name="examination"
          required
          defaultValue={patient_info?.examination}
          register={register}
          style={{
            background: colors.forminput,
            border: "none",
          }}
          error={formState?.errors.examination?.message}
          rules={{
            required: "Examination is required.",
          }}
        />
        <FloatingLabelInput
          label="Investigation"
          name="investigation"
          required
          register={register}
          defaultValue={patient_info?.investigation}
          style={{
            background: colors.forminput,
            border: "none",
          }}
          error={formState?.errors.investigation?.message}
          rules={{
            required: "Investigation is required.",
          }}
        />
        <FloatingLabelInput
          label="Diagnosis"
          name="diagnosis"
          required
          defaultValue={patient_info?.diagnosis}
          register={register}
          style={{
            background: colors.forminput,
            border: "none",
          }}
          error={formState?.errors.diagnosis?.message}
          rules={{
            required: "Diagnosis is required.",
          }}
        />
        <FloatingLabelInput
          label="Advice"
          name="advice"
          required
          register={register}
          defaultValue={patient_info?.advice}
          style={{
            background: colors.forminput,
            border: "none",
          }}
          error={formState?.errors.advice?.message}
          rules={{
            required: "Advice is required.",
          }}
        />
      </Grid>
      <Button type="submit" isLoading={patientInfoLoading}>
        Save
      </Button>
    </form>
  );
};

export default PatientInfoForm;
