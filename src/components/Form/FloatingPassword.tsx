import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Input as ChakraInput,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

enum Type {
  TEXT = "type",
  PASSWORD = "password",
}
const PasswordViewIcon = ({ onToggle, isVisible }: ISetPasswordViewIcon) => {
  return (
    <IconButton
      aria-label="password"
      onClick={onToggle}
      icon={isVisible ? <ViewIcon /> : <ViewOffIcon />}
      sx={{
        bgColor: "transparent",
        "&:focus": { outline: "none" },
        color: colors.grey_50,
        "&:hover": {
          bgColor: "transparent",
          color: colors.grey_50,
        },
      }}
    />
  );
};
interface ISetPasswordViewIcon {
  onToggle: () => void;
  isVisible: boolean;
}

const FloatingPassword = ({
  label,
  helperText,
  name,
  error = "",
  rules,
  register,
  isVisible,
  isDisabled,
  labelDisabled,
  isRequired,
  type,
  onToggleVisibility,
  required,
  ...rest
}: IInput) => {
  return (
    <FormControl
      isInvalid={!!error}
      isRequired={isRequired}
      isDisabled={isDisabled}
      variant="floating"
    >
      <InputGroup>
        <ChakraInput
          id={name}
          type={isVisible ? Type.TEXT : Type.PASSWORD}
          {...register(name, rules)}
          {...rest}
          placeholder=" "
          h={14}
          pt={4}
          pr={8}
          pb={2}
          variant="floating"
        />

        {label && (
          <FormLabel htmlFor={name} fontWeight={400} fontSize={"14px"}>
            {label}
            {required && <span style={{ color: colors.error }}>&nbsp;*</span>}
          </FormLabel>
        )}

        <InputRightElement top="8%" onClick={onToggleVisibility}>
          <PasswordViewIcon
            onToggle={onToggleVisibility}
            isVisible={isVisible}
          />
        </InputRightElement>
      </InputGroup>

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

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
export interface IInput extends InputProps {
  label?: string;
  helperText?: string;
  error?: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  isRequired?: boolean;
  isDisabled?: boolean;
  onToggleVisibility: () => void;
  isVisible: boolean;
  required?: boolean;
  labelDisabled?: string;
}
export default FloatingPassword;
