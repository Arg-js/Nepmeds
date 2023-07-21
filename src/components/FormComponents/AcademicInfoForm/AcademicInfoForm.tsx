import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import Select from "@nepMeds/components/Form/Select";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useDeleteAcademicInfo } from "@nepMeds/service/nepmeds-academic";
import { useGetAllCollege } from "@nepMeds/service/nepmeds-core";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { colors } from "@nepMeds/theme/colors";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";

export const AcademicInfoForm = ({
  doctorProfileData,
  editMode,
}: {
  doctorProfileData?: IGetDoctorProfile;
  editMode?: boolean;
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

  const collegeInfo = useGetAllCollege();

  const collegeOptions =
    collegeInfo.data?.map(p => ({
      label: p.name,
      value: p.id,
    })) || [];

  const mappedImageInfo =
    doctorProfileData?.doctor_academic_info.map(e =>
      e?.academic_document.map((e: any) => getImageUrl(e.file))
    ) ?? [];

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
          degree_program: a?.degree_program,
          doctor: a?.doctor,
          major: a?.major,
          university: a.university_data?.toString(),
          id: a.id?.toString(),
          academic_documents: a?.academic_document,
          isSubmitted: true,
          graduation_year: a?.graduation_year?.toString(),
        })),
      });
    }
  }, [doctorProfileData, reset]);

  const [selectedImages, setSelectedImages] =
    useState<Array<Array<File | string | null>>>(mappedImageInfo);
  const [, setSelectedImagesFile] = useState<Array<Array<File | null>>>([]);
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
        // setValue(`academic.${academicIndex}.academic_documents`,selectedFiles[0])

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

  // generating year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, index) => {
    const year = currentYear - index;
    return {
      label: year.toString(),
      value: year.toString(),
    };
  });

  const handleRemoveAcademic = async (index: number) => {
    if (watch(`academic.${index}.isSubmitted`)) {
      const academicInfoResponse = await deleteAcademicInfoRegister.mutateAsync(
        parseInt(getValues(`academic.${index}.id`))
      );

      if (academicInfoResponse) {
        toastSuccess("Academic data deleted successfully");
        remove(index);
      } else {
        toastFail("Failed to delete academic information!");
      }
    } else {
      remove(index);
    }

    // Remove corresponding files from selectedImagesFile state
    setSelectedImagesFile(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });

    setSelectedImages(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <>
      {fields.map((item, index) => {
        return (
          <Box key={item.id} position="relative">
            <Box mb={4}>
              <MultipleImageUpload
                selectedImages={selectedImages[index] ?? []}
                setSelectedImages={images => {
                  setSelectedImages(prevImages => {
                    const updatedImages = [...prevImages];
                    updatedImages[index] = images;
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
                editMode={editMode ?? false}
              />
            </Box>
            <SimpleGrid
              mb={8}
              gap={2}
              columns={{ base: 1, md: 1, lg: 2, xl: 4 }}
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
                  <Select
                    required
                    placeholder="Select College/University"
                    label="College/ University"
                    register={register}
                    options={collegeOptions}
                    {...field}
                    style={{
                      background: colors.forminput,
                      border: "none",
                      paddingTop: "15px",
                    }}
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
                onClick={() => handleRemoveAcademic(index)}
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
            graduation_year: "2023",
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
