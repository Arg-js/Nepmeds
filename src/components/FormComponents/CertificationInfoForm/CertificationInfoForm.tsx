import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Delete } from "react-iconly";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
export const CertificationInfoForm = () => {
  const { control, register, setValue } = useFormContext<IRegisterFields>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certification",
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
                name={`certification.${index}.issued_by`}
                control={control}
              />

              <Controller
                render={({ field }) => (
                  <FloatingLabelInput
                    label="Credential ID"
                    register={register}
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                  />
                )}
                name={`certification.${index}.certificate_number`}
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
                name={`certification.${index}.certificate_issued_date`}
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
                    onChange={e => {
                      setValue(
                        `certification.${index}.file`,
                        e.target.files?.[0]
                      );
                    }}
                  />
                )}
                name={`certification.${index}.file`}
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
        fontWeight={400}
        color={colors.primary}
        borderColor={colors.primary}
        leftIcon={<span color={colors.error}> + </span>}
        w="100%"
        size="sm"
        mb={8}
        onClick={() =>
          append({
            doctor: 0,
            title: "",
            issued_by: "",
            certificate_number: "",
            certificate_issued_date: "",
            file: undefined,
          })
        }
      >
        Add Another Certification Detail
      </Button>
    </>
  );
};
