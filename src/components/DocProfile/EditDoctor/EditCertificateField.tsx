import { Box, SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import MultipleImageUpload from "@nepMeds/components/ImageUploadMulti";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { colors } from "@nepMeds/theme/colors";
import { ChangeEvent, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const EditCertificateField = ({
  index,
  doctorProfileData,
}: {
  index?: number;
  doctorProfileData?: IGetDoctorProfile;
}) => {
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
    imagecertificateIndex: number,
    certificatecertificateIndex: number
  ) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const imageUrl = URL.createObjectURL(selectedFiles[0]);
      setSelectedImages(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages[certificatecertificateIndex] = [
          ...(updatedImages[certificatecertificateIndex] || []),
        ];
        updatedImages[certificatecertificateIndex][imagecertificateIndex] =
          imageUrl;
        return updatedImages;
      });

      setSelectedImagesFile(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages[certificatecertificateIndex] = [
          ...(updatedImages[certificatecertificateIndex] || []),
        ];
        updatedImages[certificatecertificateIndex][imagecertificateIndex] =
          selectedFiles[0];
        setValue(
          `certification.${certificatecertificateIndex}.certificate_documents.${imagecertificateIndex}`,
          selectedFiles[0]
        );

        return updatedImages;
      });
    }
  };
  const certificateIndex = index !== undefined ? index : 0;
  const selectedImagesForCertification = selectedImages[certificateIndex] || [];

  return (
    <Box position="relative">
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
          handleImageChange={(e, imagecertificateIndex) =>
            handleImageChange(e, imagecertificateIndex, certificateIndex)
          }
          name={`certification.${certificateIndex}.certificate_documents`}
          fieldValues={
            doctorProfileData?.doctor_certification_info[certificateIndex]
              ?.certificate_document
          }
          uploadText="Upload Images"
          background="#F9FAFB"
          academicIndex={certificateIndex}
          helperText={false}
          editMode={true}
        />
      </SimpleGrid>
      <SimpleGrid gridTemplateColumns={"repeat(2,1fr)"} mb={8} gap={2}>
        <Controller
          render={({ field }) => (
            <FloatingLabelInput
              label="Title"
              required
              defaultValue={
                doctorProfileData?.doctor_certification_info[certificateIndex]
                  ?.title
              }
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
              defaultValue={
                doctorProfileData?.doctor_certification_info[certificateIndex]
                  ?.issued_by
              }
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
              defaultValue={
                doctorProfileData?.doctor_certification_info[certificateIndex]
                  ?.certificate_number
              }
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
              defaultValue={
                doctorProfileData?.doctor_certification_info[certificateIndex]
                  ?.certificate_issued_date
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

export default EditCertificateField;
