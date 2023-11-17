import { Flex } from "@chakra-ui/react";
import FormControl from "@nepMeds/components/Form/FormControl";
import { AmountType } from "@nepMeds/config/enum";
import { useGetDoctorListUnpaginated } from "@nepMeds/service/nepmeds-patient-doctorList";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { UseFormReturn } from "react-hook-form";
import { IOptionItem } from "..";

const discountTypeOptions = [
  { label: "Percentage", value: AmountType.PERCENTAGE },
  { label: "Amount", value: AmountType.AMOUNT },
];
interface IDiscountForm {
  title: string;
  specialization: IOptionItem[];
  doctor: IOptionItem[];
  discount_type: {
    label: string;
    value: AmountType;
  };
  value: string;
  code: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

const DiscountForm = ({
  formMethods,
}: {
  formMethods: UseFormReturn<IDiscountForm>;
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = formMethods;

  // React Query
  // TODO: check if specialization is being used as options on most of the places
  const { data: specialization = [] } = useSpecializationRegisterData();
  const { data: doctorList } = useGetDoctorListUnpaginated();
  const doctorListOptions = doctorList?.map(({ name, id }) => {
    return {
      label: name,
      value: id,
    };
  });
  const specializationList = specialization.map(s => ({
    label: s.name,
    value: s.id,
  }));
  // React Query Ends

  return (
    <Flex direction={"column"} gap={3}>
      <FormControl
        control="input"
        label={"Discount Title"}
        name={"title"}
        placeholder={"Enter Discount Title"}
        register={register}
        error={errors?.title?.message ?? ""}
        isRequired
      />
      <Flex gap={3}>
        <FormControl
          control="multiSelect"
          label={"Discount Type"}
          name={"discount_type"}
          placeholder={"Select Discount Type"}
          variant={"outline"}
          register={register}
          selectControl={control}
          options={discountTypeOptions}
          isMulti={false}
          required
          style={{
            background: colors.white,
            minHeight: "35px",
          }}
        />
      </Flex>
      <Flex gap={3}>
        {/* TODO: validation should trigger right when the user types and not when the submit button is pressed */}
        <FormControl
          control="input"
          label={"Discount Value"}
          name={"value"}
          placeholder={"Enter Discount Value"}
          register={register}
          error={errors?.value?.message ?? ""}
          isRequired
        />
        <FormControl
          control="input"
          label={"Discount Code"}
          name={"code"}
          placeholder={"Enter Discount Code"}
          register={register}
          error={errors?.code?.message ?? ""}
          isRequired
        />
      </Flex>
      <Flex gap={2}>
        <FormControl
          control="multiSelect"
          register={register}
          label={"Specialization"}
          name={"specialization"}
          placeholder={"Select Specialization"}
          variant={"outline"}
          selectControl={control}
          options={specializationList ?? []}
          style={{
            background: colors.white,
            minHeight: "35px",
          }}
        />
        <FormControl
          control="multiSelect"
          register={register}
          label={"Doctor"}
          name={"doctor"}
          placeholder={"Select Doctor"}
          variant={"outline"}
          selectControl={control}
          options={doctorListOptions ?? []}
          style={{
            background: colors.white,
            minHeight: "35px",
          }}
        />
      </Flex>
      <FormControl
        control={"input"}
        type={"date"}
        label={"Start Date"}
        name={"start_date"}
        register={register}
        error={errors?.start_date?.message ?? ""}
        isRequired
      />
      <FormControl
        control={"input"}
        type={"date"}
        label={"End Date"}
        name={"end_date"}
        register={register}
        error={errors?.end_date?.message ?? ""}
        isRequired
      />
    </Flex>
  );
};

export default DiscountForm;
