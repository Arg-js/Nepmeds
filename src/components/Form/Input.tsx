import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  FormErrorMessage,
  FormHelperText,
  InputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { RegisterOptions, UseFormRegister, FieldValues } from "react-hook-form";

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
  variant = "floating",
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
        <FormLabel htmlFor={name} fontWeight={400} fontSize={"14px"}>
          {label}
          {required && <span style={{ color: colors.error }}>&nbsp;*</span>}
        </FormLabel>
      )}
      {labelDisabled && (
        <FormLabel
          htmlFor={name}
          fontWeight={400}
          fontSize={"14px"}
          opacity={"1 !important"}
        >
          {labelDisabled}
        </FormLabel>
      )}
      <InputGroup>
        {startIcon ? (
          <InputLeftElement
            top="12%"
            pointerEvents="none"
            onClick={onIconClick}
          >
            {startIcon}
          </InputLeftElement>
        ) : (
          ""
        )}
        <ChakraInput
          id={name}
          type={type}
          {...register(name, rules)}
          {...rest}
        />
        {endIcons ? (
          <InputRightElement onClick={onIconClick} top="8%">
            {endIcons}
          </InputRightElement>
        ) : (
          ""
        )}
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
export interface IInput<TFieldValues extends FieldValues = FieldValues>
  extends InputProps {
  label?: string;
  helperText?: string;
  error?: string;
  name: string;
  register: UseFormRegister<TFieldValues>;
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
export default Input;
