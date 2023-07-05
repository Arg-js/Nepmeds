import { Box, SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import Select from "@nepMeds/components/Form/Select";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";
import { colors } from "@nepMeds/theme/colors";
import { years } from "@nepMeds/utils/choices";
import { ChangeEvent, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const AddAcademicField = ({ index }: { index?: number }) => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<IRegisterFields>();

  const [selectedImages, setSelectedImages] = useState<
    Array<Array<File | string | null>>
  >([]);
  const [selectedImagesFile, setSelectedImagesFile] = useState<
    Array<Array<File | null>>
  >([]);
  console.log(selectedImagesFile);

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
  const academicIndex = index !== undefined ? index : 0;
  const selectedImagesForAcademic = selectedImages[academicIndex] || [];
  console.log(academicIndex);

  return (
    <Box position="relative">
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
            handleImageChange(e, imageIndex, academicIndex)
          }
          name={`academic.${academicIndex}.academic_documents`}
          fieldValues={`academic.${academicIndex}.academic_documents`}
          uploadText="Upload Images"
          background="#F9FAFB"
          academicIndex={academicIndex}
          helperText={false}
          editMode={false}
        />
      </SimpleGrid>
      <SimpleGrid gridTemplateColumns={"repeat(2,1fr)"} mb={8} gap={2}>
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
            />
          )}
          name={`academic.${academicIndex}.degree_program`}
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
              error={errors?.academic?.[academicIndex]?.major?.message}
              style={{ background: colors.forminput, border: "none" }}
              {...field}
            />
          )}
          name={`academic.${academicIndex}.major`}
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
              error={errors?.academic?.[academicIndex]?.university?.message}
            />
          )}
          name={`academic.${academicIndex}.university`}
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
              error={
                errors?.academic?.[academicIndex]?.graduation_year?.message
              }
            />
          )}
          name={`academic.${academicIndex}.graduation_year`}
          control={control}
        />
      </SimpleGrid>
    </Box>
  );
};

export default AddAcademicField;
