/* eslint-disable */
import {
  Image,
  Box,
  IconButton,
  Text,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";

import { ChangeEvent } from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";

const ImageUpload = ({
  SelectedImage,
  setSelectedImage,
  handleImageChange,
  name,
  upload_text,
  background,
  helperText,
  rules,
  error,
}: ImageUploadProps) => {
  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const { register } = useFormContext();

  return (
    <>
      <FormControl isInvalid={!!error}>
        {SelectedImage ? (
          <Box
            position="relative"
            width={"100%"}
            height="160px"
            borderRadius="12px"
            overflow="hidden"
          >
            <Image
              src={
                typeof SelectedImage === "string"
                  ? SelectedImage
                  : SelectedImage instanceof File
                  ? URL.createObjectURL(SelectedImage)
                  : undefined
              }
              alt="Selected Image"
              objectFit="cover"
              width="100%"
              height="100%"
            />
            <IconButton
              icon={<CloseIcon />}
              aria-label="Remove Image"
              position="absolute"
              top="4px"
              right="4px"
              size="sm"
              onClick={handleRemoveImage}
            />
          </Box>
        ) : (
          <Box
            width={"100%"}
            height="160px"
            borderRadius="4px"
            border="2px dashed"
            borderColor="#E1E2E9"
            cursor="pointer"
            display="flex"
            flexDirection="column"
            backgroundColor={background ?? "#fff"}
            alignItems="center"
            justifyContent="center"
            {...register(name)}
            onClick={() => document.getElementById(name)?.click()}
          >
            <IconButton
              icon={<AddIcon />}
              variant="unstyled"
              _hover={{ bg: "transparent" }}
              color={"#D1D5DB"}
              aria-label="Upload Image"
              padding={6}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              border={"1px dashed #D1D5DB"}
            />
            <Box
              display="flex"
              flexDirection={"column"}
              alignItems="center"
              mt={4}
            >
              <Text color="#14B8A6" fontWeight={600} fontSize="14px">
                {upload_text}
              </Text>

              {helperText && (
                <Text color="#4B5563" fontWeight={400} fontSize="14px">
                  or drag and drop
                </Text>
              )}
            </Box>

            <input
              type="file"
              id={name}
              {...register(name, rules)}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </Box>
        )}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </>
  );
};

export default ImageUpload;

interface ImageUploadProps {
  SelectedImage: File | string | null;
  name: string;
  helperText: boolean;
  upload_text: string;
  background?: string;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setSelectedImage: (image: File | string | null) => void;
  rules?: RegisterOptions;
  error?: string;
}
