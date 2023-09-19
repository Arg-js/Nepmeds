import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Radio as ChakraRadio,
  RadioGroup,
  RadioProps,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { RegisterOptions, UseFormRegister, FieldValues } from "react-hook-form";

const Radio = ({
  label,
  options,
  register,
  name,
  rules,
  helperText,
  error,
  isRequired,
  value,
  ...rest
}: IRadio) => {
  const [initialValue, setInitialValue] = useState(
    value ? value : options[0].value
  );

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && (
        <FormLabel fontWeight={400} fontSize={"sm"} color={colors.grey_50}>
          {label}:
        </FormLabel>
      )}
      <RadioGroup value={initialValue} onChange={setInitialValue}>
        <Flex direction={"row"} gap={4}>
          {options.map(({ label, value }) => {
            return (
              <ChakraRadio
                key={value}
                value={value}
                fontSize={"sm"}
                fontWeight={400}
                id={name}
                {...register(name, rules)}
                {...rest}
              >
                {label}
              </ChakraRadio>
            );
          })}
        </Flex>
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage fontSize={"xs"}>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export interface IRadio<TFieldValues extends FieldValues = FieldValues>
  extends RadioProps {
  options: { label: string; value: string }[];
  label?: string;
  name: string;
  register: UseFormRegister<TFieldValues>;
  rules?: RegisterOptions;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
}

export default Radio;
