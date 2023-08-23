import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ConfirmationImage, svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import { pendingPaymentColumn } from "@nepMeds/components/DataTable/columns";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import Select from "@nepMeds/components/Form/Select";
import { RejectionForm } from "@nepMeds/components/FormComponents";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { useGetPaymentList } from "@nepMeds/service/nepmeds-payment";
import { colors } from "@nepMeds/theme/colors";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoFunnelOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { ISpecializationList } from "./PaymentList";
import usePaymentStatusForm from "./usePaymentStatusForm";

const PendingPayment = ({
  specializationList,
}: {
  specializationList: ISpecializationList[];
}) => {
  const formMethods = useForm();
  const navigate = useNavigate();
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
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filterValue, setFilterValue] = useState<any>({
    status: STATUSTYPE.rejected,
  });

  const [searchFilter, setSearchFilter] = useState("");
  const debouncedInputValue = useDebounce(searchFilter, 500);

  const { data, isLoading, isSuccess } = useGetPaymentList({
    ...filterValue,
    page_no: pageIndex + 1,
    page_size: pageSize,
    name: debouncedInputValue,
    enabled: true,
    payment_status: "2",
  });

  const handleFilter = async (isReset: boolean) => {
    if (!isReset) {
      setFilterValue({
        status: STATUSTYPE.rejected,
        from_date: formMethods.getValues("fromDate"),
        to_date: formMethods.getValues("toDate"),
        specialization: formMethods.getValues("Specialization"),
      });
    } else {
      setFilterValue({
        status: STATUSTYPE.rejected,
      });
      formMethods.reset({});
    }

    onModalClose();
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
              onClick={() => handleFilter(true)}
            >
              Reset
            </Button>

            <Button variant={"primaryOultine"} w={"150px"}>
              Cancel
            </Button>
            <Button w={"150px"} onClick={() => handleFilter(false)}>
              Done
            </Button>
          </HStack>
        }
      >
        <VStack h={"auto"}>
          <FormProvider {...formMethods}>
            <Select
              placeholder="select specialization"
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
                variant="outline"
                onClick={RejectPaymentModal}
                flex={1}
                border="2px solid"
                borderColor={colors.primary}
                color={colors.primary}
                fontWeight={400}
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
                background={colors.primary}
                color={colors.white}
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
              <Text>Dcotor Approval</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button
                variant="outline"
                onClick={onCloseConfirmation}
                flex={1}
                border="2px solid"
                borderColor={colors.primary}
                color={colors.primary}
                fontWeight={400}
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
              Are you sure you want to approve payment for {doctorInfo.name}?
            </Text>
          </Flex>
        </ModalComponent>
      )}

      <HStack justifyContent="space-between">
        <Text fontWeight="medium">Pending Payments</Text>
        <HStack>
          <InputGroup w="190px" borderColor={colors.grey_dark}>
            <InputLeftElement pointerEvents="none" h={8}>
              <SearchIcon color={colors.grey_dark} boxSize={4} />
            </InputLeftElement>
            <Input
              w={40}
              h={8}
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

      {isSuccess && (
        <DataTable
          columns={pendingPaymentColumn(onActionClick, navigate)}
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
    </div>
  );
};

export default PendingPayment;
