import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Grid, GridItem } from "@chakra-ui/layout";
import Checkbox from "@nepMeds/components/Form/Checkbox";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import { colors } from "@nepMeds/theme/colors";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Delete } from "react-iconly";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
export const ExperienceForm = () => {
  const { control, register, setValue } = useFormContext<IRegisterFields>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <>
      {fields.map((item, index) => {
        return (
          <Grid
            templateColumns="repeat(4,1fr)"
            gap={6}
            alignItems="flex-end"
            key={item.id}
            mb={6}
          >
            <GridItem colSpan={2}>
              <Controller
                render={({ field }) => (
                  <FloatingLabelInput
                    label="Hospital/ Clinic Name"
                    register={register}
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                  />
                )}
                name={`experience.${index}.hospital`}
                control={control}
              />
            </GridItem>

            <GridItem>
              <Controller
                render={({ field }) => (
                  <FloatingLabelInput
                    label="From"
                    register={register}
                    type="date"
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                  />
                )}
                name={`experience.${index}.from_date`}
                control={control}
              />
            </GridItem>
            <GridItem>
              <Controller
                render={({ field }) => (
                  <FloatingLabelInput
                    label="To"
                    register={register}
                    type="date"
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                  />
                )}
                name={`experience.${index}.to_date`}
                control={control}
              />
            </GridItem>
            <GridItem colSpan={4}>
              <Controller
                render={({ field }) => (
                  <FloatinglabelTextArea
                    label="Description"
                    register={register}
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                  />
                )}
                name={`experience.${index}.description`}
                control={control}
              />
            </GridItem>
            <GridItem>
              <Controller
                render={({ field: { value, ...fieldValues } }) => (
                  <Checkbox
                    label="Currently working here"
                    control={control}
                    {...fieldValues}
                    checked={value}
                  />
                )}
                name={`experience.${index}.currently_working`}
                control={control}
              />
            </GridItem>
            <GridItem>
              <Controller
                render={({ field: { value, ...otherFields } }) => (
                  <FloatingLabelInput
                    type="file"
                    register={register}
                    label="Upload File"
                    {...otherFields}
                    onChange={e =>
                      setValue(`experience.${index}.file`, e.target.files?.[0])
                    }
                  />
                )}
                name={`experience.${index}.file`}
                control={control}
              />
            </GridItem>
            <GridItem gridColumn={4}>
              <Button type="button" onClick={() => remove(index)}>
                <Icon as={Delete} fontSize={20} color={colors.error} />
              </Button>
            </GridItem>
          </Grid>
        );
      })}
      <Button
        variant="outline"
        size="sm"
        color={colors.primary}
        borderColor={colors.primary}
        leftIcon={<span color={colors.error}> + </span>}
        fontWeight={400}
        w="100%"
        mb={8}
        onClick={() =>
          append({
            doctor: 0,
            hospital: "",
            description: "",
            from_date: "",
            to_date: "",
            currently_working: false,
            file: undefined as File | undefined,
          })
        }
      >
        Add Another experience Detail
      </Button>
    </>
  );
};
