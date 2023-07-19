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
import { useTranslation } from "react-i18next";
import ReactSelect from "react-select";
import { ISelectOption } from "./Select";

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
  multiValue?: { label: string; value: string }[];
  register: UseFormRegister<any>;
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
}: IMultiSelect) => {
  const { t } = useTranslation();

  console.log(multiValue);

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
            variant="floating"
          >
            <ReactSelect
              isMulti
              onChange={newValue => {
                onChange(newValue);
                // register(name, rules);
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
                  border: "none",
                  paddingTop: 20,
                  minHeight: "58px",
                  borderRadius: "8px",
                  borderWidth: fieldState.error ? "2px" : "1px",
                  ...style,
                }),
              }}
            />
            {label && (
              <FormLabel htmlFor={name} fontWeight={400} fontSize={"14px"}>
                {label}
                {required && (
                  <span style={{ color: colors.error }}>&nbsp;*</span>
                )}
              </FormLabel>
            )}

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            {fieldState.error?.message && (
              <FormErrorMessage>{t(fieldState.error.message)}</FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default MultiSelect;
