import { Flex } from "@chakra-ui/react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import Select from "@nepMeds/components/Form/Select";
import { useGetRejectionTitle } from "@nepMeds/service/nepmeds-reject-doc";
import { colors } from "@nepMeds/theme/colors";
import { useForm } from "react-hook-form";
import { defaultValues } from "./defaultValues";

const schema = Yup.object({
  reject_title: Yup.number().required("This field is required"),
  reject_remarks: Yup.string().required("This field is required"),
});

const RejectionModalForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  //   REACT QUERIES
  const { data: rejectionTitle } = useGetRejectionTitle();
  //   REACT QUERIES ENDS

  return (
    <form>
      <Flex direction={"column"} alignItems={"center"} gap={8}>
        <Select
          name="reject_title"
          label="Reason for Rejection"
          placeholder="Enter reason for rejection"
          required
          register={register}
          error={errors.reject_title?.message || ""}
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
