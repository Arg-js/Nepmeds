import { Flex } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FormControl from "@nepMeds/components/Form/FormControl";
import { useGetDetailAddress } from "@nepMeds/service/nepmeds-core";
import { colors } from "@nepMeds/theme/colors";
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
  const getDistrictsByProvince = (provinceId: string) => {
    const province = detailAddress?.find(
      item => item.name.toString() === provinceId
    );

    if (!province) return [];
    return province.province_district.map(district => ({
      label: district.name,
      value: district.name
    }));
  };

  const provinceOptions = detailAddress?.map(item => {
    return { label: item.name, value: item.name };
  });

  const districtOptions = getDistrictsByProvince(watch("province") ?? "");
  return (
    <form>
      <Flex gap={4} direction={"column"}>
        <FloatingLabelInput
          label="name"
          name="name"
          register={register}
          error={errors.name?.message ?? ""}
        />
        <FormControl
          control="select"
          name="province"
          label="province"
          options={provinceOptions ?? []}
          register={register}
          errors={errors.province?.message ?? ""}
          bgColor={colors.forminput}
          border={"none"}
        />
        <FormControl
          control="select"
          name="district"
          label="district"
          options={districtOptions ?? []}
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
