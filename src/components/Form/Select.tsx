import {
  Select as ChakraSelect,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputLeftElement,
  InputRightElement,
  SelectProps,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

const Select = ({
  placeholder,
  label,
  options,
  rules,
  register,
  helperText,
  name,
  error,
  isRequired,
  required,
  enabled,
  SelectedOption,
  startIcon,
  onIconClick,
  endIcons,
  ...rest
}: ISelect) => {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired} variant="floating">
      {startIcon ? (
        <InputLeftElement
          top="10%"
          left={"-20px"}
          pointerEvents="none"
          onClick={onIconClick}
        >
          {startIcon}
        </InputLeftElement>
      ) : (
        ""
      )}
      {endIcons ? (
        <InputRightElement onClick={onIconClick} top="8%">
          {endIcons}
        </InputRightElement>
      ) : (
        ""
      )}

      <ChakraSelect
        sx={{ background: colors.forminput }}
        {...register(name, rules)}
        {...rest}
        id={name}
        h={14}
        // value={defaultValue}

        // pr={8}
      >
        {placeholder && (
          <option value="" disabled={enabled}>
            {placeholder}
          </option>
        )}
        {options?.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </ChakraSelect>
      {label && (
        <FormLabel htmlFor={name} fontWeight={400} fontSize={"14px"}>
          {label}{" "}
          {required && <span style={{ color: colors.error }}>&nbsp;*</span>}
        </FormLabel>
      )}

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export interface ISelect extends SelectProps {
  placeholder?: string;
  options: ISelectOption[];
  label?: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
  helperText?: string;
  isRequired?: boolean;
  required?: boolean;
  enabled?: boolean;
  SelectedOption?: string;
  startIcon?: React.ReactNode;
  endIcons?: React.ReactNode;
  onIconClick?: () => void;
}
export default Select;

export interface ISelectOption {
  label: string;
  value: string | number;
}
