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
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import Checkbox from "@nepMeds/components/Form/Checkbox";

import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";

import Select, { ISelectOption } from "@nepMeds/components/Form/Select";

import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  SpecialistRate,
  useDeleteSpecialistRate,
  useSaveSpecialistRate,
  useSpecialistRateDataWithPagination,
  useUpdateSpecialistRate,
} from "@nepMeds/service/nepmeds-specialistRate";

import { colors } from "@nepMeds/theme/colors";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Symptom name is required!"),
  keyword: yup.string().required("Symptom keyword is required"),
});

type OnOpenFunction = () => void;

interface SpecialistRateProps {
  onCloseSpecialistRate: OnOpenFunction;
  isOpenSpecialistRate: boolean;
  activeTab: number;
}
const SpecialistRates = ({
  onCloseSpecialistRate,
  isOpenSpecialistRate,
  activeTab,
}: SpecialistRateProps) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [doctorName, setDoctorName] = useState<ISelectOption[]>([]);
  const { data } = useSpecialistRateDataWithPagination({
    activeTab,
    page_no: pageIndex + 1,
    page_size: pageSize,
  });

  const saveSpecialistRate = useSaveSpecialistRate(pageIndex + 1, pageSize, "");
  const updateSpecializationAction = useUpdateSpecialistRate(
    pageIndex + 1,
    pageSize,
    ""
  );
  // // const deleteBulkSpecialization = useDeleteBulkSpecialization();
  const deleteSpecializationAction = useDeleteSpecialistRate(
    pageIndex + 1,
    pageSize,
    ""
  );

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
  const [searchFilter, setSearchFilter] = useState("");
  // const [idDoctor, setIdDoctor] = useState<number>(0);

  const [deleteSpecialization, setDeleteSpecialization] = useState<any>(null);

  // const specializationList = specialization.map(s => ({
  //   label: s.name,
  //   value: s.id,
  // }));
  // const doctorName = data?.results?.map(x => setDoctorName(x.specialist_name));
  useEffect(() => {
    if (data?.results) {
      const result = data.results
        .map(x => {
          if (x.specialist_name !== undefined) {
            return { label: x.specialist_name, value: x.id };
          } else {
            return undefined;
          }
        })
        .filter(x => x !== undefined);
      setDoctorName(result as ISelectOption[]);
    }
  }, [data]);

  const formMethods = useForm({
    defaultValues: {
      id: null as number | null,

      doctorprofile: { label: "", value: 0 },
      rate: 0,
      specializations: [],
      is_general_rate: false,
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
      header: "Specialist Name",
      accessorKey: "specialist_name",
    },

    {
      header: "Specialization",
      cell: (cell: CellContext<SpecialistRate, any>) => {
        return (
          <HStack>
            {cell.row.original?.specialization?.map(s => (
              <Badge key={s.id} textTransform="initial" fontWeight="light">
                {s.name}
              </Badge>
            ))}
          </HStack>
        );
      },
    },
    {
      header: "Experience",
      accessorKey: "experience",
    },
    {
      header: "General Rate",
      accessorKey: "profile_status",
      cell: ({ row }: CellContext<{ is_general_rate: boolean }, any>) => {
        const { is_general_rate } = row.original;
        return (
          <Badge
            colorScheme={is_general_rate ? "green" : "red"}
            p={1}
            borderRadius={20}
            fontSize={11}
            w={24}
            textAlign="center"
            textTransform="capitalize"
          >
            {is_general_rate ? "Yes" : "No"}
          </Badge>
        );
      },
    },
    {
      header: "Actions",
      cell: (cell: CellContext<SpecialistRate, any>) => {
        return (
          <HStack justifyContent="center">
            <IconButton
              aria-label="edit"
              variant="ghost"
              size="sm"
              w="auto"
              onClick={() => {
                // formMethods.reset({
                //   ...cell.row.original,
                // specializations: cell.row.original.specialization?.map(s => ({
                //     label: s.name,
                //     value: s.id.toString(),
                //   })),
                // });
                // setIdDoctor(cell.row.original?.id || 0);

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
                setDeleteSpecialization(cell.row.original || "");
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
      // const isValid = formMethods.trigger();
      // if (!isValid) return;
      // const doctorprofileValues = formMethods.getValues("doctorprofile");

      // const doctorprofile = doctorprofileValues.value;
      await updateSpecializationAction.mutateAsync({
        doctorprofile: Number(formMethods.getValues("doctorprofile")) ?? 0,
        rate: formMethods.getValues("rate"),
        is_general_rate: formMethods.getValues("is_general_rate"),
      });
      onCloseEditModal();
      toastSuccess("Specialist Rate updated successfully!");
      formMethods.reset({
        is_general_rate: false,
        rate: 0,
      });
    } catch (error) {
      toastFail("Failed to update Specialization!");
    }
  };

  const onSaveSpecialistRate = async () => {
    try {
      // const isValid = formMethods.trigger();
      // if (!isValid) return;

      // console.log(
      //   formMethods.getValues("doctorprofile"),
      //   formMethods.getValues("rate"),
      //   "kkkk"
      // );
      // const doctorprofileValues = formMethods.getValues("doctorprofile");

      await saveSpecialistRate.mutateAsync({
        doctorprofile: Number(formMethods.getValues("doctorprofile")) ?? 0,

        rate: formMethods.getValues("rate"),

        is_general_rate: formMethods.getValues("is_general_rate") || false,
      });
      onCloseSpecialistRate();
      toastSuccess("Specialist Rate  saved successfully!");
      formMethods.reset({
        is_general_rate: false,
        rate: 0,
      });
    } catch (error) {
      toastFail("Failed to save Specialist Rate!");
    }
  };

  const ondeleteSpecialization = async () => {
    try {
      await deleteSpecializationAction.mutateAsync({
        doctorprofile: deleteSpecialization?.id || "",
      });
      onCloseDeleteModal();
      toastSuccess("Specialization deleted successfully!");
    } catch (error) {
      toastFail("Failed to delete symptom!");
    }
  };

  return (
    <Fragment>
      <Grid display={"flex"} justifyContent={"space-between"}>
        <GridItem alignSelf={"end"}>
          <Text fontWeight="medium" fontSize={"2xl"}>
            Specialist Rate
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
      <ModalComponent
        size="sm"
        isOpen={isEditModalOpen}
        onClose={() => {
          onCloseEditModal();
          // formMethods.reset({
          //   doctorprofile: 0,
          //   rate: 0,
          //   is_general_rate: false,
          // });
          formMethods.reset();
        }}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Edit Specialist Rate</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button
              variant="outline"
              onClick={() => {
                onCloseEditModal();
                // formMethods.reset({
                //   name: "",
                //   symptom: [],
                // });

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
              onClick={onEditSpecialization}
              background={colors.primary}
              color={colors.white}
              // isLoading={saveSpecializationAction.isLoading}
            >
              Save
            </Button>
          </HStack>
        }
      >
        <VStack alignItems={"end"}>
          <FormProvider {...formMethods}>
            <Select
              placeholder="Select Specialist"
              label="Select Specialist"
              name="doctorprofile"
              required
              register={formMethods.register}
              options={[...doctorName, { label: "hi", value: 2 }]}
              // selectControl={formMethods.control}
              isDisabled
            />
            <FloatingLabelInput
              label="Rate"
              name="rate"
              register={formMethods.register}
            />
            <Stack
              display={"flex"}
              flexDir={"row"}
              alignItems={"center"}
              h={"auto"}
            >
              <Text flexShrink={"0"} p={"10px"}>
                General Rate?
              </Text>

              <Checkbox
                // label="general Rate"
                name={"is_general_rate"}
                control={formMethods.control}
                justifyContent={"center"}
                alignItems={"center"}
              />
            </Stack>
          </FormProvider>
        </VStack>
      </ModalComponent>
      {/* // isRequired marginLeft={"80%"} // isRequired marginLeft={"80%"} */}
      {/* add modal */}
      <ModalComponent
        size="sm"
        isOpen={isOpenSpecialistRate}
        onClose={onCloseSpecialistRate}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Add Specialist Rate</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button
              variant="outline"
              onClick={onCloseSpecialistRate}
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
              onClick={() => {
                onSaveSpecialistRate();
                onCloseSpecialistRate();
              }}
              background={colors.primary}
              color={colors.white}
              // isLoading={saveSpecializationAction.isLoading}
            >
              Save
            </Button>
          </HStack>
        }
      >
        <VStack alignItems={"end"}>
          <FormProvider {...formMethods}>
            <Select
              placeholder="Select Specialist"
              label="Select Specialist"
              name="doctorprofile"
              required
              register={formMethods.register}
              options={doctorName}
              // selectControl={formMethods.control}
              // isDisabled
            />
            <FloatingLabelInput
              label="Rate"
              name="rate"
              register={formMethods.register}
            />
            <Stack
              display={"flex"}
              flexDir={"row"}
              alignItems={"center"}
              h={"auto"}
            >
              <Text flexShrink={"0"} p={"10px"}>
                General Rate?
              </Text>

              <Checkbox
                // label="general Rate"
                name={"is_general_rate"}
                control={formMethods.control}
                justifyContent={"center"}
                alignItems={"center"}
              />
            </Stack>
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
              // isLoading={deleteSpecializationAction.isLoading}
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
    </Fragment>
  );
};

export default SpecialistRates;
