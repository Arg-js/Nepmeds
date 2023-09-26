import { Text } from "@chakra-ui/react";
import StatusBadge from "@nepMeds/components/Common/StatusBadge";
import { getFullDate } from "@nepMeds/helper/dateTImeConverter";
import { IAmountListDoctor } from "@nepMeds/service/nepmeds-payment";
import { CellContext, PaginationState } from "@tanstack/react-table";

//Rate Column
export const paymentRateColumn = (pageParams: PaginationState) => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
      },
      size: 2,
    },
    {
      header: "Requested Date",
      accessorKey: "requested_date",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        return getFullDate(row?.original?.requested_date) ?? "-";
      },
      size: 22,
    },

    {
      header: "Verified Date",
      accessorKey: "approved_date",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        return row?.original?.approved_date ?? "-";
      },
      size: 22,
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        return (
          <StatusBadge
            customProps={{
              status: row?.original?.rate_status,
            }}
          />
        );
      },
      size: 10,
    },

    {
      header: "Instant Rate",
      accessorKey: "instant_amount",
      size: 10,
    },
    {
      header: "Appointment Rate",
      accessorKey: "schedule_amount",
      size: 10,
    },
  ];
};
export const rateHistoryColumn = ({ pageIndex, pageSize }: PaginationState) => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return `${pageIndex * pageSize + (index + 1)}.`;
      },
      size: 2,
    },
    {
      header: "Requested Date",
      accessorKey: "requested_date",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        return getFullDate(row?.original?.requested_date) ?? "-";
      },
      size: 22,
    },

    {
      header: "Verified Date",
      accessorKey: "approval_date",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        return row?.original?.approved_date ?? "-";
      },
      size: 22,
    },

    {
      header: "Instant Rate",
      accessorKey: "instant_amount",
      size: 10,
    },
    {
      header: "Appointment Rate",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        return <Text pl={"12px"}>Rs. {row?.original?.schedule_amount}</Text>;
      },
      size: 10,
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        return (
          <StatusBadge
            customProps={{
              status: row?.original?.rate_status,
            }}
          />
        );
      },
      size: 10,
    },
  ];
};
