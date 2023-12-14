import TableActions from "@nepMeds/components/DataTable/TableActions";
import { IFaqList, IPaginationParams } from "@nepMeds/service/nepmeds-faq";
import { CellContext } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { CellProps } from "react-table";

export const columns = ({
  pagination,
  onOpenDeleteModal,
  setId,
  onOpen,
  setIsEdit,
}: {
  pagination: IPaginationParams;
  onOpenDeleteModal: () => void;
  setId: Dispatch<SetStateAction<string>>;
  onOpen: () => void;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}) => [
  {
    header: "S.N.",
    accessorFn: (_cell: CellContext<number, number>, index: number) => {
      return `${pagination.pageSize * pagination.pageIndex + (index + 1)}.`;
    },
  },
  {
    header: "Questions",
    accessorKey: "question",
  },
  {
    header: "Answers",
    accessorKey: "answer",
  },
  {
    header: "Date",
    accessorKey: "created_at",
    cell: ({ row }: CellProps<IFaqList>) => {
      return row?.original.created_at?.split("T")?.[0] ?? "";
    },
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: ({ row }: CellProps<{ id: string }>) => {
      const onDelete = () => {
        setId(row.original?.id);
        onOpenDeleteModal();
      };
      const onEdit = () => {
        setId(row.original?.id);
        onOpen();
        setIsEdit(true);
      };
      return <TableActions onDelete={onDelete} onEdit={onEdit} />;
    },
  },
];
