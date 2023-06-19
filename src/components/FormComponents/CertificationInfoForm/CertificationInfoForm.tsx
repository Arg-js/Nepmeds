import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Delete } from "react-iconly";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { useEffect } from "react";
export const CertificationInfoForm = ({
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
    name: "certification",
  });
  useEffect(() => {
    if (doctorProfileData?.doctor_certification_info?.length) {
      reset({
        ...getValues(),
        certification: doctorProfileData?.doctor_certification_info.map(a => ({
          certificate_issued_date: a.certificate_issued_date,
          doctor: a.doctor,
          certificate_number: a.certificate_number,
          title: a.title,
          issued_by: a.issued_by,
        })),
      });
    }
  }, [doctorProfileData]);
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
                    label="Title"
                    required
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
                    required
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
                    required
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
                    required
                    register={register}
                    type="date"
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                  />
                )}
                name={`certification.${index}.certificate_issued_date`}
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
                    required
                    register={register}
                    type="file"
                    style={{ background: colors.forminput, border: "none" }}
                    {...otherFields}
                    onChange={e => {
                      onChange(e.target.files?.[0]);
                    }}
                  />
                )}
                name={`certification.${index}.file`}
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
