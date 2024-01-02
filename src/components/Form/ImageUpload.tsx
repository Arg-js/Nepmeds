import { Box, Flex, FormLabel, Image } from "@chakra-ui/react";
import { ImageCancelIcon, UploadImageIcon } from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";
import { UseFormRegister } from "react-hook-form";
import { InputProps } from "react-select";
import FormControl from "./FormControl";

const ImageUpload = ({
  label,
  register,
  fileList,
  name,
  onImageRemove,
}: {
  label: string;
  name: string;
  // TODO: remove any
  register: UseFormRegister<any>;
  fileList: FileList;
  onImageRemove: (index: string) => void;
} & InputProps) => {
  return (
    <Box>
      <FormLabel fontFamily={"500"} fontSize={"13px"} fontWeight={"Quicksand"}>
        {label}
      </FormLabel>
      <FormControl
        register={register}
        control={"input"}
        type={"file"}
        id={"image"}
        display={"none"}
        name={name}
        accept={"image/png, image/jpeg, image/jpg"}
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
        {!!fileList?.length &&
          Object.keys(fileList).map(index => (
            <Flex key={Math.random()}>
              {/* TODO: fix this issue of as unknown as Blob)
                }*/}
              <Image
                src={URL.createObjectURL(fileList[+index] as unknown as Blob)}
                width={"76px"}
                height={"76px"}
                objectFit={"contain"}
              />
              <Box onClick={() => onImageRemove(index)}>
                <ImageCancelIcon style={{ cursor: "pointer" }} />
              </Box>
            </Flex>
          ))}
      </Flex>
    </Box>
  );
};

export default ImageUpload;
