import { Spinner, Text, useDisclosure } from "@chakra-ui/react";
import StatusBadge from "@nepMeds/components/Common/StatusBadge";
import { DataTable } from "@nepMeds/components/DataTable";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import TableWrapper from "@nepMeds/components/TableWrapper";
import { getFullDate } from "@nepMeds/helper/dateTImeConverter";
import {
  IInvoices,
  useGetAllInvoices,
  useGetInvoices,
} from "@nepMeds/service/nepmeds-invoices";
import { useMemo, useState } from "react";
import { CellProps } from "react-table";

const Invoices = () => {
  // TODO: put this id in the param
  const [id, setId] = useState("");

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  // TODO: add pagination
  const { data: tableData, isFetching } = useGetAllInvoices();
  const { data: invoicesDetails, isFetching: isFetchingInvoices } =
    useGetInvoices({ id });

  const { onOpen, onClose, isOpen } = useDisclosure();

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
      <ModalComponent
        heading={<>Invoices Details</>}
        isOpen={isOpen}
        footer={<></>}
        onClose={onClose}
      >
        {isFetchingInvoices ? (
          <Spinner />
        ) : (
          <Text>{invoicesDetails?.transaction_amount}</Text>
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
