import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  SkeletonCircle,
  SkeletonText,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { ConfirmationImage, svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import {
  ISymptom,
  useGetAppointmentRequest,
  useGetAppointmentRequestById,
  useSetAppointmentRequestById,
} from "@nepMeds/service/nepmeds-doctor-patient-appointment";
import { colors } from "@nepMeds/theme/colors";
import { CellContext } from "@tanstack/react-table";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import { STATUSTYPE } from "@nepMeds/config/enum";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { useForm } from "react-hook-form";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CellProps } from "react-table";

type StatusType =
  | STATUSTYPE.approved
  | STATUSTYPE.pending
  | STATUSTYPE.rejected
  | STATUSTYPE.completed
  | 0;

const statusInfo: {
  [key: string]: {
    label: string;
    color: string;
    textColor: string;
  };
} = {
  "1": {
    label: "Approved",
    color: "green",
    textColor: colors.dark_green,
  },
  "2": {
    label: "Pending",
    color: "orange",
    textColor: colors.maroon,
  },
  "3": { label: "Rejected", color: "red", textColor: colors.maroon },
  "4": {
    label: "Completed",
    color: "green",
    textColor: colors.dark_green,
  },
};

const schema = Yup.object({
  reject_title: Yup.string().required("This field is required"),
  reject_remarks: Yup.string().required("This field is required"),
});

const defaultValues = {
  reject_title: "",
  reject_remarks: "",
};

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
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
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

  const { data: appointment, isLoading: appointmentLoading } =
    useGetAppointmentRequest({
      page: pageParams.pageIndex + 1,
      page_size: pageParams.pageSize,
    });

  // PENDING
  const { data: pendingAppointment, isLoading: pendingAppointmentLoading } =
    useGetAppointmentRequest({
      page: pageParams.pageIndex + 1,
      page_size: pageParams.pageSize,
      status: STATUSTYPE.pending as number,
    });

  // APPROVED
  const { data: approvedAppointment, isLoading: approvedAppointmentLoading } =
    useGetAppointmentRequest({
      page: pageParams.pageIndex + 1,
      page_size: pageParams.pageSize,
      status: STATUSTYPE.approved,
    });

  // REJECTED
  const { data: rejectedAppointment, isLoading: rejectedAppointmentLoading } =
    useGetAppointmentRequest({
      page: pageParams.pageIndex + 1,
      page_size: pageParams.pageSize,
      status: STATUSTYPE.rejected,
    });

  const { mutateAsync: setAppointmentRequestById, isLoading } =
    useSetAppointmentRequestById();
  const { data: patient, isLoading: isPatientLoading } =
    useGetAppointmentRequestById({ id: appointmentId });
  // REACT QUERIES END

  const appointmentData = {
    0: appointment?.results,
    [STATUSTYPE.pending]: pendingAppointment?.results,
    [STATUSTYPE.approved]: approvedAppointment?.results,
    [STATUSTYPE.rejected]: rejectedAppointment?.results,
    [STATUSTYPE.completed]: [],
  };

  const onModalClose = () => {
    setAppointmentId("");
    onApproveModalClose();
    onRejectionModalClose();
    reset(defaultValues);
  };

  const onSubmitHandler = async (data: typeof defaultValues) => {
    try {
      await setAppointmentRequestById({
        ...data,
        id: appointmentId,
        status: STATUSTYPE.rejected,
        reject_title: 1,
      });
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };

  const column = useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: any, index: number) => {
          return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
        },
      },
      {
        header: "Date",
        accessorKey: "created_at",
        accessorFn: ({ created_at }: { created_at: string }) => {
          return created_at.substr(0, 10);
        },
      },
      { header: "Patient Name", accessorKey: "patient_name" },
      {
        header: "Symptoms",
        accessorKey: "symptoms",
        accessorFn: ({ symptoms }: { symptoms: ISymptom[] }) => {
          return symptoms?.map(({ name }) => name);
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }: CellProps<{ status: string }>) => {
          return (
            <Badge
              colorScheme={statusInfo[row.original?.status].color}
              borderRadius={10}
              px={3}
              py={0.5}
              fontWeight={400}
              fontSize={"xs"}
              textTransform="capitalize"
              sx={{
                color: statusInfo[row.original?.status].textColor,
              }}
            >
              {statusInfo[row.original?.status].label}
            </Badge>
          );
        },
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }: CellContext<any, any>) => {
          const onView = () => {
            setAppointmentId(row.original?.id);
            onViewModalOpen();
          };
          const onAccept = () => {
            setAppointmentId(row.original?.id);
            onApproveModalOpen();
          };
          const onReject = () => {
            setAppointmentId(row.original?.id);
            onRejectionModalOpen();
          };

          const isPending =
            row.original?.status === STATUSTYPE.pending.toString();

          return (
            <TableActions
              onView={onView}
              onAccept={isPending ? onAccept : undefined}
              onReject={isPending ? onReject : undefined}
            />
          );
        },
      },
    ],
    [appointment, pageParams]
  );

  const InfoSection = ({
    label,
    content,
  }: {
    label: string;
    content: string;
  }) => {
    return (
      <Box>
        <Text fontWeight={400} fontSize="xs">
          {label}
        </Text>
        <Text fontWeight={400} fontSize="md">
          {content}
        </Text>
      </Box>
    );
  };

  return (
    <>
      {/* Approval Modal */}
      <ModalComponent
        size={"2xl"}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Doctor Approval</Text>
          </HStack>
        }
        isOpen={isApproveModalOpen}
        onClose={onApproveModalClose}
        // approve
        // reject
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
            Are you sure you want to Approve Patient?
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
            <Text>Appointment</Text>
          </HStack>
        }
        isOpen={isViewModalOpen}
        onClose={onViewModalClose}
        footer={<></>}
      >
        {isPatientLoading ? (
          <>
            <Flex gap={6}>
              <SkeletonCircle size="30" />
              <Flex flex={1} direction={"column"} gap={2}>
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="3"
                />
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="3"
                />
              </Flex>
              <Flex flex={1} direction={"column"} gap={2}>
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="3"
                />
              </Flex>
            </Flex>
            <Flex mt={7} gap="0.5" direction={"column"}>
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Flex>
          </>
        ) : (
          <>
            <Flex gap={6}>
              <Avatar size="xl" />
              <Flex flex={1} direction={"column"} gap={2}>
                <InfoSection
                  label="Patient’s Name"
                  content={patient?.patient_name as string}
                />

                <InfoSection
                  label="Symptoms"
                  content={patient?.symptoms?.[0]?.name || "N/A"}
                />
              </Flex>
              <Flex flex={1} direction={"column"} gap={2}>
                <InfoSection label="Gender" content="Male" />
                {/* <Box>
                <Text fontWeight={400} fontSize={"xs"}>
                  Doctors Name
                </Text>
                <Text fontWeight={400} fontSize={"md"}>
                  {patient?.symptoms?.[0]?.name}
                </Text>
              </Box> */}
              </Flex>
            </Flex>
            <Flex mt={7} gap="4" direction={"column"}>
              <InfoSection
                label="Symptom Description"
                content={patient?.description as string}
              />
              {patient?.reject_remarks && (
                <InfoSection
                  label="Rejected Reason"
                  content={patient?.reject_remarks as string}
                />
              )}
            </Flex>
          </>
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
        onClose={() => {
          onModalClose();
        }}
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
              onClick={handleSubmit(onSubmitHandler)}
            >
              Yes
            </Button>
          </HStack>
        }
      >
        <form>
          <Flex direction={"column"} alignItems={"center"} gap={8}>
            <FloatingLabelInput
              label="Reason for rejection"
              name="reject_title"
              placeholder="Enter reason for rejection"
              required
              register={register}
              error={errors.reject_title?.message || ""}
            />
            <FloatinglabelTextArea
              label="Description"
              name="reject_remarks"
              required
              register={register}
              error={errors.reject_remarks?.message || ""}
            />
          </Flex>
        </form>
      </ModalComponent>
      {/* Rejection Modal ENDS*/}

      {/* TABLE HEADER */}
      <HStack justifyContent="space-between">
        <Text fontSize="16px" fontWeight="500" color={colors.black_60}>
          {heading}
        </Text>
      </HStack>
      {/* TABLE HEADER ENDS*/}

      <DataTable
        data={appointmentData[type] || []}
        columns={column}
        isLoading={
          appointmentLoading ||
          pendingAppointmentLoading ||
          approvedAppointmentLoading ||
          rejectedAppointmentLoading
        }
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
