import { Box, SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";
import { colors } from "@nepMeds/theme/colors";
import { ChangeEvent, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const AddCertificateField = ({ index }: { index?: number }) => {
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
    certificateIndex: number
  ) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const imageUrl = URL.createObjectURL(selectedFiles[0]);
      setSelectedImages(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages[certificateIndex] = [
          ...(updatedImages[certificateIndex] || []),
        ];
        updatedImages[certificateIndex][imageIndex] = imageUrl;
        return updatedImages;
      });

      setSelectedImagesFile(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages[certificateIndex] = [
          ...(updatedImages[certificateIndex] || []),
        ];
        updatedImages[certificateIndex][imageIndex] = selectedFiles[0];
        setValue(
          `certification.${certificateIndex}.certificate_documents.${imageIndex}`,
          selectedFiles[0]
        );

        return updatedImages;
      });
    }
  };
  const certificateIndex = index !== undefined ? index : 0;
  const selectedImagesForCertificate = selectedImages[certificateIndex] || [];
  console.log(certificateIndex);
  return (
    <Box position="relative">
      <SimpleGrid gridTemplateColumns="1fr" mb={4}>
        <MultipleImageUpload
          selectedImages={selectedImagesForCertificate}
          setSelectedImages={images => {
            setSelectedImages(prevImages => {
              const updatedImages = [...prevImages];
              updatedImages[certificateIndex] = images;
              return updatedImages;
            });
          }}
          handleImageChange={(e, imageIndex) =>
            handleImageChange(e, imageIndex, certificateIndex)
          }
          name={`certification.${certificateIndex}.certificate_documents`}
          fieldValues={`certification.${certificateIndex}.certificate_documents`}
          uploadText="Upload Images"
          background="#F9FAFB"
          academicIndex={certificateIndex}
          helperText={false}
          editMode={false}
        />
      </SimpleGrid>
      <SimpleGrid gridTemplateColumns={"repeat(2,1fr)"} mb={8} gap={2}>
        <Controller
          render={({ field }) => (
            <FloatingLabelInput
              label="Title"
              required
              register={register}
              style={{ background: colors.forminput, border: "none" }}
              {...field}
              rules={{
                required: "Title is required.",
              }}
              error={errors?.certification?.[certificateIndex]?.title?.message}
            />
          )}
          name={`certification.${certificateIndex}.title`}
          control={control}
        />

        <Controller
          render={({ field }) => (
            <FloatingLabelInput
              required
              label="Issued By"
              register={register}
              rules={{
                required: "Issued by is required.",
              }}
              error={
                errors?.certification?.[certificateIndex]?.issued_by?.message
              }
              style={{ background: colors.forminput, border: "none" }}
              {...field}
            />
          )}
          name={`certification.${certificateIndex}.issued_by`}
          control={control}
        />

        <Controller
          render={({ field }) => (
            <FloatingLabelInput
              required
              label="Credential ID"
              register={register}
              style={{ background: colors.forminput, border: "none" }}
              {...field}
              rules={{
                required: "Credential Id is required.",
              }}
              error={
                errors?.certification?.[certificateIndex]?.certificate_number
                  ?.message
              }
            />
          )}
          name={`certification.${certificateIndex}.certificate_number`}
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
              rules={{
                required: "Issued date is required.",
              }}
              error={
                errors?.certification?.[certificateIndex]
                  ?.certificate_issued_date?.message
              }
            />
          )}
          name={`certification.${certificateIndex}.certificate_issued_date`}
          control={control}
        />
      </SimpleGrid>
    </Box>
  );
};

export default AddCertificateField;
