import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Delete } from "react-iconly";

export const AcademicInfoForm = () => {
  const { control, register } = useForm({
    defaultValues: {
      academic: [{ degree: "", major: "", college: "", passedYear: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "academic",
  });

  return (
    <form style={{ width: "100%" }}>
      {fields.map((item, index) => {
        return (
          <Flex key={item.id} gap={6} alignItems="flex-end" mb={6}>
            <Controller
              render={({ field }) => (
                <FloatingLabelInput
                  label="Degree"
                  register={register}
                  style={{ background: colors.forminput, border: "none" }}
                  {...field}
                />
              )}
              name={`academic.${index}.degree`}
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
              name={`academic.${index}.college`}
              control={control}
            />

            <Controller
              render={({ field }) => (
                <FloatingLabelInput
                  label="Passed Year"
                  register={register}
                  type="date"
                  style={{ background: colors.forminput, border: "none" }}
                  {...field}
                />
              )}
              name={`academic.${index}.passedYear`}
              control={control}
            />

            <Button type="button" onClick={() => remove(index)}>
              <Icon as={Delete} fontSize={20} color={colors.error} />
            </Button>
          </Flex>
        );
      })}
      <Button
        variant="outline"
        fontWeight={400}
        color={colors.primary}
        borderColor={colors.primary}
        w="100%"
        mb={8}
        leftIcon={<span color={colors.error}> + </span>}
        onClick={() =>
          append({ degree: "", major: "", college: "", passedYear: "" })
        }
      >
        Add Another Academic Detail
      </Button>
    </form>
  );
};
