import { SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import { useDoctorList } from "@nepMeds/service/nepmeds-doctorlist";
import { CellContext } from "@tanstack/react-table";
import React, { useState } from "react";
import { Show } from "react-iconly";

const RegisteredDocList = () => {
  const columns = React.useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_cell: CellContext<any, any>, index: number) => {
          return index + 1;
        },
      },
      {
        header: "Doctor's Name",
        accessorKey: "full_name",
      },
      {
        header: "Contact Number",
        accessorKey: "contact_number",
      },
      {
        header: "Specialization",
        accessorKey: "specialization",
        cell: ({ row }: CellContext<{ specialization: any }, any>) => {
          const { name } = row?.original?.specialization[0] ?? "";

          return <p>{name}</p>;
        },
      },
      {
        header: "Status",
        accessorKey: "profile_status",
        cell: ({ row }: CellContext<{ profile_status: string }, any>) => {
          const { profile_status } = row.original;

          return (
            <Badge
              colorScheme={profile_status === "approved" ? "green" : "yellow"}
            >
              {profile_status}
            </Badge>
          );
        },
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: () => {
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
  const [searchFilter, setSearchFilter] = useState("");

  if (isLoading)
    return (
      <Spinner
        style={{ margin: "0 auto", textAlign: "center", display: "block" }}
      />
    );
  return (
    <>
      <HStack justifyContent="space-between">
        <Text fontWeight="medium">Registered Doctors</Text>
        <HStack>
          <InputGroup w="auto">
            <InputLeftElement pointerEvents="none" h={8}>
              <SearchIcon color="gray.300" boxSize={3} />
            </InputLeftElement>
            <Input
              w={40}
              h={8}
              onChange={({ target: { value } }) => setSearchFilter(value)}
            />
          </InputGroup>
        </HStack>
      </HStack>
      <DataTable
        columns={columns}
        data={data ?? []}
        filter={{ globalFilter: searchFilter }}
      />
    </>
  );
};

export default RegisteredDocList;
