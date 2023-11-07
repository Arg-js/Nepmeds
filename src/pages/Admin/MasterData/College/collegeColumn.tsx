import TableActions from "@nepMeds/components/DataTable/TableActions";
import { Dispatch, SetStateAction } from "react";
import { CellProps } from "react-table";

export const columns = ({
  onOpenDeleteModal,
  setId,
  setIsEdit,
  onOpenCollegeModal,
}: {
  onOpenDeleteModal: () => void;
  setId: Dispatch<SetStateAction<string>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  onOpenCollegeModal: () => void;
}) => [
  {
    header: "S.N.",
    accessorFn: (_: any, index: number) => {
      return `${index + 1}.`;
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
