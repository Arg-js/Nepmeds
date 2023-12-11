import { Divider, Flex, Tooltip } from "@chakra-ui/react";
import Checkbox from "@nepMeds/components/Form/Checkbox";
import FormControl from "@nepMeds/components/Form/FormControl";
import { AmountType } from "@nepMeds/config/enum";
import { IDiscountReqBody } from "@nepMeds/service/nepmeds-discount";
import { useGetDoctorListUnpaginated } from "@nepMeds/service/nepmeds-patient-doctorList";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { UseFormReturn } from "react-hook-form";
import { IOptionItem } from "..";

const discountTypeOptions = [
  { label: "Percentage", value: AmountType.PERCENTAGE },
  { label: "Amount", value: AmountType.AMOUNT },
];
interface IDiscountForm
  extends Omit<
    IDiscountReqBody,
    | "specialization"
    | "doctor"
    | "discount_type"
    | "value"
    | "coupon_applicable_number"
  > {
  specialization: IOptionItem[];
  doctor: IOptionItem[];
  discount_type: {
    label: string;
    value: AmountType;
  };
  value: string;
  coupon_applicable_number: string;
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
        error={errors?.discount_type?.value?.message ?? ""}
        style={{
          background: colors.white,
          minHeight: "35px",
        }}
      />
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
      <Divider />
      <Flex gap={2}>
        <FormControl
          control="multiSelect"
          register={register}
          label={"Specialization"}
          name={"specialization"}
          placeholder={"---All---"}
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
          placeholder={"---All---"}
          variant={"outline"}
          selectControl={control}
          options={doctorListOptions ?? []}
          style={{
            background: colors.white,
            minHeight: "35px",
          }}
        />
      </Flex>
      <Divider />
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
      <Tooltip
        label="Number of times coupon can be used by a user, default: 'every time'"
        hasArrow
      >
        <Flex>
          <FormControl
            control="input"
            label={"Coupon applicable number"}
            name={"coupon_applicable_number"}
            placeholder={"Enter coupon applicable number"}
            register={register}
            type={"number"}
          />
        </Flex>
      </Tooltip>
      <Checkbox
        label="Make this a one time coupon?"
        name="onetime_coupon"
        control={formMethods.control}
      />
    </Flex>
  );
};

export default DiscountForm;
