import { Badge, Text } from "@chakra-ui/react";
import { IAmountListDoctor } from "@nepMeds/service/nepmeds-payment";
import { CellContext } from "@tanstack/react-table";

//Rate Column
export const paymentRateColumn = () => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return index + 1;
      },
    },
    {
      header: "Pending Date",
      accessorKey: "pending_date",
      accessorFn: (_cell: IAmountListDoctor) => {
        return _cell?.requested_date;
      },
    },

    {
      header: "Approval Date",
      accessorKey: "approval_date",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        return row?.original?.approved_date ?? "-";
      },
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        const isApproved = row?.original?.rate_status === "1";

        return (
          <Badge
            colorScheme={isApproved ? "green" : "yellow"}
            p={1}
            borderRadius={20}
            fontSize={11}
            w={24}
            textAlign="center"
            textTransform="capitalize"
          >
            {isApproved ? "Approved" : "Pending"}
          </Badge>
        );
      },
    },

    {
      header: "Instant Rate",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        return <Text pl={"12px"}>Rs. {row?.original?.instant_amount}</Text>;
      },
    },
    {
      header: "Appointment Rate",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        return <Text pl={"12px"}>Rs. {row?.original?.schedule_amount}</Text>;
      },
    },
  ];
};
