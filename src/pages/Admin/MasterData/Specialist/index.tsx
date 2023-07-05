import { SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
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
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import MultiSelect from "@nepMeds/components/Form/MultiSelect";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  Specialization,
  useDeleteBulkSpecialization,
  useDeleteSpecialization,
  useSaveSpecialization,
  useSpecializationData,
  useUpdateSpecialization,
} from "@nepMeds/service/nepmeds-specialization";
import { useGetSymptoms } from "@nepMeds/service/nepmeds-symptoms";
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

const Specializations = () => {
  const { data: symptomList = [] } = useGetSymptoms();
  const { data: specialization = [] } = useSpecializationData();
  const saveSpecializationAction = useSaveSpecialization();
  const updateSpecializationAction = useUpdateSpecialization();
  const deleteBulkSpecialization = useDeleteBulkSpecialization();
  const deleteSpecializationAction = useDeleteSpecialization();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    isOpen: isBulkOpen,
    onClose: onCloseBulkModal,
    onOpen: onOpenBulkModal,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();
  const [searchFilter, setSearchFilter] = useState("");
  const [deleteSpecialization, setDeleteSpecialization] =
    useState<Specialization | null>(null);

  const symptomsOptions = symptomList.map(s => ({
    label: s.name,
    value: s.id,
  }));

  const formMethods = useForm({
    defaultValues: {
      id: null as number | null,
      name: "",
      symptom: [] as { label: string; value: string }[],
    },
    resolver: yupResolver(schema),
  });

  const columns = [
    {
      header: "S.N.",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return index + 1;
      },
    },
    {
      header: "Specialization Name",
      accessorKey: "name",
    },
    {
      header: "Symptom",
      cell: (cell: CellContext<Specialization, any>) => {
        return (
          <HStack>
            {cell.row.original.symptom.map(s => (
              <Badge key={s.keyword} textTransform="initial" fontWeight="light">
                {s.name}
              </Badge>
            ))}
          </HStack>
        );
      },
    },
    {
      header: "Actions",
      cell: (cell: CellContext<Specialization, any>) => {
        return (
          <HStack justifyContent="center">
            <IconButton
              aria-label="edit"
              variant="ghost"
              size="sm"
              w="auto"
              onClick={() => {
                formMethods.reset({
                  ...cell.row.original,
                  symptom: cell.row.original.symptom.map(s => ({
                    label: s.name,
                    value: s.id.toString(),
                  })),
                });
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
                setDeleteSpecialization(cell.row.original);
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

  const onEditSpecialization = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;
      const symptomValues = formMethods.getValues("symptom");
      const symptoms = symptomValues.map(
        (symptom: { label: string; value: string }) => ({
          id: parseInt(symptom.value),
          name: symptom.label,
          keyword: symptom.value,
        })
      );
      await updateSpecializationAction.mutateAsync({
        id: formMethods.getValues("id") ?? 0,
        data: {
          id: formMethods.getValues("id") ?? 0,
          name: formMethods.getValues("name"),
          consultation_fees: 3213123,
          symptom: symptoms,
        },
      });
      onClose();
      toastSuccess("Specialization updated successfully!");
    } catch (error) {
      toastFail("Failed to update Specialization!");
    }
  };

  const onSaveSpecialization = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;
      const symptomValues = formMethods.getValues("symptom");
      const symptoms = symptomValues.map(
        (symptom: { label: string; value: string }) => ({
          id: parseInt(symptom.value),
          name: symptom.label,
          keyword: symptom.value,
        })
      );
      await saveSpecializationAction.mutateAsync({
        name: formMethods.getValues("name"),
        consultation_fees: "3213123",
        symptom: symptoms,
      });
      onClose();
      toastSuccess("Specialization saved successfully!");
    } catch (error) {
      toastFail("Failed to save Specialization!");
    }
  };

  const ondeleteSpecialization = async () => {
    try {
      if (!deleteSpecialization?.id) return;

      await deleteSpecializationAction.mutateAsync({
        id: deleteSpecialization.id.toString(),
      });
      onCloseDeleteModal();
      toastSuccess("Specialization deleted successfully!");
    } catch (error) {
      toastFail("Failed to delete symptom!");
    }
  };
  const onBulkDelete = async (data: Specialization[]) => {
    const id = data.map(data => data.id);

    try {
      await deleteBulkSpecialization.mutateAsync({
        id: id,
      });
      onCloseBulkModal();
      toastSuccess("Specializations deleted successfully!");
    } catch (error) {
      toastFail("Failed to delete specialization!");
    }
  };

  return (
    <Fragment>
      <Grid display={"flex"} justifyContent={"space-between"}>
        <GridItem alignSelf={"end"}>
          <Text fontWeight="medium" fontSize={"2xl"}>
            Specializations
          </Text>
        </GridItem>

        <GridItem display={"flex"}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" boxSize={3} />
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
              fontWeight="light"
              borderRadius={7}
              onClick={() => {
                onOpen();
                formMethods.reset({});
              }}
            >
              <IoAdd /> Add Specialization
            </CustomButton>
          </Box>
        </GridItem>
      </Grid>
      <DataTable
        columns={columns}
        data={specialization}
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
              {formMethods.getValues("name") ? "Edit" : "Add"} Specialization
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
              onClick={
                formMethods.getValues("name")
                  ? onEditSpecialization
                  : onSaveSpecialization
              }
              background={colors.primary}
              color={colors.white}
              isLoading={saveSpecializationAction.isLoading}
            >
              Save
            </Button>
          </HStack>
        }
      >
        <VStack>
          <FormProvider {...formMethods}>
            <FloatingLabelInput
              label="Specialization"
              name="name"
              register={formMethods.register}
            />

            <MultiSelect
              placeholder=""
              label="Symptoms"
              name="symptom"
              required
              register={formMethods.register}
              options={symptomsOptions}
              selectControl={formMethods.control}
            />
          </FormProvider>
        </VStack>
      </ModalComponent>

      {/* delete modal */}

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
              onClick={ondeleteSpecialization}
              borderColor={colors.red}
              color={colors.red}
              isLoading={deleteSpecializationAction.isLoading}
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
            {deleteSpecialization?.name}
          </Text>
          ?
        </Text>
      </ModalComponent>

      {/* bulk delete modal */}
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
              onClick={() => onBulkDelete(specialization)}
              borderColor={colors.red}
              color={colors.red}
              isLoading={deleteBulkSpecialization.isLoading}
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

export default Specializations;
