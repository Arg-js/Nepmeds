import { Image, Text } from "@chakra-ui/react";
import StatusBadge from "@nepMeds/components/Common/StatusBadge";
import { ADMINAPPOINTMENT } from "@nepMeds/config/enum";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import { IPaymentHistory } from "@nepMeds/service/nepmeds-payment";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";
import { convertToTitleCase } from "@nepMeds/utils/string";
import { splitDateTime } from "@nepMeds/utils/time";
import { useMemo } from "react";
import { CellProps } from "react-table";

export const paymentHistoryColumn = ({
  paymentHistory,
  pageParams,
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
        },
      },
      {
        header: "Patient Name",
        accessorKey: "availability.booking_info.patient_name",
      },
      {
        header: "Call Type",
        accessorKey: "consult_history.consulting_type",
        cell: ({
          row,
        }: CellProps<{ consult_history: { consulting_type: string } }>) => {
          return convertToTitleCase(
            ADMINAPPOINTMENT[
              row.original?.consult_history
                ?.consulting_type as keyof typeof ADMINAPPOINTMENT
            ]?.toString() ?? ""
          );
        },
      },
      {
        header: "Payment Type",
        accessorKey: "consult_history.payment_type",
        cell: ({
          row,
        }: CellProps<{
          consult_history: {
            payment_type: string;
          };
        }>) => {
          const paymentType = row.original?.consult_history?.payment_type;
          return (
            paymentType && (
              <Image src={getImageUrl(paymentType)} h={"50px"} w={"50px"} />
            )
          );
        },
      },
      {
        header: "Appointment Time",
        accessorKey: "availability.from_time",
        cell: ({
          row,
        }: CellProps<{
          availability: { from_time: string; to_time: string };
        }>) => {
          const availability = row.original?.availability;
          return `${removeSeconds(availability.from_time)} - ${removeSeconds(
            availability.to_time
          )}`;
        },
      },
      {
        header: "Appointment Date",
        accessorKey: "availability.date",
      },
      {
        header: "Rate",
        accessorKey: "doctor_rate",
        cell: ({ row }: CellProps<{ doctor_rate: string }>) => {
          return <Text>Rs. {row.original?.doctor_rate}</Text>;
        },
      },
      {
        header: "Payment Date",
        accessorKey: "consult_history.payment_date",
        cell: ({
          row,
        }: CellProps<{ consult_history: { payment_date: string } }>) => {
          const paymentDate = row.original?.consult_history?.payment_date;
          return (
            <Text>{paymentDate ? splitDateTime(paymentDate)[0] : "-"}</Text>
          );
        },
      },
      {
        header: "Disbursal Status",
        accessorKey: "disbursal_status",
        cell: ({
          row: { original },
        }: CellProps<{ disbursal_status: boolean }>) => {
          return (
            <StatusBadge
              customProps={{
                status: original?.disbursal_status ? "1" : "2",
                badgeText: {
                  "1": "Disbursed",
                  "2": "Pending",
                },
              }}
            />
          );
        },
      },
    ],
    [paymentHistory]
  );
};
