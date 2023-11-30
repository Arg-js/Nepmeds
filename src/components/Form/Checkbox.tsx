import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  CheckboxProps,
  Checkbox as ChakraCheckbox,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import {
  RegisterOptions,
  FieldValues,
  Controller,
  Control,
  FieldPath,
} from "react-hook-form";

const Checkbox = <T extends FieldValues>({
  label,
  name,
  rules,
  isRequired,
  control,
  ...rest
}: ICheckbox<T>) => {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error} isRequired={isRequired} display="flex">
          <ChakraCheckbox {...field} isChecked={field.value} {...rest} />
          {label && (
            <FormLabel
              fontWeight={400}
              fontSize={"sm"}
              m={2}
              color={colors.grey_50}
            >
              {label}
            </FormLabel>
          )}
          {error && (
            <FormErrorMessage fontSize={"xs"}>
              {error?.message}
            </FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
};

interface ICheckbox<TFieldValues extends FieldValues = FieldValues>
  extends CheckboxProps {
  label?: string;
  name: FieldPath<TFieldValues>;
  rules?: RegisterOptions;
  isRequired?: boolean;
  control: Control<TFieldValues, unknown>;
}

export default Checkbox;
