import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "@nepMeds/components/DataTable";
import { columns } from "@nepMeds/components/DataTable/Columns/Admin/Discount";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { AmountType } from "@nepMeds/config/enum";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import {
  useCreateDiscount,
  useDeleteDiscount,
  useGetDiscount,
  useGetDiscountById,
  useUpdateDiscount,
} from "@nepMeds/service/nepmeds-discount";
import { colors } from "@nepMeds/theme/colors";
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
  discount_type: null as unknown as { label: string; value: AmountType },
  value: "",
  code: "",
  start_date: "",
  end_date: "",
  is_active: false,
};

const schema = yup.object().shape({
  title: yup.string().required("This field is required"),
  discount_type: yup.mixed().required("This field is required"),
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
      };
      if (isEdit) {
        await updateDiscount({
          ...request,
          id: +id,
          // Note: status will automatically set to active once new discount is created
          is_active: isStatus,
        });
      } else {
        await createDiscount({ ...request, is_active: true });
      }
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };

  const onStatusUpdate = async () => {
    try {
      await updateDiscount({ id: +id, is_active: !isStatus });
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
        heading={<>{isEdit ? "Edit" : "Add"}</>}
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
              {isEdit ? "Edit" : "Add"}
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

      <WrapperBox
        style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}
      >
        <>
          {/* TODO: make a generic search component */}
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text variant={"tableHeading"}>Discount </Text>
            <HStack>
              <InputGroup borderColor={colors.grey_dark} w={60}>
                <InputLeftElement pointerEvents="none" h={10}>
                  <SearchIcon color={colors.grey_dark} boxSize={6} />
                </InputLeftElement>
                <Input
                  // w={60}
                  h={10}
                  onChange={({ target: { value } }) => {
                    setSearchValue(value);
                    setPageParams({ pageIndex: 0, pageSize: 10 });
                  }}
                  // TODO: MAKE this left and add gap
                  textAlign={"center"}
                  placeholder={"Search"}
                />
              </InputGroup>
              <Button leftIcon={<IoAdd />} onClick={() => onOpen()}>
                Create
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
        </>
      </WrapperBox>
    </>
  );
};

export default Discount;
