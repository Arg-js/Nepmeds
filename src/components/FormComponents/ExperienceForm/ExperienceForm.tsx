import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Box, Flex, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import Checkbox from "@nepMeds/components/Form/Checkbox";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { colors } from "@nepMeds/theme/colors";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import { DeleteIcon } from "@chakra-ui/icons";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { getDayDifference } from "@nepMeds/helper/checkTimeRange";
import {
  useDeleteExperienceFile,
  useDeleteExperienceInfo,
} from "@nepMeds/service/nepmeds-experience";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";
import { AxiosError } from "axios";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";

export const ExperienceForm = ({
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
  const deleteExperienceInfo = useDeleteExperienceInfo();
  const deleteExperienceFile = useDeleteExperienceFile();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const mappedImageInfo =
    doctorProfileData?.doctor_experience.map(e =>
      e?.experience_document.map((e: any) => {
        return { url: getImageUrl(e?.file), id: e?.id };
      })
    ) ?? [];

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
          id: a.id?.toString(),
          isSubmitted: true,
          currently_working: a.currently_working,
          experience_documents: a?.experience_document,
        })),
      });
    }
  }, [doctorProfileData]);

  const [selectedImages, setSelectedImages] =
    useState<Array<Array<File | { url: string; id: string } | null>>>(
      mappedImageInfo
    );
  const [, setSelectedImagesFile] = useState<Array<Array<File | null>>>([]);

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
        updatedImages[experienceIndex][imageIndex] = { url: imageUrl, id: "0" };
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
    const daysCount = getDayDifference(
      new Date(toDate ?? ""),
      new Date(fromDate ?? "")
    );
    if (toDate)
      if (toDate > currentDate) {
        return "To cannot be greater than the current date.";
      } else if (toDate < fromDate) {
        return "To date cannot be less than from date";
      } else if (daysCount < 30) {
        return "Experience must be more than 1 month";
      }
    return true; // Return true if the validation passes
  };

  const handleRemoveExperience = async (index: number) => {
    if (watch(`experience.${index}.isSubmitted`)) {
      try {
        await deleteExperienceInfo.mutateAsync(
          parseInt(getValues(`experience.${index}.id`))
        );
        toastSuccess("Experience data deleted successfully");
        remove(index);
      } catch (error) {
        toastFail("Failed to delete experience information!");
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

  const handleDeleteFile = async (id: number) => {
    try {
      await deleteExperienceFile.mutateAsync(id);
    } catch (error) {
      const err = serverErrorResponse(error as AxiosError);
      toastFail(err);
    }
  };

  return (
    <>
      {fields.map((item, index) => {
        return (
          <Box key={item.id} position="relative">
            <SimpleGrid mb={4}>
              <MultipleImageUpload
                selectedImages={selectedImages[index] || []}
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
                name={`experience.${index}.experience_documents`}
                fieldValues={`experience.${index}.experience_documents`}
                uploadText="Upload Images"
                background="#F9FAFB"
                academicIndex={index}
                helperText={false}
                editMode={editMode ?? false}
                deleteFile={handleDeleteFile}
              />
            </SimpleGrid>

            <Grid
              gap={3}
              mb={3}
              // alignItems="flex-end"
              key={item.id}
              templateColumns="repeat(4, 1fr)"
            >
              <GridItem colSpan={{ base: 4, xl: 2 }}>
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
              <GridItem colSpan={{ base: 4, lg: 2, xl: 1 }}>
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

              {watch(`experience.${index}.currently_working`) !== true && (
                <GridItem colSpan={{ base: 4, lg: 2, xl: 1 }}>
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
                </GridItem>
              )}
            </Grid>
            <Box>
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
            </Box>
            <Flex my={4} alignItems={"center"} justifyContent={"space-between"}>
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

              <Icon
                type="button"
                cursor={"pointer"}
                as={DeleteIcon}
                onClick={() => handleRemoveExperience(index)}
                fontSize={28}
                color={colors.error}
              />
            </Flex>
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
            isSubmitted: false,
          });
        }}
      >
        Add Another experience Detail
      </Button>
    </>
  );
};
