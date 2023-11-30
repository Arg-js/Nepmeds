import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import ImageUpload from "@nepMeds/components/ImageUpload";
import { FormProvider, useForm } from "react-hook-form";
import { IRoomUsersInfo } from "@nepMeds/hooks/useVideoCall";
import { appendServerUrl } from "@nepMeds/utils/getImageUrl";
import { useState } from "react";
import { fileToString } from "@nepMeds/utils/fileToString";
import {
  useDeletePrescriptionImage,
  useGetAllPrescriptionInfo,
  useUploadPrescriptionImage,
} from "@nepMeds/service/nepmeds-prescription";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CloseIcon } from "@chakra-ui/icons";

function isBase64Image(str: string): boolean {
  // Check if the string starts with a common Base64 image prefix
  return str.startsWith("data:image/");
}

const PrescriptionImageModal = ({
  onClose,
}: {
  userDetail?: IRoomUsersInfo | undefined;
  onClose: () => void;
}) => {
  // TODO: Remove any type with location type
  const { state }: any = useLocation();
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null
  );
  const [secondImage, setSecondImage] = useState<File | string | null>(null);
  const { mutateAsync, isLoading } = useUploadPrescriptionImage();
  // Either appointment or follow up id is sent from Link State
  const { data } = useGetAllPrescriptionInfo({
    appointment_id: state?.appointment_id ?? "",
    followup_id: state?.follow_up_id ?? "",
  });
  const { mutate: deleteImageMutate } = useDeletePrescriptionImage();

  const formMethods = useForm({
    defaultValues: {
      images: [],
      imageId: ["", ""],
    },
  });

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const imgData = await fileToString(e);
    if (index === 0) setSelectedImage(imgData);
    else setSecondImage(imgData);
  };

  const onSubmitForm = (data: { images: FileList[] }) => {
    const formData = data?.images?.map((item: FileList) => item[0] as File);
    mutateAsync({
      images: formData,
      doctor_consult_id: state?.appointment_id ?? "",
      follow_up_id: state?.follow_up_id ?? "",
    }).then(() => {
      setSelectedImage(null);
      setSecondImage(null);
      onClose();
    });
  };

  const handleRemoveImage = (index: number) => {
    formMethods.getValues().imageId[index] &&
      deleteImageMutate(formMethods.getValues().imageId[index]);
    formMethods.setValue(`imageId.${index}`, "");
    index === 0 && setSelectedImage(null);
    setSecondImage(null);
    formMethods.setValue(`imageId.1`, "");
  };

  useEffect(() => {
    if (data && data?.prescription_image?.length > 0) {
      if (data?.prescription_image[0]) {
        setSelectedImage(appendServerUrl(data?.prescription_image[0].image));
        formMethods.setValue(`imageId.0`, data?.prescription_image[0].id);
      }
      if (data?.prescription_image[1]) {
        setSecondImage(appendServerUrl(data?.prescription_image[1].image));
        formMethods.setValue(`imageId.1`, data?.prescription_image[1].id);
      }
    }
  }, [data]);

  return (
    <Card align="center" maxW="sm" minW={"sm"}>
      <Flex
        justifyContent={"space-between"}
        px={5}
        alignItems={"center"}
        w={"100%"}
      >
        <Heading size="sm">Add Prescription Image</Heading>
        <IconButton
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          icon={<CloseIcon />}
          onClick={onClose}
        />
      </Flex>
      <Divider w="94%" />
      <Box minW={"sm"} p={2}>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmitForm)}>
            <Flex my={5} gap={4} flexDirection={"column"} width={"100dw"}>
              <ImageUpload
                SelectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleImageChange={e => handleImageChange(e, 0)}
                name="images.0"
                upload_text="Upload Image"
                background="#F9FAFB"
                helperText={false}
                setValue={formMethods.setValue}
                handleRemoveFunction={() => {
                  handleRemoveImage(0);
                }}
              />
              <ImageUpload
                SelectedImage={secondImage}
                setSelectedImage={setSecondImage}
                handleImageChange={e => handleImageChange(e, 1)}
                name="images.1"
                upload_text="Upload Image"
                background="#F9FAFB"
                helperText={false}
                setValue={formMethods.setValue}
                handleRemoveFunction={() => {
                  handleRemoveImage(1);
                }}
              />
            </Flex>

            <Button
              type="submit"
              isLoading={isLoading}
              isDisabled={
                !isBase64Image((selectedImage as string) ?? "") &&
                !isBase64Image((secondImage as string) ?? "")
              }
            >
              Save
            </Button>
          </form>
        </FormProvider>
      </Box>
    </Card>
  );
};

export default PrescriptionImageModal;
