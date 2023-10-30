import TableActions from "@nepMeds/components/DataTable/TableActions";
import { Dispatch, SetStateAction } from "react";
import { CellProps } from "react-table";

export const hospitalColumns = ({
  paginationParams,
  setIsEdit,
  setId,
  onOpenHospitalModal,
  onDeleteModalOpen
}: {
  paginationParams: {
    pageIndex: number;
    pageSize: number;
  };
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
  onOpenHospitalModal: () => void;
  onDeleteModalOpen: () => void;
}) => [
  {
    header: "S.N.",
    accessorFn: (_: any, index: number) => {
      return `${
        paginationParams.pageIndex * paginationParams.pageSize + index + 1
      }.`;
    }
  },
  { header: "name", accessorKey: "name" },
  {
    header: "Actions",
    cell: ({ row }: CellProps<{ id: string }>) => {
      const onEdit = () => {
        setIsEdit(true);
        setId(row?.original?.id);
        onOpenHospitalModal();
      };
      const onDelete = () => {
        setId(row.original?.id);
        onDeleteModalOpen();
      };
      return <TableActions onEdit={onEdit} onDelete={onDelete} />;
    }
  }
];
