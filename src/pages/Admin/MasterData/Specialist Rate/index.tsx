import {
  Badge,
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Spinner,
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

import Select from "@nepMeds/components/Form/Select";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  SpecialistRate,
  fetchDoctorList,
  useDeleteSpecialistRate,
  useFetchSpecialistRateById,
  useSaveSpecialistRate,
  useSpecialistRateDataWithPagination,
  useUpdateSpecialistRate,
} from "@nepMeds/service/nepmeds-specialistRate";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { useEffect } from "react";

import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { colors } from "@nepMeds/theme/colors";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import * as yup from "yup";
import SearchInput from "@nepMeds/components/Search";

const schema = yup.object().shape({
  doctorprofile: yup.string().trim().required("Doctor is required!"),
  rate: yup.mixed().required("Rate is required"),
});

type OnOpenFunction = () => void;

interface SpecialistRateProps {
  onCloseSpecialistRate: OnOpenFunction;
  isOpenSpecialistRate: boolean;
  activeTab: number;
}

const EditModalComponent = ({
  doctorId,
  disclosure,
  updateQuery,
}: {
  doctorId: string;
  disclosure: any;
  updateQuery: any;
}) => {
  const form = useForm({
    defaultValues: {
      doctorprofile: "",
      rate: "",
      is_general_rate: false,
    },
  });

  const { data, isLoading } = useFetchSpecialistRateById(doctorId);

  useEffect(() => {
    if (data && !isLoading) {
      form.setValue("doctorprofile", String(data?.id));
      form.setValue("rate", String(data?.rate));
      form.setValue(
        "is_general_rate",
        String(data?.is_general_rate) === "true"
      );
    }
  }, [data, isLoading]);

  const onEditSpecialization = async () => {
    try {
      await updateQuery.mutateAsync({
        doctorprofile: doctorId,
        rate: form.getValues("rate").toString(),
        is_general_rate: form.getValues("is_general_rate"),
      });
      disclosure?.onClose();
      toastSuccess("Specialist Rate updated successfully!");
      form.reset({});
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
  };

  return (
    <ModalComponent
      size="sm"
      isOpen={disclosure?.isOpen}
      onClose={() => {
        disclosure?.onClose();

        form.reset({});
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
            variant={"primaryOutline"}
            onClick={() => {
              disclosure?.onClose();

              form.reset({});
            }}
            flex={1}
          >
            Discard
          </Button>
          <Button
            flex={1}
            onClick={onEditSpecialization}
            // isLoading={onSaveSpecialistRate.isLoading}
          >
            Save
          </Button>
        </HStack>
      }
    >
      <VStack alignItems={"end"}>
        <FloatingLabelInput
          name="specialist"
          register={form.register}
          value={data?.specialist_name}
          isDisabled
          label="Specialist"
          required
        />

        <FloatingLabelInput
          name="rate"
          register={form.register}
          defaultValue={data?.rate?.toString()}
          onChange={e => form.setValue("rate", e.target.value)}
          label="Rate"
        />

        <HStack
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
            control={form.control}
            justifyContent={"center"}
            alignItems={"center"}
            defaultChecked={String(data?.is_general_rate) === "true"}

            // value={data?.results[idDoctor].is_general_rate}

            // defaultValue={data?.results[idDoctor].is_general_rate}
          />
        </HStack>
      </VStack>
    </ModalComponent>
  );
};

const SpecialistRates = ({
  onCloseSpecialistRate,
  isOpenSpecialistRate,
  activeTab,
}: SpecialistRateProps) => {
  const editDisclosure = useDisclosure();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchFilter, setSearchFilter] = useState("");
  const debouncedInputValue = useDebounce(searchFilter, 500);
  const { data, isLoading, isSuccess } = useSpecialistRateDataWithPagination({
    activeTab,
    page_no: pageIndex + 1,
    page_size: pageSize,
    name: debouncedInputValue,
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

  const { data: doctorList } = fetchDoctorList();

  const {
    isOpen: isDeleteModalOpen,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();

  const [idDoctor, setIdDoctor] = useState<number>(0);

  const [deleteSpecialization, setDeleteSpecialization] = useState<any>(null);

  const doctorNames =
    doctorList?.map(s => ({
      label: s.name ?? "",
      value: s.id ?? 0,
    })) || [];

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
                setIdDoctor(cell.row.original?.id || 0);
                setDeleteSpecialization(cell.row.original || "");

                editDisclosure.onOpen();
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

  const formMethods = useForm({
    defaultValues: {
      id: null as number | null,

      doctorprofile: "",
      rate: "",
      specializations: [],
      is_general_rate: false,
    },
    resolver: yupResolver(schema),
  });
  const {
    formState: { errors },
  } = formMethods;

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

  const onSubmitFrom = async () => {
    try {
      await saveSpecialistRate.mutateAsync({
        doctorprofile: Number(formMethods.getValues("doctorprofile")) ?? 0,
        rate: formMethods.getValues("rate"),
        is_general_rate: formMethods.getValues("is_general_rate"),
      });
      onCloseSpecialistRate();
      toastSuccess("Specialist Rate  saved successfull");
      formMethods.reset({});
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
  };

  return (
    <Fragment>
      <EditModalComponent
        disclosure={editDisclosure}
        doctorId={idDoctor.toString()}
        updateQuery={updateSpecializationAction}
      />
      {/* Add Modal */}
      <ModalComponent
        size="sm"
        isOpen={isOpenSpecialistRate}
        onClose={() => {
          onCloseSpecialistRate();
          formMethods.reset({});
        }}
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
              onClick={() => {
                onCloseSpecialistRate();
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
              onClick={formMethods.handleSubmit(onSubmitFrom)}
              background={colors.primary}
              color={colors.white}
              isLoading={saveSpecialistRate.isLoading}
            >
              Save
            </Button>
          </HStack>
        }
      >
        <VStack alignItems={"end"}>
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmitFrom)}
              style={{ width: "100%" }}
            >
              <Select
                placeholder="Select Specialist"
                label="Select Specialist"
                name="doctorprofile"
                required
                register={formMethods.register}
                options={doctorNames}
                error={errors.doctorprofile?.message}
                mb={3}
              />
              <FloatingLabelInput
                label="Rate"
                name="rate"
                register={formMethods.register}
                required
                type="number"
                error={errors.rate?.message}
              />
              <HStack h={"auto"} justifyContent={"end"}>
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
              </HStack>
            </form>
          </FormProvider>
        </VStack>
      </ModalComponent>
      {/* Delete Modal */}
      <ModalComponent
        size="sm"
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Delete Specialist Rate</Text>
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
              onClick={ondeleteSpecialization}
              isLoading={deleteSpecializationAction.isLoading}
            >
              Delete
            </Button>
          </HStack>
        }
      >
        <Text>
          Are you sure you want to delete Specialist Rate{" "}
          <Text fontWeight="bold" display="inline">
            {deleteSpecialization?.name}
          </Text>
          ?
        </Text>
      </ModalComponent>

      <Grid display={"flex"} justifyContent={"space-between"}>
        <GridItem alignSelf={"end"}>
          <Text fontWeight="medium" fontSize={"2xl"}>
            Specialist Rate
          </Text>
        </GridItem>

        <GridItem display={"flex"}>
          <SearchInput
            setSearchValue={setSearchFilter}
            setPageParams={setPagination}
          />
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

export default SpecialistRates;
