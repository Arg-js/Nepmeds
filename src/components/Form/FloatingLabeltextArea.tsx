import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { RegisterOptions, UseFormRegister, FieldValues } from "react-hook-form";

const FloatinglabelTextArea = ({
  label,
  helperText,
  name,
  error = "",
  rules,
  register,
  isRequired,
  required,
  ...rest
}: ITextArea) => {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired} variant="floating">
      <Textarea
        sx={{ fontSize: 14, height: 120 }}
        id={name}
        size="xl"
        resize={"none"}
        {...register(name, rules)}
        {...rest}
      />
      {label && (
        <FormLabel htmlFor={name} fontWeight={400} fontSize={"14px"}>
          {label}
          {required && <span style={{ color: colors.error }}>&nbsp;*</span>}
        </FormLabel>
      )}

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export interface ITextArea<TFieldValues extends FieldValues = FieldValues>
  extends TextareaProps {
  label?: string;
  helperText?: string;
  error?: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  isRequired?: boolean;
  required?: boolean;
}

export default FloatinglabelTextArea;
