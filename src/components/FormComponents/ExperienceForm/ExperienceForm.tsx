import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Grid, GridItem } from "@chakra-ui/layout";
import Checkbox from "@nepMeds/components/Form/Checkbox";
import Input from "@nepMeds/components/Form/Input";
import TextArea from "@nepMeds/components/Form/TextArea";
import { colors } from "@nepMeds/theme/colors";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Delete } from "react-iconly";
export const ExperienceForm = () => {
  const { control, register } = useForm({
    defaultValues: {
      experience: [
        { name: "", from: "", to: "", description: "", currentWorking: false },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });
  return (
    <form style={{ width: "100%" }}>
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
                  <Input
                    label="Hospital/ Clinic Name"
                    register={register}
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                  />
                )}
                name={`experience.${index}.name`}
                control={control}
              />
            </GridItem>

            <GridItem>
              <Controller
                render={({ field }) => (
                  <Input
                    label="From"
                    register={register}
                    type="date"
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                  />
                )}
                name={`experience.${index}.from`}
                control={control}
              />
            </GridItem>
            <GridItem>
              <Controller
                render={({ field }) => (
                  <Input
                    label="To"
                    register={register}
                    type="date"
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                  />
                )}
                name={`experience.${index}.to`}
                control={control}
              />
            </GridItem>
            <GridItem colSpan={4}>
              <Controller
                render={({ field }) => (
                  <TextArea
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
                name={`experience.${index}.currentWorking`}
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
        color={colors.primary}
        borderColor={colors.primary}
        leftIcon={<span color={colors.error}> + </span>}
        fontWeight={400}
        w="100%"
        onClick={() =>
          append({
            name: "",
            from: "",
            to: "",
            description: "",
            currentWorking: false,
          })
        }
      >
        Add Another experience Detail
      </Button>
    </form>
  );
};
