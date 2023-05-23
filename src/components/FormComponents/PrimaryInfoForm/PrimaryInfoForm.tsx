import { Grid, GridItem } from "@chakra-ui/layout";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import MultiSelect from "@nepMeds/components/Form/MultiSelect";
import Select from "@nepMeds/components/Form/Select";
import { useGetDistricts, useGetProvince } from "@nepMeds/service/nepmeds-core";
import { useSpecializationData } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import {
  district,
  gender,
  idType,
  municipality,
  phone,
} from "@nepMeds/utils/choices";
import { useFormContext } from "react-hook-form";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";

const PrimaryInfo = () => {
  const { register, control, watch } = useFormContext<IRegisterFields>();
  const provinceInfo = useGetProvince();
  const districtInfo = useGetDistricts(watch("province"));
  const { data: specialization = [] } = useSpecializationData();

  const provinceOptions =
    provinceInfo.data?.map(p => ({
      label: p.name,
      value: p.id,
    })) || [];

  const districtOptions =
    districtInfo.data?.map(p => ({
      label: p.name,
      value: p.id,
    })) || [];

  const specializationOptions = specialization.map(s => ({
    label: s.name,
    value: s.id,
  }));

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6} pb={8}>
      <GridItem colSpan={4}>
        <FloatinglabelTextArea
          label="Basic Information"
          name="bio_detail"
          register={register}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <Select
          placeholder=""
          name="phone"
          register={register}
          options={phone}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <FloatingLabelInput
          label="Mobile No."
          name="mobile_number"
          type="tel"
          register={register}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <FloatingLabelInput
          type="email"
          label="Email"
          name="email"
          register={register}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>{" "}
      <GridItem colSpan={2}>
        <Select
          placeholder=""
          label="Gender"
          name="gender"
          register={register}
          options={gender}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <FloatingLabelInput
          name="date_of_birth"
          label="Date"
          register={register}
          type="date"
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <MultiSelect
          options={specializationOptions}
          label="Specialization"
          name="specialization"
          selectControl={control}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      <GridItem>
        <FloatingLabelInput
          label="Pan Number"
          name="pan_number"
          register={register}
          style={{
            background: colors.forminput,
            border: "none",
          }}
        />
      </GridItem>
      <GridItem>
        <Select
          placeholder=""
          label="ID Type"
          name="id_type"
          register={register}
          options={idType}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      <GridItem colSpan={4}>
        <p>Citizenship Detail</p>
      </GridItem>
      <GridItem colSpan={2}>
        <FloatingLabelInput
          label="Citizenship Number"
          name="citizenship_number"
          required
          register={register}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <Select
          placeholder=""
          label="Issued District"
          name="issued_district"
          required
          register={register}
          options={district}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <FloatingLabelInput
          name="citizenship_issued_date"
          label="Issued Date"
          register={register}
          type="date"
          required
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={4}>
        <p>Address Details</p>
      </GridItem>
      <GridItem colSpan={2}>
        <Select
          placeholder=""
          label="Province"
          name="province"
          required
          register={register}
          options={provinceOptions}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <Select
          placeholder=""
          label="District"
          name="district"
          required
          register={register}
          options={districtOptions}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <Select
          placeholder=""
          label="Municipality/ VDC"
          name="municipality_vdc"
          required
          register={register}
          options={municipality}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <FloatingLabelInput
          placeholder=""
          label="Ward"
          name="ward"
          required
          register={register}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <FloatingLabelInput
          placeholder=""
          label="Tole"
          name="tole"
          register={register}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
    </Grid>
  );
};
export const PrimaryInfoForm = PrimaryInfo;
