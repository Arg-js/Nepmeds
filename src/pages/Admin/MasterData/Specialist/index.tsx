import { Badge, HStack, IconButton } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import {
  Specialization,
  useSpecializationData,
} from "@nepMeds/service/nepmeds-specialization";
import { CellContext } from "@tanstack/react-table";
import { Fragment } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const Specializations = () => {
  const { data: specialization = [] } = useSpecializationData();

  const columns = [
    {
      header: "S.N.",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return index + 1;
      },
    },
    {
      header: "Specialization Name",
      accessorKey: "name",
    },
    {
      header: "Symptom",
      cell: (cell: CellContext<Specialization, any>) => {
        return (
          <HStack>
            {cell.row.original.symptom.map(s => (
              <Badge key={s.keyword} textTransform="initial" fontWeight="light">
                {s.keyword}
              </Badge>
            ))}
          </HStack>
        );
      },
    },
    {
      header: "Actions",
      cell: (_cell: CellContext<any, any>) => {
        return (
          <HStack justifyContent="center">
            <IconButton aria-label="edit" variant="ghost" size="sm" w="auto">
              <AiOutlineEdit size={18} />
            </IconButton>
            <IconButton aria-label="delete" variant="ghost" size="sm" w="auto">
              <AiOutlineDelete size={18} />
            </IconButton>
          </HStack>
        );
      },
    },
  ];

  return (
    <Fragment>
      <DataTable columns={columns} data={specialization} />
    </Fragment>
  );
};

export default Specializations;
