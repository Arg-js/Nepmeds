import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

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
        sx={{
          fontSize: 14,
          pt: 5,
          pl: 4,
          pr: 8,
          pb: 2,
          height: 120,
          background: colors.forminput,
          border: "none",
          borderRadius: "md",
          color: colors.black_50,
        }}
        id={name}
        size="xl"
        resize={"none"}
        {...register(name, rules)}
        {...rest}
      />
      {label && (
        <FormLabel
          htmlFor={name}
          fontWeight={400}
          fontSize={"14px"}
          color={colors.black_50}
        >
          {label}
          {required && <span style={{ color: colors.error }}>&nbsp;*</span>}
        </FormLabel>
      )}

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage fontSize={"xs"}>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export interface ITextArea extends TextareaProps {
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
