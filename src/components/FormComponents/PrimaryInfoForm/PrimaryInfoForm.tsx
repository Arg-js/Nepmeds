import Select from "@nepMeds/components/Form/Select";
import { useForm } from "react-hook-form";
import { title } from "@nepMeds/utils/index";
import Input from "@nepMeds/components/Form/Input";
import { Grid, GridItem } from "@chakra-ui/layout";
import { colors } from "@nepMeds/theme/colors";
import TextArea from "@nepMeds/components/Form/TextArea";
import MultiSelect from "@nepMeds/components/Form/MultiSelect";
export const PrimaryInfoForm = () => {
  const { register } = useForm();

  return (
    <form style={{ width: "100%" }}>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <GridItem colSpan={4}>
          <TextArea
            name="bio"
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
            options={title}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            label="Mobile No."
            name="mobile"
            type="tel"
            register={register}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
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
            options={title}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            name="date"
            label="Date"
            register={register}
            type="date"
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Select
            placeholder=""
            label="Specialization"
            name="specialization"
            register={register}
            options={title}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem>
          <Input
            label="Pan Number"
            name="pan_number"
            register={register}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem>
          <Select
            placeholder=""
            label="ID Type"
            name="id_type"
            register={register}
            options={title}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem colSpan={4}>
          <p>Citizenship Detail</p>
        </GridItem>
        <GridItem colSpan={2}>
          <Input
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
            options={title}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
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
            options={title}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Select
            placeholder=""
            label="District"
            name="district"
            required
            register={register}
            options={title}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Select
            placeholder=""
            label="Municipality/ VDC"
            name="municipality"
            required
            register={register}
            options={title}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            placeholder=""
            label="Ward"
            name="ward"
            required
            register={register}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
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
