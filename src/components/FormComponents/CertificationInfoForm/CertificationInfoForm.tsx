import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Delete } from "react-iconly";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
export const CertificationInfoForm = () => {
  const { control, register } = useFormContext<IRegisterFields>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certification",
  });
  return (
    <>
      {fields.map((item, index) => {
        return (
          <Flex gap={6} alignItems="flex-end" key={item.id} mb={6}>
            <Controller
              render={({ field }) => (
                <FloatingLabelInput
                  label="Title"
                  register={register}
                  style={{ background: colors.forminput, border: "none" }}
                  {...field}
                />
              )}
              name={`certification.${index}.title`}
              control={control}
            />

            <Controller
              render={({ field }) => (
                <FloatingLabelInput
                  label="Issued  By"
                  register={register}
                  style={{ background: colors.forminput, border: "none" }}
                  {...field}
                />
              )}
              name={`certification.${index}.issuedBy`}
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
              name={`certification.${index}.credentialId`}
              control={control}
            />

            <Controller
              render={({ field }) => (
                <FloatingLabelInput
                  label="Issued Date"
                  register={register}
                  type="date"
                  style={{ background: colors.forminput, border: "none" }}
                  {...field}
                />
              )}
              name={`certification.${index}.issuedDate`}
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
        leftIcon={<span color={colors.error}> + </span>}
        w="100%"
        size="sm"
        mb={8}
        onClick={() =>
          append({ title: "", issuedBy: "", credentialId: "", issuedDate: "" })
        }
      >
        Add Another Certification Detail
      </Button>
    </>
  );
};
