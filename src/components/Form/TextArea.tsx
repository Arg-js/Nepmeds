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

const TextArea = ({
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
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && (
        <FormLabel htmlFor={name} fontWeight={400} fontSize={"14px"}>
          {label}
          {required && <span style={{ color: colors.error }}>&nbsp;*</span>}
        </FormLabel>
      )}
      <Textarea
        sx={{ fontSize: 14, height: 120 }}
        id={name}
        size="xl"
        resize={"none"}
        {...register(name, rules)}
        {...rest}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
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

export default TextArea;
