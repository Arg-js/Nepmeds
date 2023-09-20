import { Badge } from "@chakra-ui/react";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import {
  IGetAppointmentRequest,
  ISymptom,
} from "@nepMeds/service/nepmeds-doctor-patient-appointment";
import { CellProps } from "react-table";
import { Dispatch, SetStateAction, useMemo } from "react";
import { colors } from "@nepMeds/theme/colors";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";

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
        accessorKey: "created_at",
        accessorFn: ({ created_at }: { created_at: string }) => {
          return created_at.substr(0, 10);
        },
      },
      { header: "Patient Name", accessorKey: "full_name" },
      {
        header: "Appointment Time",
        cell: ({
          row,
        }: CellProps<{
          availability: { from_time: string; to_time: string };
        }>) => {
          return row.original?.availability
            ? `${removeSeconds(
                row.original?.availability?.from_time
              )}-${removeSeconds(row.original?.availability?.to_time)}`
            : "N/A";
        },
      },
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
        cell: ({ row }: CellProps<{ id: string; status: string }>) => {
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
    [appointment]
  );
};
