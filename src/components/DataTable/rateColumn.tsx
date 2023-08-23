import { Badge, Flex, HStack, Icon, Image, Text } from "@chakra-ui/react";
import {
  IAllPaymentResponse,
  IAmountListDoctor,
} from "@nepMeds/service/nepmeds-payment";
import { CellContext } from "@tanstack/react-table";
import { Edit } from "react-iconly";

//Rate Column
export const paymentRateColumn = (onEditClick: () => void) => {
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
        return _cell?.created_date;
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
    {
      header: "Payment Method",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <Flex>
            {row?.original?.payment_modes?.map(e => (
              <Image key={e.id} src={e.url} width={"80px"} />
            ))}
          </Flex>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: CellContext<IAmountListDoctor, any>) => {
        const show = row?.original?.rate_status === "2";
        return (
          <HStack>
            {show && (
              <Icon
                as={Edit}
                fontSize={20}
                cursor="pointer"
                color={"green"}
                onClick={onEditClick}
              />
            )}
          </HStack>
        );
      },
    },
  ];
};
