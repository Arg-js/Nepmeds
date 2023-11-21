import TableActions from "@nepMeds/components/DataTable/TableActions";
import { CellProps } from "react-table";
import { IPaginationParams } from "@nepMeds/service/nepmeds-faq";
import { Dispatch, SetStateAction } from "react";

export const columns = ({
  setId,
  onOpen,
  pageParams,
}: {
  pageParams: IPaginationParams;
  setId: Dispatch<SetStateAction<string>>;
  onOpen: () => void;
}) => {
  return [
    {
      header: "S.N.",
      accessorFn: (_: unknown, index: number) => {
        return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
      },
    },
    {
      header: "FollowUp Date",
      cell: ({
        row,
      }: CellProps<{ followup_availability: { date: string } }>) => {
        return row.original?.followup_availability?.date ?? "---";
      },
    },
    {
      header: "FollowUp Time",
      cell: ({
        row,
      }: CellProps<{
        followup_availability: { from_time: string; to_time: string };
      }>) => {
        const followUpAvailability = row.original?.followup_availability;
        return followUpAvailability
          ? `${followUpAvailability.from_time.slice(
              0,
              5
            )} - ${followUpAvailability.to_time.slice(0, 5)}`
          : "---";
      },
    },
    { header: "Patient Name", accessorKey: "patient_name" },
    { header: "Last Appointment Date", accessorKey: "last_appointment_date" },
    {
      header: "Actions",
      cell: ({ row }: CellProps<{ id: string }>) => {
        const onEdit = () => {
          setId(row.original?.id);
          onOpen();
        };
        return <TableActions onEdit={onEdit} />;
      },
    },
  ];
};
