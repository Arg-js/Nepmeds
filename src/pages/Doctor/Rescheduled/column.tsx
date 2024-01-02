import StatusBadge from "@nepMeds/components/Common/StatusBadge";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import { IGetRescheduledList } from "@nepMeds/service/nepmeds-patient-doctor-availability";
import { Dispatch, SetStateAction, useMemo } from "react";
import { CellProps } from "react-table";

export const rescheduledColumn = ({
  appointment,
  pageParams,
  setAppointmentId,
  onModalOpen,
}: {
  appointment?: IGetRescheduledList;
  pageParams: {
    pageIndex: number;
    pageSize: number;
  };
  setAppointmentId: Dispatch<SetStateAction<string>>;
  onModalOpen: {
    onApproveModalOpen: () => void;
    onRejectionModalOpen: () => void;
    onViewModalOpen: () => void;
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

      { header: "Patient Name", accessorKey: "patient" },
      {
        header: "Previous Date",
        accessorKey: "old_availability.date",
        cell: ({ row: { original } }: CellProps<IGetRescheduledList>) => {
          return original?.old_availability?.date;
        },
      },
      {
        header: "Previous Time",
        accessorKey: "old_availability.to_time",
        cell: ({ row: { original } }: CellProps<IGetRescheduledList>) => {
          return `${removeSeconds(
            original?.old_availability?.from_time
          )} - ${removeSeconds(original?.old_availability?.to_time)}`;
        },
      },

      {
        header: "New Time",
        accessorKey: "request_availability.from_time",
        cell: ({ row }: CellProps<IGetRescheduledList>) => {
          return `${removeSeconds(
            row.original?.request_availability?.from_time
          )} - ${removeSeconds(row.original?.request_availability?.to_time)}`;
        },
      },

      {
        header: "New Date",
        accessorKey: "request_availability.date",
        cell: ({ row: { original } }: CellProps<IGetRescheduledList>) => {
          return original?.request_availability?.date;
        },
      },

      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }: CellProps<{ status: string }>) => {
          return (
            <StatusBadge
              customProps={{
                status: row?.original?.status?.toString() ?? "",
              }}
            />
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
          remarks: string;
        }>) => {
          const onAccept = () => {
            setAppointmentId(row.original?.id);
            onModalOpen.onApproveModalOpen();
          };
          const onReject = () => {
            setAppointmentId(row.original?.id);
            onModalOpen.onRejectionModalOpen();
          };

          const onView = () => {
            setAppointmentId(row.original?.remarks);
            onModalOpen.onViewModalOpen();
          };

          return (
            <TableActions
              onAccept={onAccept}
              onReject={onReject}
              onView={onView}
            />
          );
        },
      },
    ],
    [appointment]
  );
};

export const rescheduledHistoryColumn = ({
  appointment,
  pageParams,
}: {
  appointment?: IGetRescheduledList;
  pageParams: {
    pageIndex: number;
    pageSize: number;
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

      { header: "Patient Name", accessorKey: "patient" },
      {
        header: "Previous Date",
        accessorKey: "old_availability.date",
        cell: ({ row: { original } }: CellProps<IGetRescheduledList>) => {
          return original?.extra_data?.previous_availability?.date;
        },
      },
      {
        header: "Previous Time",
        accessorKey: "extra_data.previous_availability.to_time",
        cell: ({ row: { original } }: CellProps<IGetRescheduledList>) => {
          return `${removeSeconds(
            original?.extra_data?.previous_availability?.from_time ?? ""
          )} - ${removeSeconds(
            original?.extra_data?.previous_availability?.to_time ?? ""
          )}`;
        },
      },

      {
        header: "Rescheduled Time",
        accessorKey: "id",
        cell: ({ row }: CellProps<IGetRescheduledList>) => {
          const from_time =
            row.original?.extra_data?.cancelled_availability?.from_time ??
            row.original?.request_availability?.from_time;
          const to_time =
            row.original?.extra_data?.cancelled_availability?.to_time ??
            row.original?.request_availability?.to_time;
          return `${removeSeconds(from_time)} - ${removeSeconds(to_time)}`;
        },
      },

      {
        header: "Rescheduled Date",
        accessorKey: "is_appointment",
        cell: ({ row: { original } }: CellProps<IGetRescheduledList>) => {
          return (
            original?.extra_data?.cancelled_availability?.date ??
            original?.request_availability?.date
          );
        },
      },

      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }: CellProps<{ status: string }>) => {
          return (
            <StatusBadge
              customProps={{
                status: row?.original?.status?.toString() ?? "",
              }}
            />
          );
        },
      },
    ],
    [appointment]
  );
};
