import { VStack } from "@chakra-ui/react";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import { colors } from "@nepMeds/theme/colors";
import { useFormContext } from "react-hook-form";

export const RejectionForm = ({ onSubmit }: any) => {
  const { register } = useFormContext();
  return (
    <>
      <form style={{ width: "100%" }} onSubmit={onSubmit}>
        <VStack gap={7.5} mb={3}>
          <FloatinglabelTextArea
            size="lg"
            name="remarks"
            register={register}
            style={{
              background: colors.forminput,
              border: "none",
              padding: "17px",
            }}
            label="Remark"
          />
        </VStack>
      </form>
    </>
  );
};
