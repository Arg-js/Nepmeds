import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image } from "@chakra-ui/react";

import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const MultipleImageUpload = ({
  selectedImages,
  setSelectedImages,
  handleImageChange,
  name,
  background,
  editMode,
  fieldValues,
}: MultipleImageUploadProps) => {
  const [showAddImageBox, setShowAddImageBox] = useState<boolean[]>(
    Array(selectedImages.length).fill(false)
  );

  const { getValues } = useFormContext();

  useEffect(() => {
    const fieldValue = getValues(fieldValues);
    // Initialize selected images from field values when the component mounts
    if (editMode) {
      if (fieldValue && fieldValue.length > 0) {
        const defaultImages = fieldValue?.map((item: any) => {
          // Extract the file path from each item in the array
          const filePath = item?.file;

          // Append the base URL with the file name
          const imageUrl = filePath
            ? `http://38.242.204.217:8005/media/${filePath}`
            : URL.createObjectURL(item);

          // Create a new image object using the file URL
          return [imageUrl];
        });

        // Set the default images as the initial selected images
        setSelectedImages(defaultImages);
      }
    } else {
      setSelectedImages(fieldValue);
    }
  }, [fieldValues]);

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);

    setSelectedImages(updatedImages);
    const updatedShowAddImageBox = [...showAddImageBox];
    updatedShowAddImageBox.splice(index, 1);
    setShowAddImageBox(updatedShowAddImageBox);
  };

  return (
    <Flex
      p={2}
      bg={"#F9FAFB"}
      border={"2px dashed"}
      borderColor={"#D1D5DB"}
      borderRadius={"4px"}
      flexWrap="wrap"
      alignItems={"self-end"}
    >
      {selectedImages?.map((image, index) => (
        <Flex key={index} alignItems="center">
          <Box
            position="relative"
            width={"80px"}
            height="80px"
            borderRadius="4px"
            m={2}
            overflow="hidden"
          >
            {image && (
              <Image
                src={
                  editMode
                    ? (image as string)
                    : typeof image === "string"
                    ? image
                    : image instanceof File
                    ? URL.createObjectURL(image)
                    : undefined
                }
                alt="Selected Image"
                objectFit="cover"
                width="100%"
                height="100%"
              />
            )}
            <IconButton
              icon={<CloseIcon />}
              aria-label="Remove Image"
              position="absolute"
              top="4px"
              right="4px"
              size="sm"
              onClick={() => handleRemoveImage(index)}
            />
          </Box>
        </Flex>
      ))}
      {selectedImages.length < 5 && (
        <Box
          style={{
            position: "relative",
            width: "80px",
            height: "80px",

            borderRadius: "4px",
            border: "2px dashed",
            margin: "8px",
            borderColor: "#E1E2E9",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            backgroundColor: background ?? "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            const fileInput = document.getElementById(
              `input-${name}`
            ) as HTMLInputElement;
            if (fileInput) {
              fileInput.value = "";
              fileInput.click();
            }
          }}
        >
          <IconButton
            icon={<AddIcon />}
            variant="unstyled"
            _hover={{ bg: "transparent" }}
            color={"#D1D5DB"}
            aria-label="Upload Image"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          />
          <input
            type="file"
            id={`input-${name}`}
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={e => {
              handleImageChange(e, selectedImages.length);
              setShowAddImageBox(prevShowAddImageBox => [
                ...prevShowAddImageBox,
                false,
              ]);
            }}
          />
        </Box>
      )}
    </Flex>
  );
};

export default MultipleImageUpload;

interface MultipleImageUploadProps {
  selectedImages: Array<File | string | null>;
  setSelectedImages: (images: Array<File | string | null>) => void;
  name: string;
  helperText: boolean;
  uploadText: string;
  academicIndex: number;
  background?: string;
  editMode?: boolean;
  fieldValues?: any;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
}
