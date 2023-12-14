import { Badge, Flex } from "@chakra-ui/react";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import { CallState, STATUSTYPE } from "@nepMeds/config/enum";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import { IGetAppointmentRequest } from "@nepMeds/service/nepmeds-doctor-patient-appointment";
import { colors } from "@nepMeds/theme/colors";
import { Dispatch, SetStateAction, useMemo } from "react";
import { CellProps } from "react-table";

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

export const column = ({
  appointment,
  pageParams,
  setAppointmentId,
  onModalOpen,
}: {
  appointment?: IGetAppointmentRequest;
  pageParams: {
    pageIndex: number;
    pageSize: number;
  };
  setAppointmentId: Dispatch<SetStateAction<string>>;
  onModalOpen: {
    onViewModalOpen: () => void;
    onApproveModalOpen: () => void;
    onRejectionModalOpen: () => void;
    onPrescriptionClick: () => void;
  };
}) => {
  return useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: any, index: number) => {
          return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
        },
      },
      {
        header: "Date",
        accessorFn: ({
          availability,
          extra_data,
        }: {
          availability: { date: string };
          extra_data: {
            cancelled_availability: { date: string };
          };
        }) => {
          return (
            availability?.date.substr(0, 10) ||
            extra_data?.cancelled_availability?.date
          );
        },
      },
      { header: "Patient Name", accessorKey: "full_name" },
      {
        header: "Appointment Time",
        accessorKey: "availability.from_time",
        cell: ({
          row,
        }: CellProps<{
          availability: { from_time: string; to_time: string };
          extra_data: {
            cancelled_availability: { from_time: string; to_time: string };
          };
        }>) => {
          return row.original?.availability
            ? `${removeSeconds(
                row.original?.availability?.from_time
              )}-${removeSeconds(row.original?.availability?.to_time)}`
            : row.original?.extra_data
            ? `${removeSeconds(
                row.original?.extra_data?.cancelled_availability?.from_time
              )}-${removeSeconds(
                row.original?.extra_data?.cancelled_availability?.to_time
              )}`
            : "N/A";
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
        accessorKey: "id",
        cell: ({
          row,
        }: CellProps<{
          id: string;
          status: string;
          patient_user_id: string;
          doctor_user_id: string;
          is_callable: boolean;
          can_add_prescription: boolean;
        }>) => {
          const onView = () => {
            setAppointmentId(row.original?.id);
            onModalOpen.onViewModalOpen();
          };
          const onAccept = () => {
            setAppointmentId(row.original?.id);
            onModalOpen.onApproveModalOpen();
          };
          const onReject = () => {
            setAppointmentId(row.original?.id);
            onModalOpen.onRejectionModalOpen();
          };

          const onPrescriptionClick = () => {
            setAppointmentId(row.original?.id);
            onModalOpen.onPrescriptionClick();
          };

          const isPending =
            row.original?.status === STATUSTYPE.pending.toString();

          const state = {
            caller_user: row.original?.doctor_user_id,
            receiver_user: row.original?.patient_user_id,
            appointment_id: row.original?.id,
            call_state: CallState.INITIATE,
          };
          return (
            <Flex justifyContent={"center"} alignItems={"center"} gap={1}>
              <TableActions
                onView={onView}
                onAccept={isPending ? onAccept : undefined}
                onReject={isPending ? onReject : undefined}
                onCall={{ state, isCallable: row?.original?.is_callable }}
                onPrescription={{
                  isShown: row?.original?.can_add_prescription,
                  onClick: onPrescriptionClick,
                }}
              />
            </Flex>
          );
        },
      },
    ],
    [appointment]
  );
};
