import Select from "@nepMeds/components/Form/Select";
import { useForm } from "react-hook-form";
import { title } from "@nepMeds/utils/index";
import Input from "@nepMeds/components/Form/Input";
import Password from "@nepMeds/components/Form/Password";
import { Grid, GridItem } from "@chakra-ui/layout";
import { colors } from "@nepMeds/theme/colors";

export const BasicInfoForm = () => {
  const { register } = useForm();
  return (
    <form style={{ width: "100%" }}>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={6}
      >
        <GridItem rowSpan={2} colSpan={1} bg="tomato" />
        <GridItem colSpan={3}>
          <Select
            label="Title"
            placeholder=""
            name="title"
            register={register}
            options={title}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem>
          <Input
            label="First Name"
            name="firstname"
            register={register}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem>
          <Input
            label="Middle Name"
            name="middlename"
            register={register}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem>
          <Input
            label="Last Name"
            name="lastname"
            register={register}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Password
            label="Password"
            name="password"
            register={register}
            isVisible={true}
            onToggleVisibility={() => null}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Password
            label="Confirm Password"
            name="confirmpassword"
            register={register}
            isVisible={true}
            onToggleVisibility={() => null}
            style={{ background: colors.forminput, border: "none" }}
          />
        </GridItem>
      </Grid>
    </form>
  );
};
