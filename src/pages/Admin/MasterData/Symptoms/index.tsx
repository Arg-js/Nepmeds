import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { Symptom } from "@nepMeds/service/nepmeds-specialization";
import {
  // useDeleteBulkSymptoms,
  useDeleteSymptom,
  useSaveSymptoms,
  useSymptomsDataWithPagination,
} from "@nepMeds/service/nepmeds-symptoms";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import * as yup from "yup";

const defaultValues = {
  id: null as number | null,
  name: "",
  keyword: "",
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Symptom name is required!")
    .max(30, "Symptom name can be 30 characters long"),
  keyword: yup
    .string()
    .required("Symptom keyword is required")
    .max(30, "Keyword can be 30 characters long"),
});

type OnOpenFunction = () => void;

interface SymptomsProps {
  onCloseSymptoms: OnOpenFunction;
  isSymptomsOpen: boolean;
  activeTab: number;
}

const Symptoms = ({
  onCloseSymptoms,
  isSymptomsOpen,
  activeTab,
}: SymptomsProps) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [deleteSymptom, setDeleteSymptom] = useState<Symptom | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedInputValue = useDebounce(searchFilter, 500);
  const { data, isLoading, isSuccess } = useSymptomsDataWithPagination({
    activeTab,
    page_no: pageIndex + 1,
    page_size: pageSize,
    name: debouncedInputValue,
  });
  const saveSymptomAction = useSaveSymptoms(pageIndex + 1, pageSize, "");
  const deleteSymptomAction = useDeleteSymptom(pageIndex + 1, pageSize, "");
  // const deleteBulkSymptom = useDeleteBulkSymptoms();

  const {
    isOpen: isDeleteModalOpen,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onClose: onCloseEditModal,
    onOpen: onOpenEditModal,
  } = useDisclosure();

  // const {
  //   isOpen: isBulkOpen,
  //   onClose: onCloseBulkModal,
  //   onOpen: onOpenBulkModal,
  // } = useDisclosure();

  const formMethods = useForm({
    defaultValues,

    resolver: yupResolver(schema),
  });
  const {
    formState: { errors },
    register,
  } = formMethods;

  const columns = [
    {
      header: "S.N.",
      accessorFn: (_cell: CellContext<Symptom, any>, index: number) => {
        return index + 1;
      },
    },
    {
      header: "Symptom Name",
      accessorKey: "name",
    },
    {
      header: "Keyword",
      accessorKey: "keyword",
    },
    {
      header: "Actions",
      cell: (cell: CellContext<any, any>) => {
        return (
          <HStack justifyContent="center">
            <IconButton
              aria-label="edit"
              variant="ghost"
              size="sm"
              w="auto"
              onClick={() => {
                onOpenEditModal();
                formMethods.reset(cell.row.original);
              }}
            >
              <AiOutlineEdit size={20} fill={colors.blue_100} />
            </IconButton>
            <IconButton
              aria-label="delete"
              variant="ghost"
              size="sm"
              w="auto"
              onClick={() => {
                setDeleteSymptom(cell.row.original);
                onOpenDeleteModal();
              }}
            >
              <AiOutlineDelete size={20} fill={colors.red} />
            </IconButton>
          </HStack>
        );
      },
    },
  ];

  const onEditForm = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;

      await saveSymptomAction.mutateAsync({
        id: formMethods.getValues("id")?.toString() || null,
        name: formMethods.getValues("name"),
        keyword: formMethods.getValues("keyword"),
      });
      onCloseModal();
      toastSuccess("Symptom saved successfully!");
    } catch (error) {
      toastFail("Failed to save symptom!");
    }
  };

  const onSubmitForm = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;

      await saveSymptomAction.mutateAsync({
        id: null,
        name: formMethods.getValues("name"),
        keyword: formMethods.getValues("keyword"),
      });
      onCloseModal();
      toastSuccess("Symptom saved successfully!");
    } catch (error) {
      const err = serverErrorResponse(error, "Failed to save symptom!");
      toastFail(err);
    }
  };
  const onSaveSymptom = () => {
    formMethods.handleSubmit(onSubmitForm)();
  };

  const onEditHandle = () => {
    formMethods.handleSubmit(onEditForm)();
  };

  const onCloseModal = () => {
    onCloseSymptoms();
    onCloseEditModal();
    formMethods.reset(defaultValues);
  };

  const onDeleteSymptom = async () => {
    try {
      if (!deleteSymptom?.id) return;

      await deleteSymptomAction.mutateAsync({
        id: deleteSymptom.id.toString(),
      });
      onCloseDeleteModal();
      toastSuccess("Symptom deleted successfully!");
    } catch (error) {
      toastFail("Failed to delete symptom!");
    }
  };

  return (
    <Fragment>
      {/* edit modal */}
      {isEditModalOpen && (
        <ModalComponent
          size="sm"
          isOpen={isEditModalOpen}
          onClose={onCloseModal}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Edit Symptom</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button
                variant={"primaryOutline"}
                onClick={onCloseModal}
                flex={1}
              >
                Discard
              </Button>
              <Button
                flex={1}
                onClick={onEditHandle}
                isLoading={saveSymptomAction.isLoading}
              >
                Save
              </Button>
            </HStack>
          }
        >
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onEditForm)}>
              <VStack>
                <FloatingLabelInput
                  label="Symptom"
                  name="name"
                  register={register}
                  error={errors.name?.message}
                />

                <FloatinglabelTextArea
                  label="Keywords"
                  name="keyword"
                  register={register}
                  rules={{
                    maxLength: {
                      value: 30,
                      message: "Keyword can be only be 30 characters long",
                    },
                  }}
                  error={errors.keyword?.message}
                />
              </VStack>
            </form>
          </FormProvider>
        </ModalComponent>
      )}

      {/* add modal */}

      {isSymptomsOpen && (
        <ModalComponent
          size="sm"
          isOpen={isSymptomsOpen}
          onClose={onCloseModal}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Add symptom</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button
                variant={"primaryOutline"}
                onClick={onCloseModal}
                flex={1}
                border="1px solid"
                fontWeight={400}
              >
                Discard
              </Button>
              <Button
                flex={1}
                onClick={() => {
                  onSaveSymptom();
                  // formMethods.reset();
                }}
                type="submit"
                isLoading={saveSymptomAction.isLoading}
              >
                Save
              </Button>
            </HStack>
          }
        >
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmitForm)}>
              <VStack>
                <FloatingLabelInput
                  label="Symptom"
                  name="name"
                  register={formMethods.register}
                  error={errors.name?.message}
                  required
                />

                <FloatinglabelTextArea
                  label="Keywords"
                  required
                  name="keyword"
                  register={register}
                  error={errors.keyword?.message}
                />
              </VStack>
            </form>
          </FormProvider>
        </ModalComponent>
      )}

      {isDeleteModalOpen && (
        <ModalComponent
          size="sm"
          isOpen={isDeleteModalOpen}
          onClose={onCloseDeleteModal}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Delete Symptom</Text>
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
                onClick={onDeleteSymptom}
                isLoading={deleteSymptomAction.isLoading}
              >
                Delete
              </Button>
            </HStack>
          }
        >
          <Box>
            Are you sure you want to delete symptom{" "}
            <Text fontWeight="bold" display="inline">
              {deleteSymptom?.name}
            </Text>
            ?
          </Box>
        </ModalComponent>
      )}

      <Grid display={"flex"} justifyContent={"space-between"}>
        <GridItem alignSelf={"end"}>
          <Text fontWeight="medium" fontSize={"2xl"}>
            Symptoms
          </Text>
        </GridItem>
        <GridItem display={"flex"}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color={colors.black} boxSize={3} />
            </InputLeftElement>
            <Input
              placeholder="Search"
              onChange={({ target: { value } }) => setSearchFilter(value)}
            />
          </InputGroup>
        </GridItem>
      </Grid>

      {isSuccess && (
        <DataTable
          columns={columns}
          data={data?.results ?? []}
          pagination={{
            manual: true,
            pageParams: { pageIndex, pageSize },
            pageCount: data?.page_count,
            onChangePagination: setPagination,
          }}
        />
      )}

      {isLoading && (
        <Center>
          <Spinner />
        </Center>
      )}
      {data?.count === 0 && <Box>No Result Found!</Box>}
    </Fragment>
  );
};

export default Symptoms;
