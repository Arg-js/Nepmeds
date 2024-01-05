import { SmallAddIcon } from "@chakra-ui/icons";
import { Box, BoxProps, IconButton, Spinner, Text } from "@chakra-ui/react";
import { RejectIcon } from "@nepMeds/assets/svgs";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface IProifleUploadProps {
  boxProps?: BoxProps;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  text?: string;
  uploadFn?: any;
  isLoading?: boolean;
}

const PatientProfileUpload = ({
  setIsEdit,
  boxProps,
  isLoading,
  text = "Upload",
  uploadFn,
}: IProifleUploadProps) => {
  const onUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      await uploadFn(file);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      borderRadius="50%"
      width="128px"
      height="128px"
      display="flex"
      flexDirection="column"
      backgroundColor={"#fff"}
      alignItems="center"
      justifyContent="center"
      mt={{ base: "4%", "2xl": "7%" }}
      ml={"8%"}
      outline={"1px dashed black"}
      {...boxProps}
    >
      {!isLoading && (
        <IconButton
          icon={<SmallAddIcon />}
          variant="unstyled"
          _hover={{ bg: "transparent" }}
          color={"black"}
          aria-label="Upload Image"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          border={"1px dashed black"}
          cursor="pointer"
          onClick={() => document.getElementById("profileUpload")?.click()}
        />
      )}
      <Text color={"black"} fontSize={"sm"}>
        {isLoading ? "Uploading" : text}
      </Text>
      {isLoading ? (
        <Spinner color={"black"} fontSize={"10"} />
      ) : (
        <IconButton
          height={"min-content"}
          aria-label="view"
          icon={<RejectIcon />}
          onClick={() => setIsEdit(false)}
          sx={{
            bg: "transparent",
            "&:hover": {
              bg: "transparent",
            },
          }}
        />
      )}

      <input
        type="file"
        id="profileUpload"
        accept="image/jpeg, image/png, image/jpg"
        style={{ display: "none" }}
        onChange={onUploadImage}
      />
    </Box>
  );
};

export default PatientProfileUpload;
