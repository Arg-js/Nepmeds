import { Box, Flex, FormLabel, HStack, Image } from "@chakra-ui/react";
import { ImageCancelIcon, UploadImageIcon } from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";
import { UseFormRegister } from "react-hook-form";
import FormControl from "./FormControl";

const ImageUpload = ({
  register,
  imageWatch,
  setValue,
}: {
  register: UseFormRegister<any>;
  imageWatch: any;
  setValue: any;
}) => {
  return (
    <>
      <FormLabel fontFamily={"500"} fontSize={"13px"} fontWeight={"Quicksand"}>
        Upload your lab reports :
      </FormLabel>
      <FormControl
        register={register}
        control={"input"}
        type={"file"}
        id={"image"}
        display={"none"}
        name={"lab_report_file"}
        accept={"image/png, image/jpeg"}
        multiple
      />
      <Flex>
        <FormLabel
          htmlFor="image"
          cursor={"pointer"}
          border={`1px dashed ${colors.gray}`}
          width={"76px"}
        >
          <UploadImageIcon />
        </FormLabel>
        {imageWatch && (
          <HStack>
            <Image
              src={URL.createObjectURL(imageWatch[0] as unknown as Blob)}
              width={"76px"}
              objectFit={"cover"}
            />
            <Box onClick={() => setValue("old_report_file", null)}>
              <ImageCancelIcon style={{ cursor: "pointer" }} />
            </Box>
          </HStack>
        )}
      </Flex>
    </>
  );
};

export default ImageUpload;
