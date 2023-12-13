import { Button, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ConfirmationImage, svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import { column } from "@nepMeds/components/DataTable/Columns/Doctor/Appointments";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { STATUSTYPE } from "@nepMeds/config/enum";
import {
  useGetAppointmentRequest,
  useGetAppointmentRequestById,
  useSetAppointmentRequestById,
} from "@nepMeds/service/nepmeds-doctor-patient-appointment";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as Yup from "yup";
import RejectionModalForm from "./ModalForm/RejectionModalForm";
import {
  IRejectionData,
  defaultValues,
} from "./ModalForm/RejectionModalForm/defaultValues";
import ViewModal from "./ModalForm/ViewModal";
import ViewModalSkeleton from "./ModalForm/ViewModal/ViewModalSkeleton";
import AppointmentPrescriptionModal from "./ModalForm/PrescriptionModal";

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

const AppointmentTab: React.FC<{ type: StatusType; heading: string }> = ({
  type,
  heading,
}) => {
  const [appointmentId, setAppointmentId] = useState("");

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
    isOpen: isViewModalOpen,
    onOpen: onViewModalOpen,
    onClose: onViewModalClose,
  } = useDisclosure();

  const {
    isOpen: isPrescriptionOpen,
    onOpen: onPrescriptionClick,
    onClose: onPrescriptionClose,
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

  const { data: appointment, isFetching: appointmentFetching } =
    useGetAppointmentRequest({
      page: pageParams.pageIndex + 1,
      page_size: pageParams.pageSize,
      status: type || "",
    });

  const { mutateAsync: setAppointmentRequestById, isLoading } =
    useSetAppointmentRequestById();
  const { data: patient, isLoading: isPatientLoading } =
    useGetAppointmentRequestById({ id: appointmentId });

  // REACT QUERIES END

  const onModalClose = () => {
    setAppointmentId("");
    onApproveModalClose();
    onRejectionModalClose();
    onPrescriptionClose();
    formMethods.reset(defaultValues);
  };

  const onSubmitHandler = async (data: IRejectionData) => {
    try {
      await setAppointmentRequestById({
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
            <Text>Approve Appointment</Text>
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
                await setAppointmentRequestById({
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
            Are you sure you want to Approve Appointment?
          </Text>
        </Flex>
      </ModalComponent>
      {/* Approval Modal ENDS*/}

      {/* View Modal */}
      <ModalComponent
        size={"2xl"}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Appointment Detail</Text>
          </HStack>
        }
        isOpen={isViewModalOpen}
        onClose={onViewModalClose}
        footer={<></>}
      >
        {isPatientLoading ? (
          // SKELETON FOR modal thats being used to view the appointment details
          <ViewModalSkeleton />
        ) : (
          <ViewModal patient={patient} />
        )}
      </ModalComponent>
      {/* View Modal ENDS */}

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

      {/* Prescription Modal */}

      <AppointmentPrescriptionModal
        isPrescriptionOpen={isPrescriptionOpen}
        onPrescriptionClose={onPrescriptionClose}
        appointmentId={appointmentId}
      />
      {/* Prescription Modal ENDS*/}

      {/* TABLE HEADER */}
      <HStack justifyContent="space-between">
        <Text fontSize="md" fontWeight="500" color={colors.black_60}>
          {heading}
        </Text>
      </HStack>
      {/* TABLE HEADER ENDS*/}
      <DataTable
        data={appointment?.results || []}
        columns={column({
          appointment,
          pageParams,
          setAppointmentId,
          onModalOpen: {
            onViewModalOpen,
            onApproveModalOpen,
            onRejectionModalOpen,
            onPrescriptionClick,
          },
        })}
        isLoading={appointmentFetching}
        pagination={{
          manual: true,
          pageParams: {
            pageIndex: pageParams.pageIndex,
            pageSize: pageParams.pageSize,
          },
          pageCount: appointment?.page_count,
          onChangePagination: setPageParams,
        }}
      />
    </>
  );
};

export default AppointmentTab;
