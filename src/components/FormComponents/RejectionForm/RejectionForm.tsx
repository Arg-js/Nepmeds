import { VStack } from "@chakra-ui/react";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import Select from "@nepMeds/components/Form/Select";
import { useGetRejectionTitle } from "@nepMeds/service/nepmeds-reject-doc";
import { colors } from "@nepMeds/theme/colors";
import { useFormContext } from "react-hook-form";

export const RejectionForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { data } = useGetRejectionTitle();
  const rejctionTitle = data?.map(item => {
    return { label: item.name, value: item.id };
  });

  return (
    <>
      <VStack gap={6.5} mb={3}>
        <Select
          name="title_id"
          label="Reason for Rejection"
          register={register}
          required
          rules={{
            required: "Rejection Title is required.",
          }}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          options={rejctionTitle ?? []}
        />

        <FloatinglabelTextArea
          size="lg"
          name="remarks"
          register={register}
          required
          rules={{
            required: "Description is required.",
          }}
          style={{
            background: colors.forminput,
            border: "none",
            padding: "17px",
          }}
          label="Description"
          error={errors?.remarks?.message?.toString()}
        />
      </VStack>
    </>
  );
};
