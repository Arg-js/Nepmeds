import { Flex } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FormControl from "@nepMeds/components/Form/FormControl";
import { useGetDetailAddress } from "@nepMeds/service/nepmeds-core";
import { colors } from "@nepMeds/theme/colors";
import {
  getDistrictsByProvince,
  getProvinceOptions
} from "@nepMeds/utils/Address";
import { UseFormReturn } from "react-hook-form";

const HospitalForm = ({
  formMethods
}: {
  formMethods: UseFormReturn<{
    name: string;
    district: string;
    province: string;
  }>;
}) => {
  const {
    register,
    formState: { errors },
    watch
  } = formMethods;

  // React Query
  const { data: detailAddress } = useGetDetailAddress();
  // React Query Ends

  const provinceOptions = detailAddress
    ? getProvinceOptions({ detailAddress })
    : [];

  const districtOptions = detailAddress
    ? getDistrictsByProvince({
        provinceId: watch("province"),
        detailAddress
      })
    : [];

  return (
    <form>
      <Flex gap={4} direction={"column"}>
        <FloatingLabelInput
          label="Name"
          name="name"
          register={register}
          error={errors.name?.message ?? ""}
        />
        <FormControl
          control="select"
          name="province"
          label="Province"
          options={provinceOptions}
          register={register}
          errors={errors.province?.message ?? ""}
          bgColor={colors.forminput}
          border={"none"}
        />
        <FormControl
          control="select"
          name="district"
          label="District"
          options={districtOptions}
          isDisabled={!districtOptions.length}
          register={register}
          errors={errors.district?.message ?? ""}
          bgColor={colors.forminput}
          border={"none"}
        />
      </Flex>
    </form>
  );
};

export default HospitalForm;
