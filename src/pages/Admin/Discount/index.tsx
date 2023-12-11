import {
  Button,
  Flex,
  HStack,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "@nepMeds/components/DataTable";
import { columns } from "@nepMeds/components/DataTable/Columns/Admin/Discount";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import SearchInput from "@nepMeds/components/Search";
import TableWrapper from "@nepMeds/components/TableWrapper";
import { toastSuccess } from "@nepMeds/components/Toast";
import { AmountType } from "@nepMeds/config/enum";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import {
  useCreateDiscount,
  useDeleteDiscount,
  useGetDiscount,
  useGetDiscountById,
  useUpdateDiscount,
} from "@nepMeds/service/nepmeds-discount";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import * as yup from "yup";
import DiscountForm from "./DiscountForm";

export type IOptionItem = { label: string; value: number };

const defaultValues = {
  title: "",
  // TODO: check if this is the correct way
  specialization: [] as IOptionItem[],
  doctor: [] as IOptionItem[],
  // discount_type: null as unknown as { label: string; value: AmountType },
  discount_type: { label: "", value: "" as AmountType },
  value: "",
  code: "",
  start_date: "",
  end_date: "",
  is_active: false,
  onetime_coupon: false,
  coupon_applicable_number: "",
};

const schema = yup.object().shape({
  title: yup.string().required("This field is required"),
  // TODO: remove this after the QA approval
  // discount_type: yup.mixed().required("This field is required"),
  discount_type: yup.object().shape({
    label: yup.string().required("This field is required"),
  }),
  value: yup
    .string()
    .matches(/^[0-9]*$/, "Please enter a valid number")
    .required("This field is required"),
  code: yup.string().required("This field is required"),
  start_date: yup.string().required("This field is required"),
  end_date: yup.string().required("This field is required"),
});

const Discount = () => {
  // Note: status will automatically set to active once new discount is created, hence its marked 'true'
  const [isStatus, setIsStatus] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const debouncedInputValue = useDebounce(searchValue, 500);

  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset } = formMethods;

  const {
    isOpen: isSwitchOpen,
    onOpen: onSwitchOpen,
    onClose: onSwitchClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const onModalClose = () => {
    setIsEdit(false);
    setIsStatus(true);
    setId("");
    reset(defaultValues);
    onClose();
    onDeleteModalClose();
    onSwitchClose();
  };

  // React Query
  const { data: discounts, isFetching } = useGetDiscount({
    page: pageParams.pageIndex,
    page_size: pageParams.pageSize,
    search: debouncedInputValue,
  });

  const { mutateAsync: createDiscount, isLoading: isCreating } =
    useCreateDiscount();
  const { mutateAsync: updateDiscount, isLoading: isUpdating } =
    useUpdateDiscount();
  const { data: discount, isLoading } = useGetDiscountById({ id });
  const { mutateAsync: deleteDiscount, isLoading: isDeleting } =
    useDeleteDiscount();
  // React Query Ends

  //  TODO:onSubmitHandler and onStatusUpdate both has updateDiscount
  const onSubmitHandler = async (data: typeof defaultValues) => {
    try {
      const request = {
        ...data,
        discount_type: data.discount_type.value,
        doctor: data?.doctor?.map(({ value }) => value),
        specialization: data?.specialization?.map(({ value }) => value),
        // TODO: try avoid conversion, such conversion is required since input field always returns string value
        value: +data?.value,
        coupon_applicable_number: +data.coupon_applicable_number,
      };
      if (isEdit) {
        await updateDiscount({
          ...request,
          id: +id,
          // Note: status will automatically set to active once new discount is created
          is_active: isStatus,
        });
        toastSuccess("Discount updated successfully");
      } else {
        await createDiscount({
          ...request,
          is_active: true,
        });
      }
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };

  const onStatusUpdate = async () => {
    try {
      await updateDiscount({ id: +id, is_active: !isStatus });
      toastSuccess("Discount status updated successfully");
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isEdit && discount) {
      reset({
        ...discount,
        value: discount?.value?.toString(),
        coupon_applicable_number:
          discount?.coupon_applicable_number?.toString(),
        // TODO: move this conversion logic
        discount_type: {
          label:
            discount.discount_type === AmountType.PERCENTAGE
              ? "Percentage"
              : "Amount",
          value: discount.discount_type,
        },
        specialization: discount?.specialization_list?.map(({ id, name }) => ({
          label: name,
          value: id,
        })),
        doctor: discount?.doctor_list?.map(({ name, id }) => ({
          label: name,
          value: id,
        })),
      });
    }
  }, [isEdit, discount]);

  return (
    <>
      {/* Status Modal */}
      <ModalComponent
        heading={<>Status</>}
        isOpen={isSwitchOpen}
        onClose={onModalClose}
        footer={
          <>
            <Button variant={"reset"} flex={1} onClick={onModalClose}>
              No
            </Button>
            <Button
              flex={1}
              isLoading={isUpdating}
              onClick={async () => {
                setIsEdit(true);
                await onStatusUpdate();
              }}
            >
              Yes
            </Button>
          </>
        }
      >
        <Text textAlign={"center"}>
          Are you sure you want to update the status?
        </Text>
      </ModalComponent>
      {/* Status Modal Ends*/}

      {/* ADD and Edit Modal */}
      <ModalComponent
        size={"xl"}
        heading={<>{isEdit ? "Edit" : "Create"}</>}
        isOpen={isOpen}
        onClose={onModalClose}
        footer={
          <>
            <Button variant={"reset"} flex={1} onClick={onModalClose}>
              Cancel
            </Button>
            <Button
              flex={1}
              isLoading={isUpdating || isCreating}
              isDisabled={isLoading}
              onClick={handleSubmit(onSubmitHandler)}
            >
              {isEdit ? "Edit" : "Create"}
            </Button>
          </>
        }
      >
        {isLoading ? (
          <VStack>
            <Spinner />
          </VStack>
        ) : (
          <FormProvider {...formMethods}>
            <DiscountForm formMethods={formMethods} />
          </FormProvider>
        )}
      </ModalComponent>
      {/* ADD and Edit Modal Ends */}

      {/* Delete Modal */}
      <ModalComponent
        heading={<>Delete</>}
        isOpen={isDeleteModalOpen}
        onClose={onModalClose}
        footer={
          <>
            <Button variant={"reset"} onClick={onModalClose} flex={1}>
              Cancel
            </Button>
            <Button
              flex={1}
              isLoading={isDeleting}
              onClick={async () => {
                await deleteDiscount({ id });
                onModalClose();
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <Text textAlign={"center"}>Are you sure you want to delete?</Text>
      </ModalComponent>
      {/* Delete Modal Ends*/}

      <TableWrapper>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text variant={"tableHeading"}>Discount </Text>
          <HStack>
            <SearchInput
              setSearchValue={setSearchValue}
              setPageParams={setPageParams}
            />
            <Button leftIcon={<IoAdd />} onClick={() => onOpen()}>
              Create Discount
            </Button>
          </HStack>
        </Flex>
        <DataTable
          data={discounts?.results ?? []}
          columns={columns({
            setIsStatus,
            setIsEdit,
            setId,
            onSwitchOpen,
            onDeleteModalOpen,
            onOpen,
            pageParams,
          })}
          isLoading={isFetching}
          pagination={{
            manual: true,
            pageParams: pageParams,
            pageCount: discounts?.page_count,
            onChangePagination: setPageParams,
          }}
        />
      </TableWrapper>
    </>
  );
};

export default Discount;
