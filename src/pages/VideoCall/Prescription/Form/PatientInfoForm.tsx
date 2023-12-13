import { Button, Divider, Flex } from "@chakra-ui/react";
import { useAddPrescription } from "../usePrescriptionForm";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { IPrescriptionInfo } from "@nepMeds/service/nepmeds-prescription";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";

const PatientInfoForm = ({
  appointment_id,
  follow_up,
  patient_info,
  setTabIndex,
  isEditable,
}: {
  // If appointment_id is undefined, then it is a follow up
  appointment_id?: string;
  follow_up?: string;
  patient_info: IPrescriptionInfo["patient_info"] | undefined;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  isEditable?: boolean;
}) => {
  const {
    onSubmitPatientInfo,
    patientInfoLoading,
    patientInfoForm: { register, handleSubmit, setValue },
  } = useAddPrescription();

  if (patient_info?.id) setValue("id", patient_info?.id);

  return (
    <form
      onSubmit={handleSubmit(() =>
        onSubmitPatientInfo({
          doctor_consult: appointment_id ?? "",
          id: patient_info?.id,
          follow_up: follow_up ?? "",
        }).then(() => setTabIndex(prev => prev + 1))
      )}
    >
      <Flex gap={2} mb={2} flexDirection={"column"}>
        <FloatingLabelInput
          label="History"
          name="history"
          register={register}
          defaultValue={patient_info?.history}
          isDisabled={!isEditable}
        />
        <FloatingLabelInput
          label="Examination"
          name="examination"
          defaultValue={patient_info?.examination}
          register={register}
          isDisabled={!isEditable}
        />
        <FloatingLabelInput
          label="Investigation"
          name="investigation"
          register={register}
          defaultValue={patient_info?.investigation}
          isDisabled={!isEditable}
        />
        <FloatingLabelInput
          label="Diagnosis"
          name="diagnosis"
          defaultValue={patient_info?.diagnosis}
          isDisabled={!isEditable}
          register={register}
        />

        <FloatinglabelTextArea
          label="Advice"
          name="advice"
          register={register}
          defaultValue={patient_info?.advice}
          isDisabled={!isEditable}
          style={{
            background: colors.forminput,
            border: "none",
          }}
        />
      </Flex>
      <Divider />
      {isEditable && (
        <Flex justifyContent={"space-between"} alignItems={"center"} mt={1}>
          <Button
            variant={"outline"}
            color={colors.primary}
            borderColor={colors.primary}
            fontWeight={"bold"}
            onClick={() => setTabIndex(prev => prev + 1)}
          >
            Skip
          </Button>
          <Button type="submit" isLoading={patientInfoLoading}>
            Next
          </Button>
        </Flex>
      )}
    </form>
  );
};

export default PatientInfoForm;
