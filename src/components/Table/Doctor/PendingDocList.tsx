import { Badge, Icon } from "@chakra-ui/react";
import { useDoctorList } from "@nepMeds/service/nepmeds-doctorlist";
import React from "react";
import { Show } from "react-iconly";
import { CellProps } from "react-table";
import ComponentTable from "../ComponentTable";
import { usePendingDoctorList } from "@nepMeds/service/nepmeds-pending-doctor-list";

const PendingDocList = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "S.N",
        accessor: "id",
      },
      {
        Header: "Doctor's Name",
        accessor: "full_name",
      },
      {
        Header: "Contact Number",
        accessor: "contact",
      },
      {
        Header: "Specialization",
        accessor: "specialization",
        Cell: ({ row }: CellProps<{ specialization: any }>) => {
          const { name } = row?.original?.specialization[0] ?? "";

          return <p>{name}</p>;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }: CellProps<{ status: string }>) => {
          const { status } = row.original;
          return (
            <Badge colorScheme={status === "Approved" ? "green" : "yellow"}>
              {status}
            </Badge>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
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

  const { data } = usePendingDoctorList();

  return <ComponentTable columns={columns} data={data || []} />;
};

export default PendingDocList;
