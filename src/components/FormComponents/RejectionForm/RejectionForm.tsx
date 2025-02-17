import { VStack } from "@chakra-ui/react";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import { colors } from "@nepMeds/theme/colors";
import { useFormContext } from "react-hook-form";

export const RejectionForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <VStack gap={6.5} mb={3}>
        <FloatinglabelTextArea
          size="lg"
          name="remarks"
          register={register}
          required
          rules={{
            required: "Remarks is required.",
          }}
          style={{
            background: colors.forminput,
            border: "none",
            padding: "17px",
          }}
          label="Remarks"
          error={errors?.remarks?.message?.toString()}
        />
      </VStack>
    </>
  );
};
