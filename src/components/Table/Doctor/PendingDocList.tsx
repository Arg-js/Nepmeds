import { Badge, Icon } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import { usePendingDoctorList } from "@nepMeds/service/nepmeds-pending-doctor-list";
import { CellContext } from "@tanstack/react-table";
import React from "react";
import { Show } from "react-iconly";

const PendingDocList = () => {
  const columns = React.useMemo(
    () => [
      {
        header: "S.N",
        accessorKey: "id",
      },
      {
        header: "Doctor's Name",
        accessorKey: "full_name",
      },
      {
        header: "Contact Number",
        accessorKey: "contact",
      },
      {
        header: "Specialization",
        accessorKey: "specialization",
        Cell: ({ row }: CellContext<{ specialization: any }, any>) => {
          const { name } = row?.original?.specialization[0] ?? "";

          return <p>{name}</p>;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        Cell: ({ row }: CellContext<{ status: string }, any>) => {
          const { status } = row.original;
          return (
            <Badge colorScheme={status === "Approved" ? "green" : "yellow"}>
              {status}
            </Badge>
          );
        },
      },
      {
        header: "Actions",
        accessorKey: "actions",
        Cell: () => {
          return <Icon as={Show} fontSize={20} cursor="pointer" />;
        },
      },
    ],
    []
  );

  const { data } = usePendingDoctorList();

  return <DataTable columns={columns} data={data || []} />;
};

export default PendingDocList;
