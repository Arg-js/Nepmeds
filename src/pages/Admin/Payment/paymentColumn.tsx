import { Switch } from "@chakra-ui/react";
import { IPaymentHistoryAdmin } from "@nepMeds/service/nepmeds-payment";
import { format } from "date-fns";
import { splitDateTime } from "@nepMeds/utils/time";
import { useMemo } from "react";
import { CellProps } from "react-table";
import TableActions from "@nepMeds/components/DataTable/TableActions";

export const paymentColumnAdmin = ({
  paymentHistoryAdmin,
  pageParams,
  onToggleClick,
  onView,
}: {
  paymentHistoryAdmin?: IPaymentHistoryAdmin;
  pageParams: {
    pageIndex: number;
    pageSize: number;
  };
  onToggleClick: (id: string) => void;
  onView: (id: string) => void;
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
        header: "Payment Date",
        accessorKey: "created_at",
        cell: ({ row: { original } }: CellProps<{ created_at: string }>) => {
          const [date] = splitDateTime(original?.created_at ?? "");
          return date;
        },
      },
      {
        header: "Payment Time",
        accessorKey: "created_at",
        cell: ({ row: { original } }: CellProps<{ created_at: string }>) => {
          const [, time] = splitDateTime(original?.created_at ?? "");
          return time;
        },
      },
      {
        header: "Doctor",
        accessorKey: "doctor",
      },
      {
        header: "Patient",
        accessorKey: "patient",
      },

      {
        header: "Tranaction Rate",
        accessorKey: "transation_amount",
        cell: ({ row }: CellProps<{ transation_amount: string }>) => {
          return `Rs. ${row.original.transation_amount}`;
        },
      },
      {
        header: "Disbursal Date",
        accessorKey: "disbursal_date",
        cell: ({
          row: { original },
        }: CellProps<{ disbursal_date: string }>) => {
          return original.disbursal_date
            ? format(new Date(original.disbursal_date), "yyyy-MM-dd HH:mm")
            : "-";
        },
      },

      {
        header: "Disbursal Status",
        accessorKey: "id",
        cell: ({
          row: { original },
        }: CellProps<{ disbursal_status: boolean; id: number }>) => {
          return (
            <Switch
              isChecked={original.disbursal_status}
              onChange={() => {
                onToggleClick(original.id.toString());
              }}
            />
          );
        },
      },
      {
        header: "Action",
        accessorKey: "id",
        cell: ({
          row: { original },
        }: CellProps<{ disbursal_status: boolean; id: number }>) => {
          return <TableActions onView={() => onView(original.id.toString())} />;
        },
      },
    ],
    [paymentHistoryAdmin]
  );
};
