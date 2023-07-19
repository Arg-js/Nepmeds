import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { colors } from "@nepMeds/theme/colors";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";

import { DeleteIcon } from "@chakra-ui/icons";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useDeleteCertificateInfo } from "@nepMeds/service/nepmeds-certificate";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";

export const CertificationInfoForm = ({
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
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useFormContext<IRegisterFields>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certification",
  });

  const mappedImageInfo =
    doctorProfileData?.doctor_certification_info.map(e =>
      e?.certificate_document.map((e: any) => getImageUrl(e.file))
    ) ?? [];

  const deleteCertificateInfoRegister = useDeleteCertificateInfo();

  useEffect(() => {
    if (doctorProfileData?.doctor_certification_info?.length) {
      reset({
        ...getValues(),
        certification: doctorProfileData?.doctor_certification_info.map(a => ({
          certificate_issued_date: a.certificate_issued_date,
          doctor: a.doctor,
          id: a.id?.toString(),
          certificate_number: a.certificate_number,
          title: a.title,
          issued_by: a.issued_by,
          isSubmitted: true,
          certificate_documents: a.certificate_document,
        })),
      });
    }
  }, [doctorProfileData, getValues]);

  const [selectedImages, setSelectedImages] =
    useState<Array<Array<File | string | null>>>(mappedImageInfo);
  const [, setSelectedImagesFile] = useState<Array<Array<File | null>>>([]);

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

  const validateIssuedDate = (index: number) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in ISO format (YYYY-MM-DD)
    const issuedDate = getValues(
      `certification.${index}.certificate_issued_date`
    );
    if (!issuedDate) {
      return "Issued Date is required";
    } else if (issuedDate > currentDate) {
      return "Issued date cannot be greater than the current date.";
    } else return true; // Return true if the validation passes
  };

  const handleRemoveCertificate = async (index: number) => {
    if (watch(`certification.${index}.isSubmitted`)) {
      const certificateInfoResponse =
        await deleteCertificateInfoRegister.mutateAsync(
          parseInt(getValues(`certification.${index}.id`))
        );

      if (certificateInfoResponse) {
        toastSuccess("Certification data deleted successfully");
        remove(index);
      } else {
        toastFail("Failed to delete certification information!");
      }
    } else remove(index);

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
              <Controller
                render={({ field }) => (
                  <MultipleImageUpload
                    editMode={editMode ?? false}
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
                    fieldValues={`certification.${index}.certificate_documents`}
                    uploadText="Upload Images"
                    background="#F9FAFB"
                    academicIndex={index}
                    helperText={false}
                    {...field} // Pass the `field` props to ensure integration with `react-hook-form`
                  />
                )}
                name={`certification.${index}.certificate_documents`} // Add the field name for registration and validation
                control={control} // Pass the `control` prop to ensure integration with `react-hook-form`
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
                onClick={() => handleRemoveCertificate(index)}
              >
                <Icon
                  as={
                    deleteCertificateInfoRegister.isLoading
                      ? Spinner
                      : DeleteIcon
                  }
                  fontSize={28}
                  color={colors.error}
                />
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
            isSubmitted: false,
          });
        }}
      >
        Add Another Certification Detail
      </Button>
    </>
  );
};
