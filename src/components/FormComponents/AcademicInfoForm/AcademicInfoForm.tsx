import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Delete } from "react-iconly";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import Select from "@nepMeds/components/Form/Select";
import { year } from "@nepMeds/utils/choices";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { useEffect } from "react";

export const AcademicInfoForm = ({
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
    name: "academic",
  });

  useEffect(() => {
    if (doctorProfileData?.doctor_academic_info.length) {
      reset({
        ...getValues(),
        academic: doctorProfileData?.doctor_academic_info.map(a => ({
          degree_program: a.degree_program,
          doctor: a.doctor,
          major: a.major,
          university: a.university,
          graduation_year: a.graduation_year?.toString(),
        })),
      });
    }
  }, [doctorProfileData, reset]);

  return (
    <>
      {fields.map((item, index) => {
        return (
          <>
            <SimpleGrid
              mb={4}
              key={item.id}
              gridTemplateColumns={
                isEditable ? "repeat(2,1fr)" : "repeat(4,1fr)"
              }
              gap={3}
            >
              <Controller
                render={({ field }) => (
                  <FloatingLabelInput
                    label="Degree"
                    required
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
                    required
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
                    required
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
                    required
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
            </SimpleGrid>
            <SimpleGrid
              gridTemplateColumns="1fr 50px"
              width="100%"
              gap={3}
              mb={8}
            >
              <Controller
                render={({ field: { value, onChange, ...otherFields } }) => (
                  <FloatingLabelInput
                    label="Upload Document"
                    register={register}
                    type="file"
                    required
                    style={{ background: colors.forminput, border: "none" }}
                    {...otherFields}
                    onChange={e => {
                      onChange(e.target.files?.[0]);
                    }}
                  />
                )}
                name={`academic.${index}.file`}
                control={control}
              />
              <Button type="button" onClick={() => remove(index)} w="auto">
                <Icon as={Delete} fontSize={20} color={colors.error} />
              </Button>
            </SimpleGrid>
          </>
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
