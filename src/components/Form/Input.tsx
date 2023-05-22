import {
  Input as ChakraInput,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface IInput extends InputProps {
  label?: string;
  helperText?: string;
  error?: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  isRequired?: boolean;
  isDisabled?: boolean;
  startIcon?: React.ReactNode;
  endIcons?: React.ReactNode;
  onIconClick?: () => void;
  required?: boolean;
  labelDisabled?: string;
  variant?: string;
}

const Input = ({
  label,
  helperText,
  name,
  error = "",
  rules,
  register,
  isDisabled,
  labelDisabled,
  isRequired,
  type,
  startIcon,
  endIcons,
  onIconClick,
  required,
  variant,
  ...rest
}: IInput) => {
  return (
    <FormControl
      isInvalid={!!error}
      isRequired={isRequired}
      isDisabled={isDisabled}
      variant={variant}
    >
      {label && (
        <FormLabel htmlFor={name} fontWeight={400} fontSize={14}>
          {label}
          {required && <span style={{ color: colors.error }}>&nbsp;*</span>}
        </FormLabel>
      )}

      {labelDisabled && (
        <FormLabel
          htmlFor={name}
          fontWeight={400}
          fontSize={14}
          opacity={"1 !important"}
        >
          {labelDisabled}
        </FormLabel>
      )}

      <InputGroup>
        {startIcon && (
          <InputLeftElement
            top="12%"
            pointerEvents="none"
            onClick={onIconClick}
          >
            {startIcon}
          </InputLeftElement>
        )}

        <ChakraInput
          id={name}
          type={type}
          variant="register"
          {...register(name, rules)}
          {...rest}
        />

        {endIcons && (
          <InputRightElement onClick={onIconClick} top="12%">
            {endIcons}
          </InputRightElement>
        )}
      </InputGroup>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default Input;
