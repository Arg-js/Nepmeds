import { SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
  Box,
  Flex,
  FormLabel,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FormControl from "@nepMeds/components/Form/FormControl";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import MultiSelect, { IOptionItem } from "@nepMeds/components/Form/MultiSelect";
import SimpleImageUpload from "@nepMeds/components/SimpleImageUpload";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import {
  Specialization,
  // useDeleteBulkSpecialization,
  useDeleteSpecialization,
  useSaveSpecialization,
  useSpecializationData,
  useUpdateSpecialization,
} from "@nepMeds/service/nepmeds-specialization";
import { useGetSymptoms } from "@nepMeds/service/nepmeds-symptoms";
import { colors } from "@nepMeds/theme/colors";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import * as yup from "yup";

const defaultValues = {
  id: null as number | null,
  name: "",
  image: "" as string | null,
  symptom: [] as IOptionItem[],
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Specialization is required!")

    .max(30, "Specialist name can be 30 characters long"),
  image: yup.string().required("Image is required"),
  symptom: yup.array().min(1, "Symptom keyword is required"),
});

type OnOpenFunction = () => void;

interface SpecializationProps {
  onCloseSpecialization: OnOpenFunction;
  isSpecializationOpen: boolean;
  activeTab: number;
}
const Specializations = ({
  onCloseSpecialization,
  isSpecializationOpen,
  activeTab,
}: SpecializationProps) => {
  const { data: symptomList = [] } = useGetSymptoms();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchFilter, setSearchFilter] = useState("");
  const [deleteSpecialization, setDeleteSpecialization] =
    useState<Specialization | null>(null);
  const debouncedInputValue = useDebounce(searchFilter, 500);

  const { data, isFetching } = useSpecializationData({
    activeTab,
    page: pageIndex + 1,
    page_size: pageSize,
    name: debouncedInputValue,
  });
  const saveSpecializationAction = useSaveSpecialization();
  const updateSpecializationAction = useUpdateSpecialization();
  // const deleteBulkSpecialization = useDeleteBulkSpecialization();
  const deleteSpecializationAction = useDeleteSpecialization();

  // const {
  //   isOpen: isBulkOpen,
  //   onClose: onCloseBulkModal,
  //   onOpen: onOpenBulkModal,
  // } = useDisclosure();
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

  const closeModal = () => {
    formMethods.reset(defaultValues);
    onCloseEditModal();
    onCloseDeleteModal();
    onCloseSpecialization();
  };

  const symptomsOptions = symptomList?.map(s => ({
    label: s.name,
    value: s.id,
  }));

  const formMethods = useForm({
    defaultValues,

    resolver: yupResolver(schema),
  });

  const {
    formState: { errors },
  } = formMethods;

  const specializationImageWatch = formMethods.watch("image") || "";

  const columns = [
    {
      header: "S.N.",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return `${pageIndex * pageSize + (index + 1)}.`;
      },
    },
    {
      header: "Specialization Name",
      accessorKey: "name",
    },
    {
      header: "Symptom",
      accessorKey: "symptom_list",
      cell: (cell: CellContext<Specialization, any>) => {
        return (
          <HStack>
            {cell.row.original.symptom_list?.slice(0, 6)?.map(s => (
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
      accessorKey: "id",
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
                  symptom:
                    cell?.row?.original?.symptom_list &&
                    cell?.row?.original?.symptom_list.map(s => ({
                      label: s.name,
                      value: s.id.toString(),
                    })),
                });
                onOpenEditModal();
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

  const onEditForm = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;
      const symptomValues = formMethods.getValues("symptom");
      const symptoms = symptomValues.map(symptom => symptom.value);
      await updateSpecializationAction.mutateAsync({
        id: formMethods.getValues("id") ?? 0,

        name: formMethods.getValues("name"),
        image: formMethods.getValues("image") as string,
        consultation_fees: 3213123,
        symptom: symptoms,
      });
      closeModal();
      toastSuccess("Specialization updated successfully!");
    } catch (error) {
      toastFail("Failed to update Specialization!");
    }
  };

  const onSubmitForm = async () => {
    try {
      const symptomValues = formMethods.getValues("symptom");
      const symptoms = symptomValues.map(symptom => symptom.value);
      await saveSpecializationAction.mutateAsync({
        name: formMethods.getValues("name"),
        consultation_fees: "3213123",
        symptom: symptoms,
        image: formMethods.getValues("image") as string,
      });
      closeModal();
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
      closeModal();
      toastSuccess("Specialization deleted successfully!");
    } catch (error) {
      toastFail("Failed to delete symptom!");
    }
  };
  // const onBulkDelete = async (data: Specialization[]) => {
  //   const id = data.map(data => data.id);

  //   try {
  //     await deleteBulkSpecialization.mutateAsync({
  //       id: id,
  //     });
  //     onCloseBulkModal();
  //     toastSuccess("Specializations deleted successfully!");
  //   } catch (error) {
  //     toastFail("Failed to delete specialization!");
  //   }
  // };

  return (
    <Fragment>
      {/* edit modal */}
      <ModalComponent
        size="md"
        isOpen={isEditModalOpen}
        onClose={closeModal}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Edit Specialization</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button variant={"primaryOutline"} onClick={closeModal} flex={1}>
              Discard
            </Button>
            <Button
              flex={1}
              onClick={formMethods.handleSubmit(onEditForm)}
              isLoading={updateSpecializationAction.isLoading}
            >
              Save
            </Button>
          </HStack>
        }
      >
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onEditForm)}>
            <Flex direction={"column"} gap={3}>
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

              <Box>
                <FormLabel fontWeight={400} fontSize={"sm"}>
                  <Flex>
                    Image <Text color={colors.error}>*</Text>
                  </Flex>
                </FormLabel>
                <FormControl
                  register={formMethods.register}
                  type={"file"}
                  control={"input"}
                  name="image"
                  display="none"
                  id="image"
                />
                <SimpleImageUpload
                  imgSrc={specializationImageWatch}
                  onImageRemove={() => formMethods.setValue("image", "")}
                  errorMessage={errors.image?.message || ""}
                />
              </Box>
            </Flex>
          </form>
        </FormProvider>
      </ModalComponent>

      {/* add modal */}
      <ModalComponent
        size="md"
        isOpen={isSpecializationOpen}
        onClose={closeModal}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Add Specialization</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button variant="primaryOutline" onClick={closeModal} flex={1}>
              Discard
            </Button>
            <Button
              flex={1}
              onClick={formMethods.handleSubmit(onSubmitForm)}
              isLoading={saveSpecializationAction.isLoading}
            >
              Save
            </Button>
          </HStack>
        }
      >
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmitForm)}>
            <Flex direction={"column"} gap={3}>
              <FloatingLabelInput
                label="Specialization"
                name="name"
                register={formMethods.register}
                error={errors.name?.message}
                required
              />

              <MultiSelect
                placeholder=""
                label="Symptoms"
                name="symptom"
                required
                register={formMethods.register}
                error={errors.symptom?.message}
                options={symptomsOptions}
                selectControl={formMethods.control}
              />
              <Box>
                <FormLabel fontWeight={400} fontSize={"sm"}>
                  <Flex>
                    Image <Text color={colors.error}>*</Text>
                  </Flex>
                </FormLabel>
                <FormControl
                  register={formMethods.register}
                  type={"file"}
                  control={"input"}
                  name="image"
                  display="none"
                  id="image"
                />
                <SimpleImageUpload
                  imgSrc={specializationImageWatch}
                  onImageRemove={() => formMethods.setValue("image", "")}
                  errorMessage={errors.image?.message || ""}
                />
              </Box>
            </Flex>
          </form>
        </FormProvider>
      </ModalComponent>

      {/* delete modal */}

      <ModalComponent
        size="sm"
        isOpen={isDeleteModalOpen}
        onClose={closeModal}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Delete Specialization</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button variant={"primaryOutline"} onClick={closeModal} flex={1}>
              Cancel
            </Button>
            <Button
              flex={1}
              variant={"reset"}
              onClick={ondeleteSpecialization}
              isLoading={deleteSpecializationAction.isLoading}
            >
              Delete
            </Button>
          </HStack>
        }
      >
        <Text>
          Are you sure you want to delete specialization{" "}
          <Text fontWeight="bold" display="inline">
            {deleteSpecialization?.name}
          </Text>
          ?
        </Text>
      </ModalComponent>

      <Grid display={"flex"} justifyContent={"space-between"}>
        <GridItem alignSelf={"end"}>
          <Text fontWeight="medium" fontSize={"2xl"}>
            Specialization
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
        isLoading={isFetching}
        pagination={{
          manual: true,
          pageParams: { pageIndex, pageSize },
          pageCount: data?.page_count,
          onChangePagination: setPagination,
        }}
      />
    </Fragment>
  );
};

export default Specializations;
