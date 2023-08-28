import { Text } from "@chakra-ui/react";
import { IAmountListDoctor } from "@nepMeds/service/nepmeds-payment";
import { CellContext } from "@tanstack/react-table";
import StatusBadge from "../Common/StatusBadge";

//Rate Column
export const paymentRateColumn = () => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return index + 1;
      },
      size: 2,
    },
    {
      header: "Requested Date",
      accessorKey: "pending_date",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        return row?.original?.requested_date ?? "-";
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
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        return <Text pl={"12px"}>Rs. {row?.original?.instant_amount}</Text>;
      },
      size: 10,
    },
    {
      header: "Appointment Rate",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        return <Text pl={"12px"}>Rs. {row?.original?.schedule_amount}</Text>;
      },
      size: 10,
    },
  ];
};
