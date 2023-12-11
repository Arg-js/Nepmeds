import { Button, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "@nepMeds/components/DataTable";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import SearchInput from "@nepMeds/components/Search";
import {
  useApproveReschedule,
  useGetRescheduledList,
  useRejectRescheduled,
} from "@nepMeds/service/nepmeds-patient-doctor-availability";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { rescheduledColumn } from "./column";
import {
  IRejectionData,
  defaultValues,
} from "../Appointment/AppointmentTab/ModalForm/RejectionModalForm/defaultValues";
import { svgs, ConfirmationImage } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import RejectionModalForm from "../Appointment/AppointmentTab/ModalForm/RejectionModalForm";

const schema = Yup.object({
  reject_title: Yup.number().required("This field is required"),
  reject_remarks: Yup.string().required("This field is required"),
});

export type StatusType =
  | STATUSTYPE.approved
  | STATUSTYPE.pending
  | STATUSTYPE.rejected
  | STATUSTYPE.completed
  | 0;

const RescheduledList = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const debouncedInputValue = useDebounce(searchValue, 500);

  const {
    isOpen: isApproveModalOpen,
    onOpen: onApproveModalOpen,
    onClose: onApproveModalClose,
  } = useDisclosure();
  const {
    isOpen: isRejectionModalOpen,
    onOpen: onRejectionModalOpen,
    onClose: onRejectionModalClose,
  } = useDisclosure();
  const {
    isOpen: isViewOpen,
    onOpen: onViewModalOpen,
    onClose: onViewClose,
  } = useDisclosure();

  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  // PAGINATION
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // PAGINATION ENDS

  // REACT QUERIES

  const { data, isLoading } = useGetRescheduledList({
    page_no: pageParams.pageIndex + 1,
    page_size: pageParams.pageSize,
    search: debouncedInputValue,
  });

  const { mutateAsync: mutateApprove } = useApproveReschedule();
  const { mutateAsync: mutateReject } = useRejectRescheduled();

  // REACT QUERIES END

  const onModalClose = () => {
    setAppointmentId("");
    onApproveModalClose();
    onViewClose();
    onRejectionModalClose();
    formMethods.reset(defaultValues);
  };

  const onSubmitHandler = async (data: IRejectionData) => {
    try {
      await mutateReject({
        ...data,
        id: appointmentId,
        status: STATUSTYPE.rejected,
      });
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* Approval Modal */}
      <ModalComponent
        size={"2xl"}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Approve Reschedule</Text>
          </HStack>
        }
        isOpen={isApproveModalOpen}
        onClose={onApproveModalClose}
        footer={
          <HStack w="100%">
            <Button
              variant={"primaryOutline"}
              w="100%"
              onClick={() => {
                onModalClose();
              }}
            >
              Cancel
            </Button>
            <Button
              w="100%"
              onClick={async () => {
                await mutateApprove({
                  id: appointmentId,
                  status: STATUSTYPE.approved,
                });
                onModalClose();
              }}
              isLoading={isLoading}
            >
              Yes
            </Button>
          </HStack>
        }
      >
        <Flex direction={"column"} alignItems={"center"} gap={8}>
          <ConfirmationImage />
          <Text fontWeight={600} fontSize="18px">
            Are you sure you want to Approve Rescheduled Appointment?
          </Text>
        </Flex>
      </ModalComponent>
      {/* Approval Modal ENDS*/}

      {/* Rejection Modal */}
      <ModalComponent
        size={"2xl"}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Remark for Rejection</Text>
          </HStack>
        }
        isOpen={isRejectionModalOpen}
        onClose={onModalClose}
        footer={
          <HStack w="100%">
            <Button
              variant={"primaryOutline"}
              w="100%"
              onClick={() => onModalClose()}
            >
              Cancel
            </Button>
            <Button
              w="100%"
              isLoading={isLoading}
              onClick={formMethods.handleSubmit(onSubmitHandler)}
            >
              Yes
            </Button>
          </HStack>
        }
      >
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmitHandler)}>
            <RejectionModalForm />
          </form>
        </FormProvider>
      </ModalComponent>
      {/* Rejection Modal ENDS*/}

      {/* View Modal */}
      <ModalComponent
        size={"2xl"}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Remarks Detail</Text>
          </HStack>
        }
        isOpen={isViewOpen}
        onClose={onViewClose}
        footer={<></>}
      >
        <Flex flexDirection={"column"}>
          <Text>Remarks:</Text>
          <Text>{appointmentId}</Text>
        </Flex>
      </ModalComponent>
      {/* View Modal ENDS */}

      <>
        {/* Table Header */}
        <Flex justifyContent={"flex-end"}>
          <SearchInput
            setSearchValue={setSearchValue}
            setPageParams={setPageParams}
          />
        </Flex>

        {/* Table Header Ends */}

        <DataTable
          data={data?.results ?? []}
          columns={rescheduledColumn({
            pageParams,
            setAppointmentId,
            onModalOpen: {
              onApproveModalOpen,
              onRejectionModalOpen,
              onViewModalOpen,
            },
          })}
          isLoading={isLoading}
          pagination={{
            manual: true,
            pageParams,
            pageCount: data?.page_count,
            onChangePagination: setPageParams,
          }}
        />
      </>
    </>
  );
};

export default RescheduledList;
