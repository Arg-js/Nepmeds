import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Delete, Edit } from "react-iconly";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { ChangeEvent, useEffect, useState } from "react";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import Checkbox from "@nepMeds/components/Form/Checkbox";
import {
  useExperienceFileRegister,
  useExperienceInfoRegister,
  useUpdateExperienceInfo,
} from "@nepMeds/service/nepmeds-experience";
import { toastSuccess } from "@nepMeds/components/Toast";
import { toastFail } from "@nepMeds/service/service-toast";
import { AxiosError } from "axios";
import { CheckIcon } from "@chakra-ui/icons";

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

  const experienceInfoRegister = useExperienceInfoRegister();
  const experienceFileRegister = useExperienceFileRegister();
  const updateExperienceFileRegister = useUpdateExperienceInfo();

  const handleSubmitExperienceData = async () => {
    const index = getValues("experience").length - 1;

    try {
      if (getValues(`experience.${index}.isSubmitted`) !== true) {
        const experienceData = {
          doctor: getValues("doctor_id"),
          hospital: getValues(`experience.${index}.hospital`),
          description: getValues(`experience.${index}.description`),
          currently_working: getValues(`experience.${index}.currently_working`),
          from_date: getValues(`experience.${index}.from_date`),
          to_date: getValues(`experience.${index}.to_date`),
          experience_documents: getValues(
            `experience.${index}.experience_documents`
          ),
          id: "",
          editMode: false,
          submitMode: false,
          isSubmitted: false,
        };
        const createExperienceFileResponse =
          await experienceFileRegister.mutateAsync(experienceData);

        if (createExperienceFileResponse) {
          const experienceInfoData = {
            ...experienceData,
            experience_documents: createExperienceFileResponse.data.data.map(
              (file: string) => ({
                file: file,
              })
            ),
          };
          const experienceInfoResponse =
            await experienceInfoRegister.mutateAsync(experienceInfoData);
          if (experienceInfoResponse) {
            toastSuccess("Experience data updated successfully");
            setValue(
              `experience.${index}.id`,
              experienceInfoResponse?.data?.data?.id
            );
            setValue(`experience.${index}.isSubmitted`, true);

            setValue(`experience.${index}.editMode`, true);
            setValue(`experience.${index}.submitMode`, false);
          } else {
            toastFail("Failed to add experience information!");
          }
        } else {
          toastFail("Failed to upload experience files!");
        }
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toastFail(
        err?.response?.data?.message || "Failed to add experience information!"
      );
    }
  };

  const handleEditData = async (index: number, id: string) => {
    try {
      const experienceData = {
        doctor: getValues("doctor_id"),
        hospital: getValues(`experience.${index}.hospital`),
        description: getValues(`experience.${index}.description`),
        currently_working: getValues(`experience.${index}.currently_working`),
        from_date: getValues(`experience.${index}.from_date`),
        to_date: getValues(`experience.${index}.to_date`),
        experience_documents: getValues(
          `experience.${index}.experience_documents`
        ),
        id: "",
        editMode: false,
        submitMode: false,
        isSubmitted: false,
      };
      const createExperienceFileResponse =
        await experienceFileRegister.mutateAsync(experienceData);

      if (createExperienceFileResponse) {
        const experienceInfoData = {
          ...experienceData,
          experience_documents: createExperienceFileResponse.data.data.map(
            (file: string) => ({
              file: file,
            })
          ),
        };
        const experienceInfoResponse =
          await updateExperienceFileRegister.mutateAsync({
            id: parseInt(id),
            data: experienceInfoData,
          });
        if (experienceInfoResponse) {
          toastSuccess("Experience data updated successfully");
        } else {
          toastFail("Failed to add experience information!");
        }
      } else {
        toastFail("Faield to upload experience files!");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toastFail(
        err?.response?.data?.message || "Failed to add experience information!"
      );
    }
  };

  return (
    <>
      {fields.map((item, index) => {
        const experienceIndex = index;
        const selectedImagesForExperience =
          selectedImages[experienceIndex] || [];

        const handleRemoveAcademic = () => {
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
                      isDisabled={getValues(`experience.${index}.editMode`)}
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
                      isDisabled={getValues(`experience.${index}.editMode`)}
                      style={{ background: colors.forminput, border: "none" }}
                      {...field}
                      rules={{
                        required: "From date is required.",
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
                        isDisabled={getValues(`experience.${index}.editMode`)}
                        register={register}
                        type="date"
                        style={{ background: colors.forminput, border: "none" }}
                        {...field}
                        rules={{
                          required: "To date is required.",
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
                      isDisabled={getValues(`experience.${index}.editMode`)}
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
                      isDisabled={getValues(`experience.${index}.editMode`)}
                      checked={value}
                    />
                  )}
                  name={`experience.${index}.currently_working`}
                  control={control}
                />
              </GridItem>
              <Button
                type="button"
                position={"absolute"}
                bottom={"0"}
                right="-15"
                onClick={handleRemoveAcademic}
              >
                <Icon as={Delete} fontSize={18} color={colors.error} />
              </Button>
              {watch(`experience.${index}.editMode`) && (
                <Button
                  type="button"
                  position={"absolute"}
                  bottom={"14"}
                  right="-15"
                  // Edit button props...
                  onClick={() => {
                    setValue(`experience.${index}.submitMode`, true);
                    setValue(`experience.${index}.editMode`, false);
                  }}
                >
                  <Icon as={Edit} fontSize={18} color={colors.error} />
                </Button>
              )}
              {watch(`experience.${index}.submitMode`) && (
                <Button
                  type="button"
                  position={"absolute"}
                  bottom={"14"}
                  right="-15"
                  // Submit button props...
                  onClick={() => {
                    handleEditData(index, getValues(`experience.${index}.id`));
                    setValue(`experience.${index}.submitMode`, false);
                    setValue(`experience.${index}.editMode`, true);
                  }}
                >
                  <Icon as={CheckIcon} fontSize={18} color={colors.error} />
                </Button>
              )}
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
        onClick={async () => {
          await handleSubmitExperienceData();
          append({
            doctor: 0,
            hospital: "",
            description: "",
            from_date: "",
            to_date: "",
            currently_working: false,
            experience_documents: undefined,
            id: "",
            editMode: false,
            submitMode: false,
            isSubmitted: false,
          });
        }}
      >
        Add Another experience Detail
      </Button>
    </>
  );
};
