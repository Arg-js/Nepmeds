import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  SelectProps,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { useEffect } from "react";
import { Controller, RegisterOptions, UseFormRegister } from "react-hook-form";
import ReactSelect from "react-select";
import { ISelectOption } from "@nepMeds/components/Form/Select";

export type IOptionItem = { label: string; value: string };

interface IMultiSelect extends SelectProps {
  placeholder?: string;
  options: ISelectOption[];
  label?: string;
  name?: string;
  value?: string;
  error?: string;
  rules?: RegisterOptions;
  helperText?: string;
  isRequired?: boolean;
  selectControl?: any;
  style?: Record<string, string>;
  required?: boolean;
  multiValue?: IOptionItem[];
  register: UseFormRegister<any>;
  variant?: string;
  isMulti?: boolean;
}

const MultiSelect = ({
  label,
  options,
  helperText,
  name,
  isRequired,
  selectControl,
  style,
  placeholder,
  register,
  rules,
  required,
  multiValue,
  variant,
  error,
  isMulti,
  ...rest
}: IMultiSelect) => {
  useEffect(() => {
    if (name) {
      register(name, rules); // Register the field with the validation rules when the component mounts
    }
  }, [name, register, rules]);

  return (
    <Controller
      control={selectControl}
      name={name ?? ""}
      rules={rules}
      render={({ field, fieldState }) => {
        const { onChange, onBlur, value, name, ref } = field;

        return (
          <FormControl
            isInvalid={!!fieldState.error}
            isRequired={isRequired}
            variant={variant ?? "floating"}
          >
            {label && (
              <FormLabel
                htmlFor={name}
                fontWeight={400}
                fontSize={"sm"}
                color={colors.black_50}
                zIndex={rest.isDisabled ? 0 : 1}
              >
                {label}
                {required && (
                  <span style={{ color: colors.error }}>&nbsp;*</span>
                )}
              </FormLabel>
            )}

            <ReactSelect
              isMulti={isMulti ?? true}
              onChange={newValue => {
                onChange(newValue);
                // Register the value after onChange
              }}
              menuPosition="fixed"
              onBlur={onBlur}
              value={value || multiValue}
              options={options}
              placeholder={placeholder}
              ref={ref}
              styles={{
                control: baseStyles => ({
                  ...baseStyles,
                  background: colors.forminput,
                  color: colors.black_50,
                  paddingTop: 10,
                  minHeight: "35px",
                  borderRadius: "8px",
                  border: error
                    ? `2px solid ${colors.error}`
                    : `1px solid ${colors.gray_border}`,
                  ...style,
                }),
                indicatorSeparator: () => ({ display: "none" }),
              }}
            />

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            {fieldState.error && (
              <FormErrorMessage fontSize={"xs"}>
                {fieldState.error.message}
              </FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default MultiSelect;
