import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Box, SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Delete } from "react-iconly";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import Select from "@nepMeds/components/Form/Select";
import { year } from "@nepMeds/utils/choices";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { ChangeEvent, useEffect, useState } from "react";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  useAcademicFileRegister,
  useAcademicInfoRegister,
} from "@nepMeds/service/nepmeds-academic";
import { AxiosError } from "axios";

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
    setValue,
    formState: { errors },
  } = useFormContext<IRegisterFields>();
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

  const academicInfoRegister = useAcademicInfoRegister();
  const academicFileRegister = useAcademicFileRegister();

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
          `academic.${academicIndex}.academic_document.${imageIndex}`,
          selectedFiles[0]
        );

        return updatedImages;
      });
    }
  };
  console.log(selectedImages, selectedImagesFile);
  console.log(getValues("academic"));

  const handleSendAcademic = async () => {
    try {
      const lastValue = getValues("academic").length - 1;

      const academicData = {
        degree_program: getValues(`academic.${lastValue}.degree_program`),
        graduation_year: getValues(`academic.${lastValue}.graduation_year`),
        university: getValues(`academic.${lastValue}.university`),
        major: getValues(`academic.${lastValue}.major`),
        doctor: getValues("doctor_id"),
        academic_document: getValues(`academic.${lastValue}.academic_document`),
      };

      const createAcademicFileResponse = await academicFileRegister.mutateAsync(
        academicData
      );

      if (createAcademicFileResponse) {
        const academicInfoData = {
          ...academicData,
          academic_document: createAcademicFileResponse.data.data.map(
            (file: string) => ({
              file: file,
            })
          ),
        };
        const academicInfoResponse = await academicInfoRegister.mutateAsync(
          academicInfoData
        );

        if (academicInfoResponse) {
          toastSuccess("Academic Information updated");
        } else {
          toastFail("Failed to add academic information!");
        }
      } else {
        toastFail("Failed to upload academic files!");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toastFail(
        err?.response?.data?.message || "Failed to add academic information!"
      );
    }
  };
  return (
    <>
      {fields.map((item, index) => {
        const academicIndex = index;
        const selectedImagesForAcademic = selectedImages[academicIndex] || [];

        const handleRemoveAcademic = () => {
          remove(index);

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
                name={`academic.${index}.academic_document`}
                fieldValues={`academic.${index}.academic_document`}
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
                    register={register}
                    options={year}
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
            </SimpleGrid>
            <Button
              type="button"
              position={"absolute"}
              bottom={"0"}
              right="-15"
              onClick={handleRemoveAcademic}
            >
              <Icon as={Delete} fontSize={18} color={colors.error} />
            </Button>
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
          await handleSendAcademic();
          append({
            doctor: 0,
            degree_program: "",
            major: "",
            university: "",
            graduation_year: "",
            academic_document: undefined,
          });
        }}
      >
        Add Another Academic Detail
      </Button>
    </>
  );
};
