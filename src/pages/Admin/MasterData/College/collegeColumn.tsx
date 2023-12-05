import TableActions from "@nepMeds/components/DataTable/TableActions";
import { Dispatch, SetStateAction } from "react";
import { CellProps } from "react-table";

export const columns = ({
  paginationParams,
  onOpenDeleteModal,
  setId,
  setIsEdit,
  onOpenCollegeModal,
}: {
  paginationParams: {
    pageIndex: number;
    pageSize: number;
  };
  onOpenDeleteModal: () => void;
  setId: Dispatch<SetStateAction<string>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  onOpenCollegeModal: () => void;
}) => [
  {
    header: "S.N.",
    accessorFn: (_: unknown, index: number) => {
      return `${
        paginationParams.pageIndex * paginationParams.pageSize + index + 1
      }.`;
    },
  },
  { header: "Name", accessorKey: "name" },
  {
    header: "Actions",
    cell: ({ row }: CellProps<{ id: string }>) => {
      const onDelete = () => {
        setId(row.original?.id);
        onOpenDeleteModal();
      };
      const onEdit = () => {
        setId(row.original?.id);
        onOpenCollegeModal();
        setIsEdit(true);
      };
      return <TableActions onDelete={onDelete} onEdit={onEdit} />;
    },
  },
];
