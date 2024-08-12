import {
  Box,
  Divider,
  Flex,
  Grid,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import StatusBadge from "@nepMeds/components/Common/StatusBadge";
import { DataTable } from "@nepMeds/components/DataTable";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import TableWrapper from "@nepMeds/components/TableWrapper";
import { PAYMENTMODE } from "@nepMeds/config/enum";
import { getFullDate, getTime } from "@nepMeds/helper/dateTImeConverter";
import {
  IInvoices,
  useGetAllInvoices,
  useGetInvoices,
} from "@nepMeds/service/nepmeds-invoices";
import { colors } from "@nepMeds/theme/colors";
import { useMemo, useState } from "react";
import { CellProps } from "react-table";

const Invoices = () => {
  // TODO: put this id in the param
  const [id, setId] = useState("");

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: tableData, isFetching } = useGetAllInvoices({
    pagination: {
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
    },
  });
  const { data: invoicesDetails, isFetching: isFetchingInvoices } =
    useGetInvoices({ id });

  const createdDate = invoicesDetails?.created_at;

  const { onOpen, onClose, isOpen } = useDisclosure();

  // TODO: move the column
  const columns = useMemo(
    () => [
      {
        header: "S.N.",
        accessorFn: (_: unknown, index: string) => `${index + 1}.`,
      },
      {
        header: "Doctor's Name",
        accessorKey: "to_user",
      },
      {
        header: "Date",
        accessorKey: "created_at",
        cell: ({ row: { original } }: CellProps<IInvoices>) => {
          return `${getFullDate(original.created_at)}`;
        },
      },
      {
        header: "Transaction Amount",
        accessorKey: "transaction_amount",
      },
      {
        header: "Payment Type",
        accessorKey: "payment_type",
        cell: ({ row: { original } }: CellProps<IInvoices>) => {
          return (
            <StatusBadge
              customProps={{
                status: original.payment_type,
                badgeText: {
                  "1": "Esewa",
                  "2": "Khalti",
                  "3": "Bank",
                  "4": "Promo",
                },
              }}
            />
          );
        },
      },
      {
        header: "Discount Amount",
        accessorKey: "discounted_amount",
        cell: ({ row: { original } }: CellProps<IInvoices>) => {
          const discountedAmount = original.discounted_amount;
          return discountedAmount === "0.000" ? "-" : discountedAmount;
        },
      },
      {
        header: "Actions",
        accessorKey: "id",
        cell: ({ row: { original } }: CellProps<IInvoices>) => {
          return (
            <TableActions
              onView={() => {
                onOpen();
                setId(original.id.toString());
              }}
            />
          );
        },
      },
    ],
    [tableData, pagination]
  );
  return (
    <TableWrapper>
      {/* TODO: move the modal component */}
      <ModalComponent
        size={"4xl"}
        heading={<>Invoices Details</>}
        isOpen={isOpen}
        footer={<></>}
        onClose={onClose}
      >
        {isFetchingInvoices ? (
          <Spinner />
        ) : (
          <>
            <Flex
              bg={colors.grey_light}
              p={3}
              alignItems={"center"}
              gap={5}
              borderRadius={"16px"}
              mb={4}
            >
              <Box
                height={"50px"}
                width={"50px"}
                borderRadius={"50%"}
                bgColor={"red"}
              />
              <Box>
                <Text fontSize={"md"} fontWeight={700}>
                  Total Amount Paid: {invoicesDetails?.transaction_amount}
                </Text>
                {createdDate && (
                  <Text fontSize={"sm"} fontWeight={400}>
                    {getFullDate(createdDate)}
                    {getTime(createdDate)}
                  </Text>
                )}
              </Box>
            </Flex>
            <Grid templateColumns={"repeat(4, 1fr)"} gap={8}>
              <Text variant="sm400" color={colors.black_60}>
                Transaction ID :
              </Text>
              <Text variant="md600" color={colors.black_60}>
                {invoicesDetails?.transaction_id}
              </Text>
              <Text>Payment ID :</Text>
              <Text variant="md600" color={colors.black_60}>
                {invoicesDetails?.payment_id}
              </Text>
              <Text>Order ID :</Text>
              <Text variant="md600" color={colors.black_60}>
                {invoicesDetails?.order_id}
              </Text>
              <Text>Transaction Amount :</Text>
              <Text variant="md600" color={colors.black_60}>
                {invoicesDetails?.transaction_amount}
              </Text>
            </Grid>
            <Divider my={3} />
            <Grid templateColumns={"repeat(4, 1fr)"} gap={3}>
              <Text>Sender name :</Text>
              <Text variant="md600" color={colors.black_60}>
                {invoicesDetails?.from_user}
              </Text>
              <Text>Receiver name :</Text>
              <Text variant="md600" color={colors.black_60}>
                {invoicesDetails?.to_user}
              </Text>
              <Text>Payment Type :</Text>
              <Text variant="md600" color={colors.black_60}>
                {
                  PAYMENTMODE[
                    invoicesDetails?.payment_type as keyof typeof PAYMENTMODE
                  ]
                }
              </Text>
              <Text>Discounted Amount :</Text>
              <Text variant="md600" color={colors.black_60}>
                {invoicesDetails?.discounted_amount ?? "-"}
              </Text>
            </Grid>
          </>
        )}
      </ModalComponent>
      <DataTable
        data={tableData?.results ?? []}
        columns={columns}
        isLoading={isFetching}
        pagination={{
          manual: true,
          pageCount: tableData?.page_count,
          pageParams: pagination,
          onChangePagination: setPagination,
        }}
      />
    </TableWrapper>
  );
};

export default Invoices;
