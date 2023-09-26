import { Flex, HStack, FormLabel, Image, Box } from "@chakra-ui/react";
import { ImageCancelIcon, UploadImageIcon } from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";
import React from "react";

const SimpleImageUpload: React.FC<{
  imgSrc: FileList | string;
  onImageRemove: () => void;
  errorMessage: string;
}> = ({ imgSrc, onImageRemove, errorMessage }) => {
  return (
    <>
      <Flex>
        <FormLabel
          htmlFor="image"
          cursor={"pointer"}
          border={`1px dashed ${colors.gray}`}
          width={"76px"}
        >
          <UploadImageIcon />
        </FormLabel>
        {imgSrc && (
          <HStack>
            <Image
              alt={"image"}
              src={
                typeof imgSrc === "string"
                  ? imgSrc
                  : URL.createObjectURL(imgSrc[0])
              }
              width={"76px"}
              objectFit={"cover"}
              position={"relative"}
            />
            <Box
              onClick={onImageRemove}
              alignSelf={"flex-start"}
              position={"relative"}
              right={4}
              top={-1}
            >
              <ImageCancelIcon style={{ cursor: "pointer" }} />
            </Box>
          </HStack>
        )}
      </Flex>
      <FormLabel fontWeight={400} fontSize={"xs"} color={colors.red}>
        {errorMessage}
      </FormLabel>
    </>
  );
};

export default SimpleImageUpload;
