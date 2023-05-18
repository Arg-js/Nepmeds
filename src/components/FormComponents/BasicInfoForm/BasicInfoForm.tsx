import { Grid, GridItem } from "@chakra-ui/layout";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import Input from "@nepMeds/components/Form/Input";
import Password from "@nepMeds/components/Form/Password";
import Select from "@nepMeds/components/Form/Select";
import { colors } from "@nepMeds/theme/colors";
import { title } from "@nepMeds/utils/index";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import FloatingPassword from "@nepMeds/components/Form/FloatingPassword";

export const BasicInfoForm = () => {
  const { register } = useFormContext<IRegisterFields>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setConfirmpasswordVisible] = useState(false);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      {/* <GridItem rowSpan={2} colSpan={1} bg="tomato" /> */}
      <GridItem rowSpan={2} colSpan={1}>
        <Input type="file" name="file" register={register} />
      </GridItem>

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
        <FloatingLabelInput
          label="First Name"
          name="first_name"
          register={register}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem>
        <FloatingLabelInput
          label="Middle Name"
          name="middle_name"
          register={register}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem>
        <FloatingLabelInput
          label="Last Name"
          name="last_name"
          register={register}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <FloatingPassword
          label="Password"
          name="password"
          register={register}
          isVisible={passwordVisible}
          onToggleVisibility={() => setPasswordVisible(!passwordVisible)}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <FloatingPassword
          label="Confirm Password"
          name="confirm_password"
          register={register}
          isVisible={confirmpasswordVisible}
          onToggleVisibility={() =>
            setConfirmpasswordVisible(!confirmpasswordVisible)
          }
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
    </Grid>
  );
};
