import Select from "@nepMeds/components/Form/Select";
import { useForm } from "react-hook-form";
import { Grid, GridItem } from "@chakra-ui/layout";
import { colors } from "@nepMeds/theme/colors";
import TextArea from "@nepMeds/components/Form/TextArea";
import MultiSelect from "@nepMeds/components/Form/MultiSelect";
import {
  district,
  gender,
  idType,
  municipality,
  phone,
  province,
  specialization,
} from "@nepMeds/utils/choices";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
export const PrimaryInfoForm = () => {
  const { register, control } = useForm();

  return (
    <form style={{ width: "100%" }}>
      <Grid templateColumns="repeat(4, 1fr)" gap={6} pb={8}>
        <GridItem colSpan={4}>
          <TextArea
            name="bio_detail"
            label="Basic Information"
            register={register}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Select
            placeholder=""
            name="title"
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
            options={specialization}
            label="Specialization"
            name="specialization"
            placeholder=""
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
            name="issued_date"
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
            options={province}
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
            options={district}
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
            name="municipality"
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
    </form>
  );
};

export default PrimaryInfoForm;
