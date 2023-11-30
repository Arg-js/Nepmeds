import { Button, Divider, Flex } from "@chakra-ui/react";
import { useAddPrescription } from "../usePrescriptionForm";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import { IPrescriptionInfo } from "@nepMeds/service/nepmeds-prescription";

const AdditionalInfoForm = ({
  appointment_id,
  additional_info,
  follow_up,
}: {
  appointment_id?: string;
  follow_up?: string;

  additional_info: IPrescriptionInfo["additional_info"] | undefined;
}) => {
  const {
    additionalInfoForm: { handleSubmit, register, setValue },
    additionalInfoLoading,
    onSubmitAdditionalInfo: onSubmit,
  } = useAddPrescription();

  if (additional_info?.id) setValue("id", additional_info?.id);

  return (
    <form
      onSubmit={handleSubmit(() =>
        onSubmit({
          doctor_consult: appointment_id ?? "",
          follow_up: follow_up ?? "",
          id: additional_info?.id,
        })
      )}
    >
      <Flex gap={2} mb={2} flexDirection={"column"}>
        <FloatingLabelInput
          label="Recommendation"
          name="recommendation"
          register={register}
          defaultValue={additional_info?.recommendation}
        />

        <FloatingLabelInput
          name="follow_up_date"
          label="Follow Up Date"
          register={register}
          type="date"
          defaultValue={additional_info?.follow_up_date}
          _hover={{ cursor: "pointer" }}
        />

        <FloatinglabelTextArea
          flex={1}
          label="Remarks"
          name="remarks"
          register={register}
          defaultValue={additional_info?.remarks}
        />
      </Flex>
      <Divider />
      <Flex justifyContent={"center"} alignItems={"center"} mt={1}>
        <Button type="submit" isLoading={additionalInfoLoading}>
          Confirm
        </Button>
      </Flex>
    </form>
  );
};

export default AdditionalInfoForm;
