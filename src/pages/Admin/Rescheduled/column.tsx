import StatusBadge from "@nepMeds/components/Common/StatusBadge";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import {
  IAdminRescheduledAppointment,
  IGetRescheduledList,
} from "@nepMeds/service/nepmeds-patient-doctor-availability";
import { Dispatch, SetStateAction, useMemo } from "react";
import { CellProps } from "react-table";

export const rescheduledAdminColumn = ({
  appointment,
  pageParams,
  setAppointmentId,
  onModalOpen,
}: {
  appointment?: IAdminRescheduledAppointment;
  pageParams: {
    pageIndex: number;
    pageSize: number;
  };
  setAppointmentId: Dispatch<SetStateAction<string>>;
  onModalOpen: () => void;
}) => {
  return useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: any, index: number) => {
          return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
        },
      },

      { header: "Doctor Name", accessorKey: "doctor" },
      { header: "Patient Name", accessorKey: "patient" },
      {
        header: "Previous Date",
        cell: ({ row: { original } }: CellProps<IGetRescheduledList>) => {
          return original?.old_availability?.date;
        },
      },
      {
        header: "Previous Time",
        cell: ({ row: { original } }: CellProps<IGetRescheduledList>) => {
          return `${removeSeconds(
            original?.old_availability?.from_time
          )} - ${removeSeconds(original?.old_availability?.to_time)}`;
        },
      },

      {
        header: "Status",
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
        cell: ({
          row,
        }: CellProps<{
          id: string;
          remarks: string;
        }>) => {
          const onView = () => {
            setAppointmentId(row.original?.id);
            onModalOpen();
          };

          return <TableActions onView={onView} />;
        },
      },
    ],
    [appointment]
  );
};
