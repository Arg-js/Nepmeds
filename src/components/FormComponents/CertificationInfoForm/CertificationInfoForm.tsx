import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Box, SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Delete, Edit } from "react-iconly";
import { CheckIcon } from "@chakra-ui/icons";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { ChangeEvent, useEffect, useState } from "react";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";
import {
  useCertificateFileRegister,
  useCertificateInfoRegister,
  useUpdateCertificateInfo,
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
    watch,
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

  const updateCertificateInfoRegister = useUpdateCertificateInfo();

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

  const handleSendCertificateData = async () => {
    try {
      const index = getValues("certification").length - 1;
      if (getValues(`certification.${index}.isSubmitted`) !== true) {
        const certificateData = {
          doctor: getValues("doctor_id"),
          title: getValues(`certification.${index}.title`),
          issued_by: getValues(`certification.${index}.issued_by`),
          certificate_issued_date: getValues(
            `certification.${index}.certificate_issued_date`
          ),
          certificate_number: getValues(
            `certification.${index}.certificate_number`
          ),
          certificate_documents: getValues(
            `certification.${index}.certificate_documents`
          ),
          id: "",
          editMode: false,
          submitMode: false,
          isSubmitted: false,
        };

        const createCertificateFileResponse =
          await certificateFileRegister.mutateAsync(certificateData);

        if (createCertificateFileResponse) {
          const certificateInfoData = {
            ...certificateData,
            certificate_documents: createCertificateFileResponse.data.data.map(
              (file: string) => ({
                file: file,
              })
            ),
          };
          const certificateInfoResponse =
            await certificationInfoRegister.mutateAsync(certificateInfoData);

          if (certificateInfoResponse) {
            toastSuccess("Certificate data updated successfully");

            setValue(
              `certification.${index}.id`,
              certificateInfoResponse?.data?.data?.id
            );
            setValue(`certification.${index}.isSubmitted`, false);

            setValue(`certification.${index}.editMode`, true);
            setValue(`certification.${index}.submitMode`, false);
          } else {
            toastFail("Failed to add certificate information!");
          }
        } else {
          toastFail("Failed to upload certificate files!");
        }
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toastFail(
        err?.response?.data?.message ||
          "Failed to add certification information!"
      );
    }
  };

  const handleEditData = async (index: number, id: string) => {
    try {
      const certificateData = {
        doctor: getValues("doctor_id"),
        title: getValues(`certification.${index}.title`),
        issued_by: getValues(`certification.${index}.issued_by`),
        certificate_issued_date: getValues(
          `certification.${index}.certificate_issued_date`
        ),
        certificate_number: getValues(
          `certification.${index}.certificate_number`
        ),
        certificate_documents: getValues(
          `certification.${index}.certificate_documents`
        ),
        id: "",
        editMode: false,
        submitMode: false,
        isSubmitted: false,
      };

      const createCertificateFileResponse =
        await certificateFileRegister.mutateAsync(certificateData);

      if (createCertificateFileResponse) {
        const certificateInfoData = {
          ...certificateData,
          certificate_documents: createCertificateFileResponse.data.data.map(
            (file: string) => ({
              file: file,
            })
          ),
        };
        const certificateInfoResponse =
          await updateCertificateInfoRegister.mutateAsync({
            id: parseInt(id),
            data: certificateInfoData,
          });

        if (certificateInfoResponse) {
          toastSuccess("Certificate data updated successfully");

          setValue(
            `certification.${index}.id`,
            certificateInfoResponse?.data?.data?.id
          );
          setValue(`certification.${index}.isSubmitted`, false);

          setValue(`certification.${index}.editMode`, true);
          setValue(`certification.${index}.submitMode`, false);
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
                    isDisabled={getValues(`certification.${index}.editMode`)}
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
                    isDisabled={getValues(`certification.${index}.editMode`)}
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
                    isDisabled={getValues(`certification.${index}.editMode`)}
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
                    isDisabled={getValues(`certification.${index}.editMode`)}
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
            {watch(`certification.${index}.editMode`) && (
              <Button
                type="button"
                position={"absolute"}
                bottom={"14"}
                right="-15"
                // Edit button props...
                onClick={() => {
                  setValue(`certification.${index}.submitMode`, true);
                  setValue(`certification.${index}.editMode`, false);
                }}
              >
                <Icon as={Edit} fontSize={18} color={colors.error} />
              </Button>
            )}
            {watch(`certification.${index}.submitMode`) && (
              <Button
                type="button"
                position={"absolute"}
                bottom={"14"}
                right="-15"
                // Submit button props...
                onClick={() => {
                  handleEditData(index, getValues(`certification.${index}.id`));
                  setValue(`certification.${index}.submitMode`, false);
                  setValue(`certification.${index}.editMode`, true);
                }}
              >
                <Icon as={CheckIcon} fontSize={18} color={colors.error} />
              </Button>
            )}
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
            certificate_documents: undefined,
            id: "",
            editMode: false,
            submitMode: false,
            isSubmitted: false,
          });
        }}
      >
        Add Another Certification Detail
      </Button>
    </>
  );
};
