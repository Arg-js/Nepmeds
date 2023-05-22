import { Flex, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatingPassword from "@nepMeds/components/Form/FloatingPassword";
import Input from "@nepMeds/components/Form/Input";
import Select from "@nepMeds/components/Form/Select";
import { colors } from "@nepMeds/theme/colors";
import { title } from "@nepMeds/utils/index";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";

export const BasicInfoForm = () => {
  const { register } = useFormContext<IRegisterFields>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setConfirmpasswordVisible] = useState(false);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      <GridItem rowSpan={2} colSpan={1}>
        <FormLabel htmlFor="file" h="100%">
          <Flex bg={colors.forminput} borderRadius={12} h="100%">
            <VStack justifyContent="center" w="100%">
              <svgs.image />
              <HStack>
                <svgs.upload />
                <Text fontSize={14}>Upload Image</Text>
              </HStack>
            </VStack>
          </Flex>
        </FormLabel>
        <Input type="file" id="file" name="file" hidden register={register} />
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
