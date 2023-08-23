import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

export type IImageFileType =
  | (File & { preview: string; id: string })
  | { preview: string; id: string };
interface Props {
  setFiles: Dispatch<SetStateAction<Array<IImageFileType[]>>>;
  files: Array<IImageFileType[]>;
  dataIndex: number;
  deleteFile?: (id: number) => void;
  fieldValue: string;
}

export function MultiImageUpload({
  files,
  setFiles,
  dataIndex,
  deleteFile,
  fieldValue,
}: Props) {
  const { setValue } = useFormContext();
  const imagesFile = files[dataIndex] ?? [];

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 5,

    onDrop: acceptedFiles => {
      const newFiles = acceptedFiles.map((file, i) => {
        setValue(`${fieldValue}.${i + imagesFile.length}`, file);

        return Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: "0",
        });
      });

      const tempArray = [];
      tempArray[dataIndex] = imagesFile.concat(newFiles);

      setFiles(tempArray);
    },
  });

  const removeFile = (file: IImageFileType) => () => {
    const newFiles = [...imagesFile];
    const index = newFiles.indexOf(file);
    newFiles.splice(index, 1);

    const tempArray = [...files];
    tempArray[dataIndex] = [...newFiles];
    if (file.id !== "0" && deleteFile) {
      deleteFile(Number(file.id));
    }
    setFiles(tempArray);
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      setFiles([]);
      imagesFile.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, []);

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
      {imagesFile.map((image, index) => (
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
                src={image.preview}
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
              onClick={removeFile(image)}
            />
          </Box>
        </Flex>
      ))}
      {imagesFile.length < 5 && (
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
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
          {...getRootProps({ className: "dropzone" })}
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
          <input {...getInputProps()} />
        </Box>
      )}
    </Flex>
  );
}
