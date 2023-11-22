import { Button, Flex } from "@chakra-ui/react";
import { useAddPrescription } from "./usePrescriptionForm";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import { IPrescriptionInfo } from "@nepMeds/service/nepmeds-prescription";

const AdditionalInfoForm = ({
  appointment_id,
  additional_info,
}: {
  appointment_id: string;

  additional_info: IPrescriptionInfo["additional_info"] | undefined;
}) => {
  const {
    additionalInfoForm: { handleSubmit, register, formState, setValue },
    additionalInfoLoading,
    onSubmitAdditionalInfo: onSubmit,
  } = useAddPrescription();

  if (additional_info?.id) setValue("id", additional_info?.id);

  return (
    <form
      onSubmit={handleSubmit(() =>
        onSubmit({
          doctor_consult: appointment_id,
          id: additional_info?.id,
        })
      )}
    >
      <Flex gap={2} mb={2} flexDirection={"column"}>
        <Flex gap={1}>
          <FloatingLabelInput
            label="Recommendation"
            name="recommendation"
            required
            register={register}
            defaultValue={additional_info?.recommendation}
            style={{
              background: colors.forminput,
              border: "none",
            }}
            error={formState?.errors.recommendation?.message}
            rules={{
              required: "Recommendation is required.",
            }}
          />

          <FloatingLabelInput
            name="follow_up_date"
            label="Follow Up Date"
            register={register}
            type="date"
            required
            defaultValue={additional_info?.follow_up_date}
            _hover={{ cursor: "pointer" }}
            style={{
              background: colors.forminput,
              border: "none",
            }}
            rules={{
              required: "Follow Up Date is required.",
            }}
            error={formState?.errors.follow_up_date?.message}
          />
        </Flex>

        <FloatinglabelTextArea
          flex={1}
          label="Remarks"
          name="remarks"
          required
          register={register}
          defaultValue={additional_info?.remarks}
          style={{
            background: colors.forminput,
            border: "none",
          }}
          error={formState?.errors.remarks?.message}
          rules={{
            required: "Remarks is required.",
          }}
        />
      </Flex>
      <Button type="submit" isLoading={additionalInfoLoading}>
        Save
      </Button>
    </form>
  );
};

export default AdditionalInfoForm;
