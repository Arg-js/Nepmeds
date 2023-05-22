import { Badge, Icon } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import { useDoctorList } from "@nepMeds/service/nepmeds-doctorlist";
import { CellContext } from "@tanstack/react-table";
import React from "react";
import { Show } from "react-iconly";

const RegisteredDocList = () => {
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
          return (
            <Icon
              as={Show}
              fontSize={20}
              //   onClick={onDetailsModalOpen}
              cursor="pointer"
            />
          );
        },
      },
    ],
    []
  );

  const { data, isLoading } = useDoctorList();
  return (
    <>
      <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />;
    </>
  );
};

export default RegisteredDocList;
