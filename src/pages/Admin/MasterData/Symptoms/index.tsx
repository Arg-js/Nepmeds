import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { svgs } from "@nepMeds/assets/svgs";
import { CustomButton } from "@nepMeds/components/Button/Button";
import { DataTable } from "@nepMeds/components/DataTable";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  Symptom,
  useDeleteBulkSymptoms,
  useDeleteSymptom,
  useGetSymptoms,
  useSaveSymptoms,
} from "@nepMeds/service/nepmeds-symptoms";
import { colors } from "@nepMeds/theme/colors";
import { CellContext } from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoAdd, IoChevronDownOutline } from "react-icons/io5";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Symptom name is required!"),
  keyword: yup.string().required("Symptom keyword is required"),
});

const Symptoms = () => {
  const { data: symptomList = [] } = useGetSymptoms();
  const saveSymptomAction = useSaveSymptoms();
  const deleteSymptomAction = useDeleteSymptom();
  const deleteBulkSymptom = useDeleteBulkSymptoms();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();

  const {
    isOpen: isBulkOpen,
    onClose: onCloseBulkModal,
    onOpen: onOpenBulkModal,
  } = useDisclosure();

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
                formMethods.reset(cell.row.original);
                onOpen();
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

  const onSaveSymptom = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;

      await saveSymptomAction.mutateAsync({
        id: formMethods.getValues("id")?.toString() || null,
        name: formMethods.getValues("name"),
        keyword: formMethods.getValues("keyword"),
      });
      onClose();
      toastSuccess("Symptom saved successfully!");
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
  const onBulkDelete = async (data: Symptom[]) => {
    const id = data.map(data => data.id);

    try {
      await deleteBulkSymptom.mutateAsync({
        id: id,
      });
      onCloseBulkModal();
      toastSuccess("Symptoms deleted successfully!");
    } catch (error) {
      toastFail("Failed to delete symptom!");
    }
  };
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
          <Box ml={1}>
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
          </Box>
          <Box ml={1}>
            <CustomButton
              backgroundColor={colors.primary}
              borderRadius={7}
              fontWeight="light"
              onClick={() => {
                onOpen();
                formMethods.reset({});
              }}
            >
              <IoAdd /> Add Symptom
            </CustomButton>
          </Box>
        </GridItem>
      </Grid>

      <DataTable
        columns={columns}
        data={symptomList}
        filter={{ globalFilter: searchFilter }}
        pagination={{
          pageParams: {
            pageIndex: 1,
            pageSize: 5,
          },
          pageCount: 20,
        }}
      />

      <ModalComponent
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>
              {formMethods.getValues("name") ? "Edit" : "Add"} Symptom
            </Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button
              variant="outline"
              onClick={onClose}
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
      <ModalComponent
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
      </ModalComponent>
    </Fragment>
  );
};

export default Symptoms;
