import { Badge } from "@chakra-ui/react";
import StatusBadge from "@nepMeds/components/Common/StatusBadge";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import { ADMINAPPOINTMENT, CallState } from "@nepMeds/config/enum";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import { IPaginationParams } from "@nepMeds/service/nepmeds-faq";
import { CellContext } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { CellProps } from "react-table";

export const columns = ({
  pagination,
  setAppointmentId,
  onOpen,
}: {
  pagination: IPaginationParams;
  setAppointmentId: Dispatch<SetStateAction<string>>;
  onOpen: () => void;
}) => {
  return [
    {
      header: "S.N.",
      accessorFn: (_cell: CellContext<number, number>, index: number) => {
        return `${pagination.pageSize * pagination.pageIndex + (index + 1)}.`;
      },
    },
    {
      header: "Doctor name",
      accessorKey: "doctor",
    },
    {
      header: "Appointment Date",
      cell: ({ row }: CellProps<{ appointment_date: string }>) =>
        row.original?.appointment_date ?? "---",
    },
    {
      header: "Appointment Time",
      cell: ({
        row,
      }: CellProps<{
        appointment_starttime: string;
        appointment_endtime: string;
      }>) => {
        const startTime = row.original?.appointment_starttime;
        return startTime
          ? `${removeSeconds(startTime)} -
                    ${removeSeconds(row.original?.appointment_endtime)}`
          : "---";
      },
    },
    {
      header: "Call Type",
      cell: ({ row }: CellProps<{ call_type: string }>) =>
        ADMINAPPOINTMENT[
          row.original?.call_type as keyof typeof ADMINAPPOINTMENT
        ],
    },
    {
      header: "Appointment Status",
      cell: ({ row }: CellProps<{ appointment_status: string }>) => (
        <StatusBadge
          customProps={{
            status: row.original?.appointment_status,
          }}
        />
      ),
    },
    {
      header: "Call Duration",
      cell: ({ row }: CellProps<{ call_duration: string }>) =>
        row.original?.call_duration ?? "---",
    },
    {
      header: "Call Status",
      // TODO: alternative to this
      cell: ({ row }: CellProps<{ call_status: string }>) =>
        row.original.call_status
          ? CallState[row.original.call_status as keyof typeof CallState]
          : "---",
    },
    {
      header: "Follow Up",
      cell: ({ row }: CellProps<{ follow_up: boolean }>) => (
        // TODO: alternative to this
        <Badge
          p={1}
          borderRadius={20}
          fontSize={11}
          w={15}
          colorScheme={row.original?.follow_up ? "green" : "red"}
          textAlign="center"
          textTransform="capitalize"
        >
          {row.original?.follow_up ? "Yes" : "No"}
        </Badge>
        // <StatusBadge
        //   customProps={{
        //     status: row.original?.followUp,
        //     badgeText: { true: "YES", false: "NO" },
        //   }}
        // />
      ),
    },
    {
      header: "Actions",
      cell: ({ row }: CellProps<{ id: string }>) => (
        <TableActions
          onView={() => {
            setAppointmentId(row.original?.id);
            onOpen();
          }}
        />
      ),
    },
  ];
};
