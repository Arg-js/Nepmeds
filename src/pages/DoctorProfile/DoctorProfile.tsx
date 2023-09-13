import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { HStack, Text, VStack } from "@chakra-ui/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { colors } from "@nepMeds/theme/colors";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required!"),
  first_name: yup.string().required("First Name is required"),
  middle_name: yup.string().required("Middle Name is required"),
  last_name: yup.string().required("Last Name is required"),
});
const DoctorProfile = () => {
  const { isOpen, onClose } = useDisclosure();
  const formMethods = useForm({
    defaultValues: {
      image: undefined as undefined | File[],
      title: "",
      first_name: "",
      middle_name: "",
      last_name: "",
    },
    resolver: yupResolver(schema),
  });
  //   const savePersonalDataAction = usePersonalData();

  const onSavePersonalInfo = async () => {
    // try {
    //   const isValid = formMethods.trigger();
    //   if (!isValid) return;
    //   await savePersonalDataAction.mutateAsync({
    //     image: formMethods.getValues("image"),
    //     title: formMethods.getValues("title"),
    //     first_name: formMethods.getValues("first_name"),
    //     middle_name: formMethods.getValues("middle_name"),
    //     last_name: formMethods.getValues("last_name"),
    //   });
    //   onClose();
    //   toastSuccess("Personal Data saved successfully!");
    // } catch (error) {
    //   toastFail("Failed to save personal data!");
    // }
  };
  return (
    <>
      <ModalComponent
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Edit Primary Info</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button variant="outline" onClick={onClose} flex={1}>
              Discard
            </Button>
            <Button
              flex={1}
              onClick={onSavePersonalInfo}
              background={colors.primary}
              color={colors.white}
            >
              Save
            </Button>
          </HStack>
        }
      >
        <VStack>
          <FormProvider {...formMethods}>
            {/* <PrimaryInfoForm /> */}
          </FormProvider>
        </VStack>
      </ModalComponent>
    </>
  );
};

export default DoctorProfile;
