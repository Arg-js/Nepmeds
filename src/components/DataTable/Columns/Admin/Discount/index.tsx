import { Switch, Tag, Text } from "@chakra-ui/react";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import { AmountType } from "@nepMeds/config/enum";
import { IPaginationParams } from "@nepMeds/service/nepmeds-faq";
import { CellContext } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { CellProps } from "react-table";

// Todo: try to memorize the column
export const columns = ({
  setIsStatus,
  setIsEdit,
  setId,
  onSwitchOpen,
  onDeleteModalOpen,
  onOpen,
  pageParams,
}: {
  pageParams: IPaginationParams;
  setIsStatus: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
  onSwitchOpen: () => void;
  onDeleteModalOpen: () => void;
  onOpen: () => void;
}) => [
  {
    header: "S.N.",
    accessorFn: (_cell: CellContext<number, number>, index: number) => {
      return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
    },
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Doctor",
    cell: ({ row }: CellProps<{ doctor_list: { name: string }[] }>) => {
      const doctorList = row.original?.doctor_list;
      return (
        <div>
          {doctorList.length ? (
            doctorList.map(({ name }) => <Tag key={name}>{name}</Tag>)
          ) : (
            // TODO: make this dash appear in center
            <Text>---</Text>
          )}
        </div>
      );
    },
  },
  {
    header: "Specialization",
    cell: ({
      row,
    }: CellProps<{
      specialization_list: { name: string }[];
    }>) => {
      const specializationList = row.original?.specialization_list;
      return (
        <div>
          {specializationList.length ? (
            specializationList.map(({ name }) => <Tag key={name}>{name}</Tag>)
          ) : (
            <Text>---</Text>
          )}
        </div>
      );
    },
  },
  {
    header: "Value",
    cell: ({
      row,
    }: CellProps<{
      value: string;
      discount_type: AmountType;
    }>) => {
      return `${row.original?.value} ${
        row.original?.discount_type === AmountType.PERCENTAGE ? "%" : ""
      }`;
    },
  },
  {
    header: "Start Date",
    accessorKey: "start_date",
  },
  {
    header: "End Date",
    accessorKey: "end_date",
  },
  {
    header: "Discount Code",
    accessorKey: "code",
  },
  {
    header: "Status",
    cell: ({ row }: CellProps<{ is_active: boolean; id: string }>) => {
      return (
        <Switch
          defaultChecked={row.original?.is_active}
          isChecked={row.original?.is_active}
          onChange={() => {
            setIsStatus(row.original?.is_active);
            setId(row.original?.id);
            onSwitchOpen();
          }}
        />
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }: CellProps<{ id: string }>) => {
      return (
        <TableActions
          onEdit={() => {
            onOpen();
            setIsEdit(true);
            setId(row.original?.id);
          }}
          onDelete={() => {
            setId(row.original?.id);
            onDeleteModalOpen();
          }}
        />
      );
    },
  },
];
