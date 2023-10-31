import TableActions from "@nepMeds/components/DataTable/TableActions";
import { IFaqList } from "@nepMeds/service/nepmeds-faq";
import { formatDateToString } from "@nepMeds/utils/TimeConverter/timeConverter";
import { CellContext } from "@tanstack/react-table";
import { CellProps } from "react-table";
formatDateToString;
export const columns = [
  {
    header: "S.N.",
    accessorFn: (_cell: CellContext<number, number>, index: number) => {
      return index + 1;
    }
  },
  {
    header: "Questions",
    accessorKey: "question"
  },
  {
    header: "Answers",
    accessorKey: "answer"
  },
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ row }: CellProps<IFaqList>) => {
      return row?.original.created_at?.split("T")?.[0] ?? "";
    }
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: () => {
      return (
        <TableActions
          onDelete={() => {
            // onOpen(row.original.id?.toString());
          }}
        />
      );
    }
  }
];
