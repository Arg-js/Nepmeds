import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ConfirmationImage, svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import { allPaymentColumn } from "@nepMeds/components/DataTable/Columns";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import Select from "@nepMeds/components/Form/Select";
import { RejectionForm } from "@nepMeds/components/FormComponents";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { useGetPaymentList } from "@nepMeds/service/nepmeds-payment";
import { colors } from "@nepMeds/theme/colors";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoFunnelOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { ISpecializationList } from "@nepMeds/components/Table/Payment/PaymentList";
import usePaymentStatusForm from "./usePaymentStatusForm";

const AllPayment = ({
  specializationList,
}: {
  specializationList: ISpecializationList[];
}) => {
  const formMethods = useForm();
  const [filterValue, setFilterValue] = useState<any>({});
  const [searchFilter, setSearchFilter] = useState("");
  const navigate = useNavigate();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [doctorInfo, setDoctorInfo] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });
  const {
    formMethods: statusFormMethods,
    ApprovePayment,
    RejectPayment,
    approveLoading,
    rejectLoading,
  } = usePaymentStatusForm();
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModalOpen,
    onClose: onRejectModalClose,
  } = useDisclosure();
  const {
    isOpen: confirmationModal,
    onOpen: onOpenConfirmation,
    onClose: onCloseConfirmation,
  } = useDisclosure();
  const debouncedInputValue = useDebounce(searchFilter, 500);

  const { data, isFetching } = useGetPaymentList({
    ...filterValue,
    page_no: pageIndex + 1,
    page_size: pageSize,
    name: debouncedInputValue,
    enabled: true,
  });

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const defaultValues = {
    Specialization: "",
    toDate: "",
    fromDate: "",
  };

  const handleFilterData = (isReset: boolean) => {
    if (!isReset) {
      setFilterValue({
        from_date: formMethods.getValues("fromDate"),
        to_date: formMethods.getValues("toDate"),
        specialization: formMethods.getValues("Specialization"),
      });
      onModalClose();
    } else {
      setFilterValue({});
      formMethods.reset(defaultValues);
    }
  };

  const onActionClick = async (
    isApproved: boolean,
    doctorInfo: { id: string; name: string }
  ) => {
    setDoctorInfo({ name: doctorInfo.name, id: doctorInfo.id });
    if (isApproved) {
      onOpenConfirmation();
      // ApproveDoctor(doctorId)
    } else {
      onRejectModalOpen();
    }
  };

  const RejectPaymentModal = () => {
    statusFormMethods.reset();
    onRejectModalClose();
  };

  return (
    <div>
      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={onModalClose}
          size={"xl"}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Filter</Text>
            </HStack>
          }
          footer={
            <HStack w={"full"} justifyContent={"flex-end"}>
              <Button
                variant={"reset"}
                w={"150px"}
                onClick={() => handleFilterData(true)}
              >
                Reset
              </Button>
              <Button w={"150px"} onClick={() => handleFilterData(false)}>
                Filter
              </Button>
            </HStack>
          }
        >
          <VStack h={"auto"}>
            <FormProvider {...formMethods}>
              <Select
                placeholder="Select Specialization"
                label="Specialization"
                name="Specialization"
                required
                register={formMethods.register}
                options={specializationList}
              />
              <Box display={"flex"} width={"100%"}>
                <FloatingLabelInput
                  label="From"
                  name="fromDate"
                  register={formMethods.register}
                  type="date"
                />
                <Box ml={1}>
                  <FloatingLabelInput
                    label="To"
                    name="toDate"
                    register={formMethods.register}
                    type="date"
                  />
                </Box>
              </Box>
            </FormProvider>
          </VStack>
        </ModalComponent>
      )}

      {isRejectModalOpen && (
        <ModalComponent
          isOpen={isRejectModalOpen}
          onClose={RejectPaymentModal}
          approve
          reject
          size="xl"
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Remarks for rejection</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button
                variant="primaryOutline"
                flex={1}
                onClick={RejectPaymentModal}
              >
                Cancel
              </Button>
              <Button
                flex={1}
                onClick={statusFormMethods.handleSubmit(value =>
                  RejectPayment({ ...value, id: doctorInfo.id }).then(() =>
                    RejectPaymentModal()
                  )
                )}
                isLoading={rejectLoading}
              >
                Done
              </Button>
            </HStack>
          }
          primaryText="Done"
          secondaryText="Cancel"
          otherAction={onRejectModalClose}
        >
          <FormProvider {...statusFormMethods}>
            <form
              onSubmit={statusFormMethods.handleSubmit(value =>
                RejectPayment({ ...value, id: doctorInfo.id })
              )}
            >
              <RejectionForm />
            </form>
          </FormProvider>
        </ModalComponent>
      )}

      {confirmationModal && (
        <ModalComponent
          isOpen={confirmationModal}
          onClose={onCloseConfirmation}
          approve
          reject
          size="xl"
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Rate Approval</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button
                flex={1}
                variant={"primaryOutline"}
                onClick={onCloseConfirmation}
              >
                Cancel
              </Button>
              <Button
                flex={1}
                onClick={statusFormMethods.handleSubmit(() =>
                  ApprovePayment(doctorInfo.id).then(() =>
                    onCloseConfirmation()
                  )
                )}
                background={colors.primary}
                color={colors.white}
                isLoading={approveLoading}
              >
                Yes
              </Button>
            </HStack>
          }
          primaryText="Done"
          secondaryText="Cancel"
          otherAction={onCloseConfirmation}
        >
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ConfirmationImage />
            <Text fontWeight={"bold"} mt={4}>
              Are you sure you want to approve rate for {doctorInfo.name}?
            </Text>
          </Flex>
        </ModalComponent>
      )}

      <HStack justifyContent="space-between">
        <Text fontWeight="medium">All Rate</Text>
        <HStack>
          <InputGroup w="190px" borderColor={colors.grey_dark}>
            <InputLeftElement pointerEvents="none" h={8}>
              <SearchIcon color={colors.grey_dark} boxSize={4} />
            </InputLeftElement>
            <Input
              w={40}
              h={8}
              placeholder="Search"
              onChange={({ target: { value } }) => {
                setSearchFilter(value);

                setPagination({ pageIndex: 0, pageSize });
              }}
            />
          </InputGroup>
          <Button
            color={colors.grey_dark}
            bg={colors.white}
            outlineColor={colors.grey_dark}
            h={8}
            onClick={() => {
              onModalOpen();
            }}
          >
            <IoFunnelOutline pointerEvents={"none"} />
            &nbsp; Filter
          </Button>
        </HStack>
      </HStack>

      <DataTable
        columns={allPaymentColumn(onActionClick, navigate, {
          pageIndex,
          pageSize,
        })}
        isLoading={isFetching}
        data={data?.results ?? []}
        pagination={{
          manual: true,
          pageParams: { pageIndex, pageSize },
          pageCount: data?.page_count,
          onChangePagination: setPagination,
        }}
      />

      {data?.count === 0 && <Box>No Result Found!</Box>}
    </div>
  );
};

export default AllPayment;
