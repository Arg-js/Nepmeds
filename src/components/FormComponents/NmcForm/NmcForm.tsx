import { Box, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import ImageUpload from "@nepMeds/components/ImageUpload";
import { fileToString } from "@nepMeds/utils/fileToString";

export const NmcForm = () => {
  // hook form
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<IRegisterFields>();

  //  state
  const [nmcFile, setNmcFile] = useState<File | string | null>(null);
  //  hooks
  const { nmc: nmcData } = watch();
  useEffect(() => {
    setNmcFile(nmcData.nmc_file?.[0] ?? null);
  }, [nmcData]);

  // methods
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgData = await fileToString(e);
    setNmcFile(imgData);
  };

  //  validations
  const checkPictureSize = (image: File | null) => {
    if (image && (image as File)?.size / 1048576 > 1) {
      return "Image is greater than 1MB";
    }
  };

  return (
    <>
      <Box position="relative" w={{ base: "100%", lg: "94%" }}>
        <GridItem colSpan={4}>
          <Text fontWeight={400} mb={"12px"} fontSize={"sm"}>
            Upload Cetificate
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <ImageUpload
            SelectedImage={nmcFile}
            setSelectedImage={setNmcFile}
            handleImageChange={handleImageChange}
            name="nmc.nmc_file"
            helperText={true}
            upload_text="Upload a File "
            error={
              errors.nmc?.nmc_file?.message ||
              checkPictureSize(watch("nmc.nmc_file")?.[0] as File)
            }
            rules={{
              required: "Cetficiate is required",
            }}
            setValue={setValue}
          />
        </GridItem>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} mt={4} mb={8} gap={4}>
          <FloatingLabelInput
            label="NMC No."
            name="nmc.nmc_number"
            register={register}
            required
            type="number"
            style={{ background: colors.forminput, border: "none" }}
            rules={{
              required: "NMC No. is required.",
            }}
            error={errors.first_name?.message}
          />
          <FloatingLabelInput
            name="nmc.nmc_issued_date"
            label="Date of Certificate Issue"
            register={register}
            type="date"
            required
            _hover={{ cursor: "pointer" }}
            style={{
              background: colors.forminput,
              border: "none",
            }}
            rules={{
              required: "Date of Certificate Issue is required.",
            }}
            error={errors.nmc?.nmc_issued_date?.message}
          />
          <FloatingLabelInput
            name="nmc.nmc_expiry_date"
            label="Expire Date"
            register={register}
            type="date"
            required
            _hover={{ cursor: "pointer" }}
            style={{
              background: colors.forminput,
              border: "none",
            }}
            rules={{
              required: "Expire Date is required.",
            }}
            error={errors.nmc?.nmc_expiry_date?.message}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};
