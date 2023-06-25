import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Box, SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import Select from "@nepMeds/components/Form/Select";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { ChangeEvent, useEffect, useState } from "react";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDeleteAcademicInfo } from "@nepMeds/service/nepmeds-academic";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";

export const AcademicInfoForm = ({
  doctorProfileData,
  isEditable,
}: {
  doctorProfileData?: IGetDoctorProfile;
  isEditable?: boolean;
}) => {
  const {
    control,
    register,
    getValues,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<IRegisterFields>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "academic",
  });

  const deleteAcademicInfoRegister = useDeleteAcademicInfo();
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

  const [selectedImages, setSelectedImages] = useState<
    Array<Array<File | string | null>>
  >([]);
  const [selectedImagesFile, setSelectedImagesFile] = useState<
    Array<Array<File | null>>
  >([]);

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
    imageIndex: number,
    academicIndex: number
  ) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const imageUrl = URL.createObjectURL(selectedFiles[0]);
      setSelectedImages(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages[academicIndex] = [
          ...(updatedImages[academicIndex] || []),
        ];
        updatedImages[academicIndex][imageIndex] = imageUrl;
        return updatedImages;
      });

      setSelectedImagesFile(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages[academicIndex] = [
          ...(updatedImages[academicIndex] || []),
        ];
        updatedImages[academicIndex][imageIndex] = selectedFiles[0];
        setValue(
          `academic.${academicIndex}.academic_documents.${imageIndex}`,
          selectedFiles[0]
        );

        return updatedImages;
      });
    }
  };
  console.log(selectedImages, selectedImagesFile);
  console.log(getValues("academic"));

  // generating year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, index) => {
    const year = currentYear - index;
    return {
      label: year.toString(),
      value: year.toString(),
    };
  });
  return (
    <>
      {fields.map((item, index) => {
        const academicIndex = index;
        const selectedImagesForAcademic = selectedImages[academicIndex] || [];

        const handleRemoveAcademic = async () => {
          if (watch(`academic.${index}.isSubmitted`)) {
            const academicInfoResponse =
              await deleteAcademicInfoRegister.mutateAsync(
                parseInt(getValues(`academic.${index}.id`))
              );

            if (academicInfoResponse) {
              toastSuccess("Academic data deleted successfully");
              remove(index);
            } else {
              toastFail("Failed to delete academic information!");
            }
          } else remove(index);

          // Remove corresponding files from selectedImagesFile state
          setSelectedImagesFile(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages.splice(academicIndex, 1);
            return updatedImages;
          });
        };
        return (
          <Box key={item.id} position="relative">
            <SimpleGrid gridTemplateColumns="1fr" mb={4}>
              <MultipleImageUpload
                selectedImages={selectedImagesForAcademic}
                setSelectedImages={images => {
                  setSelectedImages(prevImages => {
                    const updatedImages = [...prevImages];
                    updatedImages[academicIndex] = images;
                    return updatedImages;
                  });
                }}
                handleImageChange={(e, imageIndex) =>
                  handleImageChange(e, imageIndex, index)
                }
                name={`academic.${index}.academic_documents`}
                fieldValues={`academic.${index}.academic_documents`}
                uploadText="Upload Images"
                background="#F9FAFB"
                academicIndex={index}
                helperText={false}
              />
            </SimpleGrid>
            <SimpleGrid
              gridTemplateColumns={
                isEditable ? "repeat(2,1fr)" : "repeat(4,1fr)"
              }
              mb={8}
              gap={2}
            >
              <Controller
                render={({ field }) => (
                  <FloatingLabelInput
                    label="Degree"
                    required
                    register={register}
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                    rules={{
                      required: "Degree is required.",
                    }}
                    error={errors?.academic?.[index]?.degree_program?.message}
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
                    rules={{
                      required: "Major is required.",
                    }}
                    error={errors?.academic?.[index]?.major?.message}
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
                    rules={{
                      required: "College/University is required.",
                    }}
                    error={errors?.academic?.[index]?.university?.message}
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
                    defaultValue={"2023"}
                    register={register}
                    options={years}
                    {...field}
                    style={{
                      background: colors.forminput,
                      border: "none",
                      paddingTop: "15px",
                    }}
                    rules={{
                      required: "Graduation year is required.",
                    }}
                    error={errors?.academic?.[index]?.graduation_year?.message}
                  />
                )}
                name={`academic.${index}.graduation_year`}
                control={control}
              />
              <Button
                type="button"
                position={"absolute"}
                right="-15"
                top="150px"
                variant={"ghost"}
                _hover={{ background: "transparent" }}
                onClick={handleRemoveAcademic}
              >
                <Icon as={DeleteIcon} fontSize={28} color={colors.error} />
              </Button>
            </SimpleGrid>
          </Box>
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
        onClick={() => {
          append({
            id: "",
            doctor: 0,
            degree_program: "",
            major: "",
            university: "",
            graduation_year: "",
            academic_documents: undefined,
            isSubmitted: false,
          });
        }}
      >
        Add Another Academic Detail
      </Button>
    </>
  );
};
