import { Box, Flex, Image } from "@chakra-ui/react";
import { ImageCancelIcon } from "@nepMeds/assets/svgs";
import FormControl from "@nepMeds/components/Form/FormControl";
import SkeletonControl from "@nepMeds/components/Loader";
import {
  useDeleteLabReport,
  useGetLabReport,
} from "@nepMeds/service/nepmeds-lab-report";
import {
  appendServerUrl,
  openLinkInNewTab,
  removeFileFromFileList,
} from "@nepMeds/utils/index";
import { UseFormReturn } from "react-hook-form";

const LabReportForm = ({
  formMethods,
  appointmentId,
}: {
  formMethods: UseFormReturn<{
    image: FileList;
  }>;
  appointmentId: string;
}) => {
  const { register, watch, setValue } = formMethods;
  const imageWatch = watch("image");

  //   React Query
  const { data: labReport, isLoading: isLoadingLabReport } =
    useGetLabReport(appointmentId);
  const { mutateAsync: deleteLabReport } = useDeleteLabReport();
  // React Query ends

  const onImageRemove = (index: string) => {
    const updatedImage = removeFileFromFileList({
      index,
      fileList: imageWatch,
    });
    setValue("image", updatedImage);
  };

  return (
    <Flex alignItems={"flex-end"} gap={1}>
      <FormControl
        control="imageUpload"
        label={"Upload your lab reports"}
        register={register}
        fileList={imageWatch}
        name={"image"}
        onImageRemove={onImageRemove}
      />
      {isLoadingLabReport ? (
        <SkeletonControl
          variant={"skeleton"}
          width={"76px"}
          height={"76px"}
          length={2}
        />
      ) : (
        labReport?.map(({ image, id }, index) => (
          <Flex key={index}>
            <Image
              src={appendServerUrl(image)}
              width={"76px"}
              height={"76px"}
              objectFit={"contain"}
              onClick={() => openLinkInNewTab(appendServerUrl(image))}
            />
            <Box onClick={() => deleteLabReport(id)}>
              <ImageCancelIcon style={{ cursor: "pointer" }} />
            </Box>
          </Flex>
        ))
      )}
    </Flex>
  );
};

export default LabReportForm;
