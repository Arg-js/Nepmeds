import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import Checkbox from "@nepMeds/components/Form/Checkbox";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import Select from "@nepMeds/components/Form/Select";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";
import { useGetAllHospital } from "@nepMeds/service/nepmeds-hospital-list";
import { colors } from "@nepMeds/theme/colors";
import { ChangeEvent, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const AddExperienceField = ({ index }: { index?: number }) => {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<IRegisterFields>();

  const [selectedImages, setSelectedImages] = useState<
    Array<Array<File | { url: string; id: string } | null>>
  >([]);
  const [, setSelectedImagesFile] = useState<Array<Array<File | null>>>([]);

  const { data: hospitalList } = useGetAllHospital();

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
    imageIndex: number,
    experienceIndex: number
  ) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const imageUrl = URL.createObjectURL(selectedFiles[0]);
      setSelectedImages(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages[experienceIndex] = [
          ...(updatedImages[experienceIndex] || [])
        ];
        updatedImages[experienceIndex][imageIndex] = { url: imageUrl, id: "0" };
        return updatedImages;
      });

      setSelectedImagesFile(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages[experienceIndex] = [
          ...(updatedImages[experienceIndex] || [])
        ];
        updatedImages[experienceIndex][imageIndex] = selectedFiles[0];
        setValue(
          `experience.${experienceIndex}.experience_documents.${imageIndex}`,
          selectedFiles[0]
        );

        return updatedImages;
      });
    }
  };
  const experienceIndex = index !== undefined ? index : 0;
  const selectedImagesForExperience = selectedImages[experienceIndex] || [];
  return (
    <Box position="relative">
      <SimpleGrid gridTemplateColumns="1fr" mb={4}>
        <MultipleImageUpload
          selectedImages={selectedImagesForExperience}
          setSelectedImages={images => {
            setSelectedImages(prevImages => {
              const updatedImages = [...prevImages];
              updatedImages[experienceIndex] = images;
              return updatedImages;
            });
          }}
          handleImageChange={(e, imageIndex) =>
            handleImageChange(e, imageIndex, experienceIndex)
          }
          name={`experience.${index}.experience_documents`}
          fieldValues={`experience.${index}.experience_documents`}
          uploadText="Upload Images"
          background="#F9FAFB"
          academicIndex={experienceIndex}
          helperText={false}
          editMode={false}
        />
      </SimpleGrid>
      <Grid
        templateColumns="repeat(4,1fr)"
        gap={3}
        mb={3}
        alignItems="flex-end"
        w="100%"
      >
        <GridItem colSpan={4}>
          <Controller
            render={({ field }) => (
              <Select
                placeholder=""
                label="Hospital/ Clinic Name"
                register={register}
                options={hospitalList ?? []}
                required
                style={{
                  background: colors.forminput,
                  border: "none",
                  paddingTop: "15px"
                }}
                rules={{
                  required: "Hospital/ Clinic name is required."
                }}
                {...field}
              />
            )}
            name={`experience.${experienceIndex}.hospital`}
            control={control}
          />
        </GridItem>

        <GridItem colSpan={2}>
          <Controller
            render={({ field }) => (
              <FloatingLabelInput
                label="From"
                required
                register={register}
                type="date"
                style={{ background: colors.forminput, border: "none" }}
                {...field}
                rules={{
                  required: "From date is required."
                }}
                error={
                  errors?.experience?.[experienceIndex]?.from_date?.message
                }
              />
            )}
            name={`experience.${experienceIndex}.from_date`}
            control={control}
          />
        </GridItem>
        <GridItem colSpan={2}>
          {watch(`experience.${experienceIndex}.currently_working`) !==
            true && (
            <Controller
              render={({ field }) => (
                <FloatingLabelInput
                  label="To"
                  required
                  register={register}
                  type="date"
                  style={{ background: colors.forminput, border: "none" }}
                  {...field}
                  rules={{
                    required: "To date is required."
                  }}
                  error={
                    errors?.experience?.[experienceIndex]?.to_date?.message
                  }
                />
              )}
              name={`experience.${experienceIndex}.to_date`}
              control={control}
            />
          )}
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
                  padding: "17px"
                }}
                {...field}
                rules={{
                  required: "Description is required."
                }}
                error={
                  errors?.experience?.[experienceIndex]?.description?.message
                }
              />
            )}
            name={`experience.${experienceIndex}.description`}
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
            name={`experience.${experienceIndex}.currently_working`}
            control={control}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AddExperienceField;
