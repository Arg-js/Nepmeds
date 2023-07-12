import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
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
import {
  Symptom,
  // useDeleteBulkSymptoms,
  useDeleteSymptom,
  useSaveSymptoms,
  useSymptomsDataWithPagination,
} from "@nepMeds/service/nepmeds-symptoms";
import { colors } from "@nepMeds/theme/colors";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Symptom name is required!"),
  keyword: yup.string().required("Symptom keyword is required"),
});

type OnOpenFunction = () => void;

interface SymptomsProps {
  onCloseSymptoms: OnOpenFunction;
  isSymptomsOpen: boolean;
}

const Symptoms = ({ onCloseSymptoms, isSymptomsOpen }: SymptomsProps) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data } = useSymptomsDataWithPagination({
    page_no: pageIndex + 1,
    page_size: pageSize,
    name: "",
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

  const [deleteSymptom, setDeleteSymptom] = useState<Symptom | null>(null);
  const [searchFilter, setSearchFilter] = useState("");

  const formMethods = useForm({
    defaultValues: {
      id: null as number | null,
      name: "",
      keyword: "",
    },
    resolver: yupResolver(schema),
  });

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

  const onEditSymptom = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;

      await saveSymptomAction.mutateAsync({
        id: formMethods.getValues("id")?.toString() || null,
        name: formMethods.getValues("name"),
        keyword: formMethods.getValues("keyword"),
      });
      onCloseEditModal();
      toastSuccess("Symptom saved successfully!");
      formMethods.reset({});
    } catch (error) {
      toastFail("Failed to save symptom!");
    }
  };

  const onSaveSymptom = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;

      await saveSymptomAction.mutateAsync({
        id: null,
        name: formMethods.getValues("name"),
        keyword: formMethods.getValues("keyword"),
      });
      onCloseSymptoms();
      toastSuccess("Symptom saved successfully!");
      formMethods.reset({});
    } catch (error) {
      toastFail("Failed to save symptom!");
    }
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
  // const onBulkDelete = async (data: Symptom[]) => {
  //   const id = data.map(data => data.id);

  //   try {
  //     await deleteBulkSymptom.mutateAsync({
  //       id: id,
  //     });
  //     onCloseBulkModal();
  //     toastSuccess("Symptoms deleted successfully!");
  //   } catch (error) {
  //     toastFail("Failed to delete symptom!");
  //   }
  // };
  return (
    <Fragment>
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
              placeholder="search"
              onChange={({ target: { value } }) => setSearchFilter(value)}
            />
          </InputGroup>
          {/* <Box ml={1}>
            <Menu>
              <MenuButton as={Button} variant={"outline"}>
                <Text
                  display={"flex"}
                  alignItems={"center"}
                  fontWeight={400}
                  color={colors.light_gray}
                >
                  {" "}
                  Bulk Action{" "}
                  <IoChevronDownOutline style={{ marginLeft: "10px" }} />
                </Text>
              </MenuButton>
              <MenuList onClick={onOpenBulkModal}>
                <MenuItem>Bulk Delete </MenuItem>
              </MenuList>
            </Menu>
          </Box> */}
        </GridItem>
      </Grid>

      <DataTable
        columns={columns}
        data={data?.results ?? []}
        filter={{ globalFilter: searchFilter }}
        pagination={{
          manual: true,
          pageParams: { pageIndex, pageSize },
          pageCount: data?.page_count,
          onChangePagination: setPagination,
        }}
      />

      {/* edit modal */}
      {isEditModalOpen && (
        <ModalComponent
          size="sm"
          isOpen={isEditModalOpen}
          onClose={() => {
            onCloseEditModal();
            formMethods.reset({});
          }}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Edit Symptom</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button
                variant="outline"
                onClick={() => {
                  onCloseEditModal();
                  formMethods.reset({});
                }}
                flex={1}
                border="1px solid"
                borderColor={colors.primary}
                color={colors.primary}
                fontWeight={400}
              >
                Discard
              </Button>
              <Button
                flex={1}
                onClick={onEditSymptom}
                background={colors.primary}
                color={colors.white}
                isLoading={saveSymptomAction.isLoading}
              >
                Save
              </Button>
            </HStack>
          }
        >
          <VStack>
            <FormProvider {...formMethods}>
              <FloatingLabelInput
                label="Symptom"
                name="name"
                register={formMethods.register}
              />

              <FloatinglabelTextArea
                label="Keywords"
                name="keyword"
                register={formMethods.register}
              />
            </FormProvider>
          </VStack>
        </ModalComponent>
      )}

      {/* add modal */}

      {isSymptomsOpen && (
        <ModalComponent
          size="sm"
          isOpen={isSymptomsOpen}
          onClose={onCloseSymptoms}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Add symptom</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button
                variant="outline"
                onClick={onCloseSymptoms}
                flex={1}
                border="1px solid"
                borderColor={colors.primary}
                color={colors.primary}
                fontWeight={400}
              >
                Discard
              </Button>
              <Button
                flex={1}
                onClick={onSaveSymptom}
                background={colors.primary}
                color={colors.white}
                isLoading={saveSymptomAction.isLoading}
              >
                Save
              </Button>
            </HStack>
          }
        >
          <VStack>
            <FloatingLabelInput
              label="Symptom"
              name="name"
              register={formMethods.register}
            />

            <FloatinglabelTextArea
              label="Keywords"
              name="keyword"
              register={formMethods.register}
            />
          </VStack>
        </ModalComponent>
      )}

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
            <Button variant="outline" onClick={onCloseDeleteModal} flex={1}>
              Cancel
            </Button>
            <Button
              flex={1}
              onClick={onDeleteSymptom}
              borderColor={colors.red}
              color={colors.red}
              isLoading={deleteSymptomAction.isLoading}
              variant="outline"
            >
              Delete
            </Button>
          </HStack>
        }
      >
        <Text>
          Are you sure you want to delete symptom{" "}
          <Text fontWeight="bold" display="inline">
            {deleteSymptom?.name}
          </Text>
          ?
        </Text>
      </ModalComponent>

      {/* bulk modal */}
      {/* <ModalComponent
        size="sm"
        isOpen={isBulkOpen}
        onClose={onCloseBulkModal}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Bulk Delete Symptoms</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button variant="outline" onClick={onCloseBulkModal} flex={1}>
              Cancel
            </Button>
            <Button
              flex={1}
              onClick={() => onBulkDelete(symptomList)}
              borderColor={colors.red}
              color={colors.red}
              isLoading={deleteBulkSymptom.isLoading}
              variant="outline"
            >
              Delete
            </Button>
          </HStack>
        }
      >
        <Text>Are you sure you want to delete all the symptoms </Text>
      </ModalComponent> */}
    </Fragment>
  );
};

export default Symptoms;
