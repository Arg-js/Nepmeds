import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Box, SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Delete } from "react-iconly";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { ChangeEvent, useEffect, useState } from "react";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";
import {
  useCertificateFileRegister,
  useCertificateInfoRegister,
} from "@nepMeds/service/nepmeds-certificate";
import { toastSuccess, toastFail } from "@nepMeds/components/Toast";
import { AxiosError } from "axios";

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

  const certificationInfoRegister = useCertificateInfoRegister();
  const certificateFileRegister = useCertificateFileRegister();

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
          `certification.${certificateIndex}.certificate_document.${imageIndex}`,
          selectedFiles[0]
        );

        return updatedImages;
      });
    }
  };
  console.log(selectedImages, selectedImagesFile);
  console.log(getValues("certification"));

  const handleSendCertificateData = async () => {
    try {
      const lastValue = getValues("certification").length - 1;

      const certificateData = {
        doctor: getValues("doctor_id"),
        title: getValues(`certification.${lastValue}.title`),
        issued_by: getValues(`certification.${lastValue}.issued_by`),
        certificate_issued_date: getValues(
          `certification.${lastValue}.certificate_issued_date`
        ),
        certificate_number: getValues(
          `certification.${lastValue}.certificate_number`
        ),
        certificate_document: getValues(
          `certification.${lastValue}.certificate_document`
        ),
      };

      const createCertificateFileResponse =
        await certificateFileRegister.mutateAsync(certificateData);

      if (createCertificateFileResponse) {
        const certificateInfoData = {
          ...certificateData,
          certificate_document: createCertificateFileResponse.data.data.map(
            (file: string) => ({
              file: file,
            })
          ),
        };
        const certificateInfoResponse =
          await certificationInfoRegister.mutateAsync(certificateInfoData);

        if (certificateInfoResponse) {
          toastSuccess("Certificate data updated successfully");
        } else {
          toastFail("Failed to add certificate information!");
        }
      } else {
        toastFail("Failed to upload certificate files!");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toastFail(
        err?.response?.data?.message ||
          "Failed to add certification information!"
      );
    }
  };

  return (
    <>
      {fields.map((item, index) => {
        const certificateIndex = index;
        const selectedImagesForCertification =
          selectedImages[certificateIndex] || [];

        const handleRemoveCertificate = () => {
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
                name={`certification.${index}.certificate_document`}
                fieldValues={`certification.${index}.certificate_document`}
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
            </SimpleGrid>
            <Button
              type="button"
              position={"absolute"}
              bottom={"0"}
              right="-15"
              onClick={handleRemoveCertificate}
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
          await handleSendCertificateData();
          append({
            doctor: 0,
            title: "",
            issued_by: "",
            certificate_number: "",
            certificate_issued_date: "",
            certificate_document: undefined,
          });
        }}
      >
        Add Another Certification Detail
      </Button>
    </>
  );
};
