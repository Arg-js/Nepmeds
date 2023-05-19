import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Delete } from "react-iconly";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import Select from "@nepMeds/components/Form/Select";
import { year } from "@nepMeds/utils/choices";

export const AcademicInfoForm = () => {
  const { control, register, setValue } = useFormContext<IRegisterFields>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "academic",
  });

  return (
    <>
      {fields.map((item, index) => {
        return (
          <Flex mb={4} key={item.id} flexDirection="column" gap={3}>
            <Flex gap={6} alignItems="flex-end">
              <Controller
                render={({ field }) => (
                  <FloatingLabelInput
                    label="Degree"
                    register={register}
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                  />
                )}
                name={`academic.${index}.degree_program`}
                control={control}
              />

              <Controller
                render={({ field }) => (
                  <FloatingLabelInput
                    label="Major"
                    register={register}
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                  />
                )}
                name={`academic.${index}.major`}
                control={control}
              />

              <Controller
                render={({ field }) => (
                  <FloatingLabelInput
                    label="College/ University"
                    register={register}
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                  />
                )}
                name={`academic.${index}.university`}
                control={control}
              />

              <Controller
                render={({ field }) => (
                  <Select
                    placeholder=""
                    label="Passed Year"
                    register={register}
                    options={year}
                    {...field}
                    style={{
                      background: colors.forminput,
                      border: "none",
                      paddingTop: "15px",
                    }}
                  />
                )}
                name={`academic.${index}.graduation_year`}
                control={control}
              />
            </Flex>
            <Flex>
              <Controller
                render={({ field: { value, ...otherFields } }) => (
                  <FloatingLabelInput
                    label="Upload Document"
                    register={register}
                    type="file"
                    style={{ background: colors.forminput, border: "none" }}
                    {...otherFields}
                    onChange={e =>
                      setValue(`academic.${index}.file`, e.target.files?.[0])
                    }
                  />
                )}
                name={`academic.${index}.file`}
                control={control}
              />

              <Button type="button" onClick={() => remove(index)} w="auto">
                <Icon as={Delete} fontSize={20} color={colors.error} />
              </Button>
            </Flex>
          </Flex>
        );
      })}
      <Button
        variant="outline"
        size="sm"
        fontWeight={400}
        color={colors.primary}
        borderColor={colors.primary}
        w="100%"
        mb={8}
        leftIcon={<span color={colors.error}> + </span>}
        onClick={() =>
          append({
            doctor: 0,
            degree_program: "",
            major: "",
            university: "",
            graduation_year: "",
            file: undefined,
          })
        }
      >
        Add Another Academic Detail
      </Button>
    </>
  );
};
