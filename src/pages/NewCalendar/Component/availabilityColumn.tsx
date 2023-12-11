import TableActions from "@nepMeds/components/DataTable/TableActions";
import { CellProps } from "react-table";
import { IPaginationParams } from "@nepMeds/service/nepmeds-faq";
import { AVAILABILITYFREQUENCY } from "@nepMeds/config/enum";
import { convertToTitleCase } from "@nepMeds/utils/string";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";

export const availabilityColumn = ({
  pageParams,
  onModalOpen,
}: {
  pageParams: IPaginationParams;
  onModalOpen: ({
    from_time,
    to_time,
    id,
  }: {
    from_time: string;
    to_time: string;
    id: string;
  }) => void;
}) => {
  return [
    {
      header: "S.N.",
      accessorFn: (_: unknown, index: number) => {
        return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
      },
    },
    {
      header: "Availability Title",
      accessorKey: "availability_title",
    },
    {
      header: "Time",
      cell: ({ row }: CellProps<{ from_time: string; to_time: string }>) => {
        return (
          <>
            {removeSeconds(row.original.from_time)} -{" "}
            {removeSeconds(row.original.to_time)}
          </>
        );
      },
    },
    {
      header: "Date",
      cell: ({ row }: CellProps<{ date: string; to_date: string }>) => {
        return `${row.original.date} - ${row.original.to_date}`;
      },
    },
    {
      header: "Frequency",
      cell: ({ row }: CellProps<{ frequency: string }>) => {
        const frequency =
          AVAILABILITYFREQUENCY[
            row.original.frequency as keyof typeof AVAILABILITYFREQUENCY
          ];
        return convertToTitleCase(frequency.toString());
      },
    },
    { header: "Booking Numbers", accessorKey: "booking_count" },
    {
      header: "Actions",
      cell: ({
        row,
      }: CellProps<{ id: string; date: string; to_date: string }>) => {
        return (
          <TableActions
            onView={() =>
              onModalOpen({
                from_time: row.original.date,
                to_time: row.original.to_date,
                id: row.original.id,
              })
            }
          />
        );
      },
    },
  ];
};
