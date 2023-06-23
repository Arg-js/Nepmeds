import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { ChangeEvent, useEffect, useState } from "react";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import Checkbox from "@nepMeds/components/Form/Checkbox";

import { DeleteIcon } from "@chakra-ui/icons";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";

export const ExperienceForm = ({
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

  const [selectedImages, setSelectedImages] = useState<
    Array<Array<File | string | null>>
  >([]);
  const [selectedImagesFile, setSelectedImagesFile] = useState<
    Array<Array<File | null>>
  >([]);

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
          ...(updatedImages[experienceIndex] || []),
        ];
        updatedImages[experienceIndex][imageIndex] = imageUrl;
        return updatedImages;
      });

      setSelectedImagesFile(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages[experienceIndex] = [
          ...(updatedImages[experienceIndex] || []),
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
  console.log(selectedImages, selectedImagesFile);
  console.log(getValues("experience"));

  const validateFromDate = (index: number) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in ISO format (YYYY-MM-DD)
    const fromDate = getValues(`experience.${index}.from_date`);
    if (fromDate > currentDate) {
      return "From cannot be greater than the current date.";
    }

    return true; // Return true if the validation passes
  };

  const validateToDate = (index: number) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in ISO format (YYYY-MM-DD)
    const toDate = getValues(`experience.${index}.to_date`);
    const fromDate = getValues(`experience.${index}.from_date`);
    if (toDate > currentDate) {
      return "To cannot be greater than the current date.";
    } else if (toDate < fromDate) {
      return "To date cannot be less than from date";
    }
    return true; // Return true if the validation passes
  };

  return (
    <>
      {fields.map((item, index) => {
        const experienceIndex = index;
        const selectedImagesForExperience =
          selectedImages[experienceIndex] || [];

        const handleRemoveExperience = async () => {
          remove(index);

          // Remove corresponding files from selectedImagesFile state
          setSelectedImagesFile(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages.splice(experienceIndex, 1);
            return updatedImages;
          });
        };
        return (
          <Box key={item.id} position="relative">
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
                  handleImageChange(e, imageIndex, index)
                }
                name={`experience.${index}.experience_documents`}
                fieldValues={`experience.${index}.experience_documents`}
                uploadText="Upload Images"
                background="#F9FAFB"
                academicIndex={index}
                helperText={false}
              />
            </SimpleGrid>
            <Grid
              templateColumns="repeat(4,1fr)"
              gap={3}
              mb={3}
              // alignItems="flex-end"
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
                      rules={{
                        required: "Hospital/Clinic name is required.",
                      }}
                      error={errors?.experience?.[index]?.hospital?.message}
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
                      rules={{
                        required: "From date is required.",
                        validate: () => validateFromDate(index),
                      }}
                      error={errors?.experience?.[index]?.from_date?.message}
                    />
                  )}
                  name={`experience.${index}.from_date`}
                  control={control}
                />
              </GridItem>
              <GridItem colSpan={isEditable ? 2 : 1}>
                {watch(`experience.${index}.currently_working`) !== true && (
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
                          required: "To date is required.",
                          validate: () => validateToDate(index),
                        }}
                        error={errors?.experience?.[index]?.to_date?.message}
                      />
                    )}
                    name={`experience.${index}.to_date`}
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
                        padding: "17px",
                      }}
                      {...field}
                      rules={{
                        required: "Description is required.",
                      }}
                      error={errors?.experience?.[index]?.description?.message}
                    />
                  )}
                  name={`experience.${index}.description`}
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
                <Button
                  type="button"
                  position={"absolute"}
                  right="-5"
                  top="400px"
                  variant={"ghost"}
                  _hover={{ background: "transparent" }}
                  onClick={handleRemoveExperience}
                >
                  <Icon as={DeleteIcon} fontSize={28} color={colors.error} />
                </Button>
              </GridItem>
            </Grid>
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
            doctor: 0,
            hospital: "",
            description: "",
            from_date: "",
            to_date: "",
            currently_working: false,
            experience_documents: undefined,
            id: "",
          });
        }}
      >
        Add Another experience Detail
      </Button>
    </>
  );
};
