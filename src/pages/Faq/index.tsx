import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { CustomButton } from "@nepMeds/components/Button/Button";
import { DataTable } from "@nepMeds/components/DataTable";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";
import { IoAdd, IoFunnelOutline } from "react-icons/io5";
import { svgs } from "@nepMeds/assets/svgs";
import { FormProvider, useForm } from "react-hook-form";
import {
  // ICreateFaq,
  useCreateFaq,
  useGetFaqList
} from "@nepMeds/service/nepmeds-faq";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import { columns } from "./faqColumn";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";

const schema = yup.object().shape({
  question: yup
    .string()
    .required("Question is required")
    .max(50, "Question can only be 50 characters long"),
  answer: yup
    .string()
    .required("Answer is required")
    .max(250, "Answer can only be 250 characters long")
});

const defaultValues = {
  question: "",
  answer: ""
};

const FAQ = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const resetData = () => {
    onClose();
    reset();
  };
  const {
    isOpen: isDeleteModalOpen,
    onClose: onCloseDeleteModal
    // onOpen: onOpenDeleteModal,
  } = useDisclosure();

  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit
  } = formMethods;

  const { mutateAsync: createFaq } = useCreateFaq();

  const { data } = useGetFaqList();

  const submitFaq = async (faq: typeof defaultValues) => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;
      await createFaq(faq);
      reset();
      onClose();
      toastSuccess("FAQ added successfully!");
    } catch (error) {
      toastFail("Failed to add FAQ!");
    }
  };

  const createFaqHandle = () => {
    handleSubmit(submitFaq)();
  };

  return (
    <WrapperBox style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}>
      <>
        <Flex justifyContent={"end"}>
          <Box my={5}>
            <CustomButton backgroundColor={colors.primary} onClick={onOpen}>
              <IoAdd /> Add Question
            </CustomButton>
          </Box>
        </Flex>
        <Grid display={"flex"} justifyContent={"space-between"}>
          <HStack justifyContent="space-between">
            <Text fontSize="xl" fontWeight="500" color={colors.blue_100}>
              Frequently Asked Questions
            </Text>
          </HStack>
          <HStack>
            <InputGroup w="190px" borderColor={colors.grey_dark}>
              <InputLeftElement pointerEvents="none" h={8}>
                <SearchIcon color={colors.grey_dark} boxSize={4} />
              </InputLeftElement>
              <Input w={40} h={8} placeholder="Search" />
            </InputGroup>
            <Button
              color={colors.grey_dark}
              bg={colors.white}
              outlineColor={colors.grey_dark}
              h={8}
            >
              <IoFunnelOutline pointerEvents={"none"} />
              &nbsp; Filter
            </Button>
          </HStack>
        </Grid>
        <DataTable columns={columns} data={data?.results ?? []} />
        <ModalComponent
          isOpen={isOpen}
          onClose={onClose}
          size="md"
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Add FAQ</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button
                variant={"primaryOutline"}
                onClick={resetData}
                flex={1}
                border="1px solid"
                fontWeight={400}
              >
                Cancel
              </Button>
              <Button
                flex={1}
                onClick={createFaqHandle}
                type="submit"
                isLoading={isSubmitting}
              >
                Add
              </Button>
            </HStack>
          }
        >
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(submitFaq)}>
              <Flex direction={"column"} gap={2}>
                <FloatinglabelTextArea
                  register={register}
                  label="Question"
                  name="question"
                  required
                  style={{ background: colors.forminput, border: "none" }}
                  error={errors.question?.message}
                />
                <FloatinglabelTextArea
                  register={register}
                  label="Answer"
                  name="answer"
                  required
                  style={{ background: colors.forminput, border: "none" }}
                  error={errors?.answer?.message}
                />
              </Flex>
            </form>
          </FormProvider>
        </ModalComponent>
        <ModalComponent
          size="sm"
          isOpen={isDeleteModalOpen}
          onClose={onCloseDeleteModal}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Delete FAQ</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button
                variant={"primaryOutline"}
                onClick={onCloseDeleteModal}
                flex={1}
              >
                Cancel
              </Button>
              <Button
                flex={1}
                variant={"reset"}
                onClick={() => alert("Delete")}
                // isLoading={deleteSymptomAction.isLoading}
              >
                Delete
              </Button>
            </HStack>
          }
        >
          <Box>Are you sure?</Box>
        </ModalComponent>
      </>
    </WrapperBox>
  );
};

export default FAQ;
