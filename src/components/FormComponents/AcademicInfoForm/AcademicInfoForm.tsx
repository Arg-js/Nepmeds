import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, SimpleGrid } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import Select from "@nepMeds/components/Form/Select";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  useDeleteAcademicFile,
  useDeleteAcademicInfo,
} from "@nepMeds/service/nepmeds-academic";
import { useGetAllCollege } from "@nepMeds/service/nepmeds-core";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";
import { generateYearRange } from "@nepMeds/utils/timeRange";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import {
  IImageFileType,
  MultiImageUpload,
} from "../../ImageUploadMulti/dropzone";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";

export const AcademicInfoForm = ({
  doctorProfileData,
}: {
  doctorProfileData?: IGetDoctorProfile;
}) => {
  const {
    control,
    register,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useFormContext<IRegisterFields>();
  const deleteAcademicFile = useDeleteAcademicFile();
  const collegeInfo = useGetAllCollege();

  const collegeOptions =
    collegeInfo.data?.map(p => ({
      label: p.name,
      value: p.id,
    })) || [];

  const mappedImageInfo =
    doctorProfileData?.doctor_academic_info.map(e =>
      e?.academic_document.map((e: any) => {
        return { preview: getImageUrl(e?.file), id: String(e?.id) };
      })
    ) ?? [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "academic",
  });

  const deleteAcademicInfoRegister = useDeleteAcademicInfo();
  useEffect(() => {
    if (doctorProfileData?.doctor_academic_info.length) {
      reset({
        ...getValues(),
        academic: doctorProfileData?.doctor_academic_info.map(a => ({
          degree_program: a?.degree_program,
          doctor: a?.doctor,
          major: a?.major,
          university: a?.university_data.id,
          id: a?.id?.toString(),
          academic_documents: a?.academic_document,
          isSubmitted: true,
          graduation_year: a?.graduation_year?.toString(),
        })),
      });
    }
  }, [doctorProfileData, reset]);

  const [files, setFiles] = useState<Array<IImageFileType[]>>(mappedImageInfo);

  const years = generateYearRange(1950).map(year => {
    return {
      label: year.toString(),
      value: year.toString(),
    };
  });

  const handleRemoveAcademic = async (index: number) => {
    if (watch(`academic.${index}.isSubmitted`)) {
      const academicInfoResponse = await deleteAcademicInfoRegister.mutateAsync(
        parseInt(getValues(`academic.${index}.id`))
      );

      if (academicInfoResponse) {
        toastSuccess("Academic data deleted successfully");
        remove(index);
      } else {
        toastFail("Failed to delete academic information!");
      }
    } else {
      remove(index);
    }

    setFiles(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleDeleteFile = async (id: number) => {
    try {
      await deleteAcademicFile.mutateAsync(id);
    } catch (error) {
      const err = serverErrorResponse(error as AxiosError);
      toastFail(err);
    }
  };

  const getFiles = () => {
    const academic = getValues("academic") ?? [];

    const files = academic.map((item: any) => {
      return item.academic_documents;
    });
    return files;
  };

  return (
    <>
      {fields.map((item, index) => {
        return (
          <Box
            key={item.id}
            position="relative"
            w={{ base: "100%", lg: "94%" }}
          >
            <Box mb={4}>
              <MultiImageUpload
                setFiles={setFiles}
                files={files.length === 0 ? getFiles() : files}
                dataIndex={index}
                deleteFile={handleDeleteFile}
                fieldValue={`academic.${index}.academic_documents`}
              />
            </Box>
            <SimpleGrid
              mb={8}
              gap={2}
              columns={{ base: 1, md: 1, lg: 2, xl: 4 }}
            >
              <Controller
                render={({ field: { ref, ...field } }) => (
                  <FloatingLabelInput
                    label="Degree"
                    required
                    register={register}
                    style={{ background: colors.forminput, border: "none" }}
                    rules={{
                      required: "Degree is required.",
                    }}
                    error={errors?.academic?.[index]?.degree_program?.message}
                    {...field}
                  />
                )}
                name={`academic.${index}.degree_program`}
                control={control}
              />

              <Controller
                render={({ field: { ref, ...field } }) => (
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
                render={({ field: { ref, ...field } }) => (
                  <Select
                    required
                    placeholder="Select College/University"
                    label="College/ University"
                    register={register}
                    options={collegeOptions}
                    style={{
                      background: colors.forminput,
                      border: "none",
                      paddingTop: "15px",
                    }}
                    rules={{
                      required: "College/University is required.",
                    }}
                    error={errors?.academic?.[index]?.university?.message}
                    {...field}
                  />
                )}
                name={`academic.${index}.university`}
                control={control}
              />

              <Controller
                render={({ field: { ref, ...field } }) => (
                  <Select
                    required
                    placeholder=""
                    label="Passed Year"
                    register={register}
                    options={years}
                    style={{
                      background: colors.forminput,
                      border: "none",
                      paddingTop: "15px",
                    }}
                    rules={{
                      required: "Graduation year is required.",
                    }}
                    error={errors?.academic?.[index]?.graduation_year?.message}
                    {...field}
                  />
                )}
                name={`academic.${index}.graduation_year`}
                control={control}
              />
              <Button
                type="button"
                position={"absolute"}
                right="-15"
                top="150px"
                variant={"ghost"}
                _hover={{ background: "transparent" }}
                onClick={() => handleRemoveAcademic(index)}
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
            id: "",
            doctor: 0,
            degree_program: "",
            major: "",
            university: "",
            graduation_year: "2023",
            academic_documents: undefined,
            isSubmitted: false,
          });
        }}
      >
        Add {watch("academic")?.length > 0 && "Another"} Academic Detail
      </Button>
    </>
  );
};
