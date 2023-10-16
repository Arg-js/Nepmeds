import { Flex } from "@chakra-ui/react";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import Select from "@nepMeds/components/Form/Select";
import { useGetRejectionTitle } from "@nepMeds/service/nepmeds-reject-doc";
import { colors } from "@nepMeds/theme/colors";
import { useFormContext } from "react-hook-form";

const RejectionModalForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ reject_title: string; reject_remarks: string }>();

  //   REACT QUERIES
  const { data: rejectionTitle } = useGetRejectionTitle();
  //   REACT QUERIES ENDS

  return (
    <form>
      <Flex direction={"column"} alignItems={"center"} gap={8}>
        <Select
          name="reject_title"
          label="Reason for Rejection"
          required
          register={register}
          error={errors?.reject_title?.message || ""}
          options={rejectionTitle ?? []}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
        <FloatinglabelTextArea
          label="Description"
          name="reject_remarks"
          required
          register={register}
          error={errors.reject_remarks?.message || ""}
        />
      </Flex>
    </form>
  );
};

export default RejectionModalForm;
