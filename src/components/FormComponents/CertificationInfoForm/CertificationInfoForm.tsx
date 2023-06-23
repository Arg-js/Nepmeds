import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Box, SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { ChangeEvent, useEffect, useState } from "react";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";

import { DeleteIcon } from "@chakra-ui/icons";

export const CertificationInfoForm = ({
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

  const [selectedImages, setSelectedImages] = useState<
    Array<Array<File | string | null>>
  >([]);
  const [selectedImagesFile, setSelectedImagesFile] = useState<
    Array<Array<File | null>>
  >([]);

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
  console.log(selectedImages, selectedImagesFile);
  console.log(getValues("certification"));

  const validateIssuedDate = (index: number) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in ISO format (YYYY-MM-DD)
    const issuedDate = getValues(
      `certification.${index}.certificate_issued_date`
    );
    if (issuedDate > currentDate) {
      return "Issued date cannot be greater than the current date.";
    }

    return true; // Return true if the validation passes
  };
  return (
    <>
      {fields.map((item, index) => {
        const certificateIndex = index;
        const selectedImagesForCertification =
          selectedImages[certificateIndex] || [];

        const handleRemoveCertificate = async () => {
          remove(index);

          // Remove corresponding files from selectedImagesFile state
          setSelectedImagesFile(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages.splice(certificateIndex, 1);
            return updatedImages;
          });
        };
        return (
          <Box key={item.id} position="relative">
            <SimpleGrid gridTemplateColumns="1fr" mb={4}>
              <MultipleImageUpload
                selectedImages={selectedImagesForCertification}
                setSelectedImages={images => {
                  setSelectedImages(prevImages => {
                    const updatedImages = [...prevImages];
                    updatedImages[certificateIndex] = images;
                    return updatedImages;
                  });
                }}
                handleImageChange={(e, imageIndex) =>
                  handleImageChange(e, imageIndex, index)
                }
                name={`certification.${index}.certificate_documents`}
                fieldValues={`certification.${index}.certificate_documents`}
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
                    label="Title"
                    required
                    register={register}
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                    rules={{
                      required: "Title is required.",
                    }}
                    error={errors?.certification?.[index]?.title?.message}
                  />
                )}
                name={`certification.${index}.title`}
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
                    error={errors?.certification?.[index]?.issued_by?.message}
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
                    required
                    label="Credential ID"
                    register={register}
                    style={{ background: colors.forminput, border: "none" }}
                    {...field}
                    rules={{
                      required: "Credential Id is required.",
                    }}
                    error={
                      errors?.certification?.[index]?.certificate_number
                        ?.message
                    }
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
                    rules={{
                      required: "Issued date is required.",
                      validate: () => validateIssuedDate(index),
                    }}
                    error={
                      errors?.certification?.[index]?.certificate_issued_date
                        ?.message
                    }
                  />
                )}
                name={`certification.${index}.certificate_issued_date`}
                control={control}
              />
              <Button
                type="button"
                position={"absolute"}
                right="-15"
                top="150px"
                variant={"ghost"}
                _hover={{ background: "transparent" }}
                onClick={handleRemoveCertificate}
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
            doctor: 0,
            title: "",
            issued_by: "",
            certificate_number: "",
            certificate_issued_date: "",
            certificate_documents: undefined,
            id: "",
          });
        }}
      >
        Add Another Certification Detail
      </Button>
    </>
  );
};
