import { Image } from "@chakra-ui/react";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import { ADMINAPPOINTMENT } from "@nepMeds/config/enum";
import { IPaymentHistory } from "@nepMeds/service/nepmeds-payment";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";
import { convertToTitleCase } from "@nepMeds/utils/string";
import { useMemo } from "react";
import { CellProps } from "react-table";

export const paymentHistoryColumn = ({
  paymentHistory,
  pageParams
}: {
  paymentHistory?: IPaymentHistory;
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
        }
      },
      { header: "Patient Name", accessorKey: "patient_name" },
      {
        header: "Call Type",
        cell: ({ row }: CellProps<{ consulting_type: string }>) => {
          return convertToTitleCase(
            ADMINAPPOINTMENT[
              row.original?.consulting_type as keyof typeof ADMINAPPOINTMENT
            ].toString()
          );
        }
      },
      {
        header: "Payment Type",
        cell: ({
          row
        }: CellProps<{
          payment_type: string;
        }>) => {
          return (
            <Image
              src={getImageUrl(row.original.payment_type)}
              h={"70px"}
              w={"70px"}
            />
          );
        }
      },
      { header: "Rate", accessorKey: "transation_amount" },

      {
        header: "Actions",
        cell: () => {
          return <TableActions onView={() => console.error("view")} />;
        }
      }
    ],
    [paymentHistory]
  );
};
