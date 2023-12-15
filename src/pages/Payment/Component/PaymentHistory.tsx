import { Box, Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import { paymentHistoryColumn } from "@nepMeds/components/DataTable/Columns/Doctor/PaymentHistory";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { IDateParams } from "@nepMeds/pages/Patient/DoctorList/Section/Filter";
import { useGetPaymentHistoryDoctor } from "@nepMeds/service/nepmeds-payment";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoFunnelOutline } from "react-icons/io5";

const defaultValues = {
  to_date: "",
  from_date: "",
};

const PaymentHistory = () => {
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onOpen: onModalOpen,
  } = useDisclosure();

  const [filterValue, setFilterValue] = useState<IDateParams>(defaultValues);
  const formMethods = useForm<IDateParams>();
  const { register, handleSubmit, reset } = formMethods;

  const handleFilter = (data: IDateParams) => {
    setFilterValue(data);
    onModalClose();
  };

  const { data: history, isLoading } = useGetPaymentHistoryDoctor({
    page_no: pageParams.pageIndex + 1,
    page_size: pageParams.pageSize,
    ...filterValue,
  });

  return (
    <div>
      {/* Filter Modal */}
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
          <HStack w={"full"}>
            <Button
              variant={"reset"}
              flex="0.5"
              onClick={() => {
                setFilterValue(defaultValues);
                reset(defaultValues);
              }}
            >
              Reset
            </Button>
            <Button flex="0.5" onClick={handleSubmit(handleFilter)}>
              Done
            </Button>
          </HStack>
        }
      >
        <FormProvider {...formMethods}>
          <Box display={"flex"} gap={1}>
            <FloatingLabelInput
              label="From"
              name="from_date"
              register={register}
              type="date"
              flex={1}
            />
            <FloatingLabelInput
              label="To"
              name="to_date"
              register={register}
              type="date"
              flex={1}
            />
          </Box>
        </FormProvider>
      </ModalComponent>
      {/* Filter Modal Ends*/}

      <HStack justifyContent="space-between">
        <Text fontSize="md" fontWeight="500" color={colors.black_60}>
          Payment History
        </Text>
        <Button
          aria-label="filter"
          leftIcon={<IoFunnelOutline pointerEvents={"none"} />}
          onClick={onModalOpen}
        >
          &nbsp; Filter
        </Button>
      </HStack>

      <DataTable
        data={history?.results || []}
        columns={paymentHistoryColumn({
          pageParams,
        })}
        isLoading={isLoading}
        pagination={{
          manual: true,
          pageParams: {
            pageIndex: pageParams.pageIndex,
            pageSize: pageParams.pageSize,
          },
          pageCount: history?.page_count,
          onChangePagination: setPageParams,
        }}
      />
    </div>
  );
};

export default PaymentHistory;
