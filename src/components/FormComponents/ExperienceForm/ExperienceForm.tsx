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
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { useEffect } from "react";
export const ExperienceForm = ({
  doctorProfileData,
  isEditable,
}: {
  doctorProfileData?: IGetDoctorProfile;
  isEditable?: boolean;
}) => {
  const { control, register, getValues, reset } =
    useFormContext<IRegisterFields>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });
  useEffect(() => {
    if (doctorProfileData?.doctor_experience?.length) {
      reset({
        ...getValues(),
        experience: doctorProfileData?.doctor_experience?.map(a => ({
          hospital: a.hospital,
          doctor: a.doctor,
          description: a.description,
          from_date: a.from_date,
          to_date: a.to_date,
          currently_working: a.currently_working,
        })),
      });
    }
  }, [doctorProfileData]);

  return (
    <>
      {fields.map((item, index) => {
        return (
          <Grid
            templateColumns="repeat(4,1fr)"
            gap={3}
            mb={3}
            alignItems="flex-end"
            key={item.id}
            w="100%"
          >
            <GridItem colSpan={isEditable ? 4 : 2}>
              <Controller
                render={({ field }) => (
                  <FloatingLabelInput
                    label="Hospital/ Clinic Name"
                    register={register}
                    required
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                  />
                )}
                name={`experience.${index}.hospital`}
                control={control}
              />
            </GridItem>

            <GridItem colSpan={isEditable ? 2 : 1}>
              <Controller
                render={({ field }) => (
                  <FloatingLabelInput
                    label="From"
                    required
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
            <GridItem colSpan={isEditable ? 2 : 1}>
              <Controller
                render={({ field }) => (
                  <FloatingLabelInput
                    label="To"
                    required
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
                    required
                    style={{
                      background: colors.forminput,
                      border: "none",
                      padding: "17px",
                    }}
                    {...field}
                  />
                )}
                name={`experience.${index}.description`}
                control={control}
              />
            </GridItem>
            <GridItem colSpan={4}>
              <Controller
                render={({ field: { value, onChange, ...otherFields } }) => (
                  <FloatingLabelInput
                    type="file"
                    required
                    register={register}
                    label="Upload File"
                    {...otherFields}
                    onChange={e => {
                      onChange(e.target.files?.[0]);
                    }}
                  />
                )}
                name={`experience.${index}.file`}
                control={control}
              />
            </GridItem>
            <GridItem colSpan={3}>
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

            <GridItem colSpan={1} justifyContent="flex-end" display="grid">
              <Button type="button" onClick={() => remove(index)} w="auto">
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
