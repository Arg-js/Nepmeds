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
  useDisclosure,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import DoctorDetail from "@nepMeds/components/DoctorDetail/DoctorDetail";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { useApprovedDoctorList } from "@nepMeds/service/nepmeds-approved-doctor-list";
import { useDoctorDetail } from "@nepMeds/service/nepmeds-doctor-detail";
import { CellContext } from "@tanstack/react-table";
import React, { useState } from "react";
import { Show } from "react-iconly";

const ApprovedDocList = () => {
  const {
    isOpen: isDetailsModalOpen,
    onOpen: onDetailsModalOpen,
    onClose: onDetailsModalClose,
  } = useDisclosure();

  const columns = React.useMemo(
    () => [
      {
        header: "S.N.",
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
              p={1}
              borderRadius={20}
              fontSize={11}
              w={20}
              textAlign="center"
              textTransform="capitalize"
            >
              {profile_status}
            </Badge>
          );
        },
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (cell: CellContext<any, any>) => {
          return (
            <Icon
              as={Show}
              fontSize={20}
              cursor="pointer"
              onClick={() => {
                onDetailsModalOpen();
                setId(cell.row.original.id);
              }}
            />
          );
        },
      },
    ],
    []
  );

  const { data, isLoading } = useApprovedDoctorList();
  const [searchFilter, setSearchFilter] = useState("");
  const [id, setId] = React.useState("");
  const { data: detail, isLoading: isFetching } = useDoctorDetail(id);
  if (isLoading)
    return (
      <Spinner
        style={{ margin: "0 auto", textAlign: "center", display: "block" }}
      />
    );

  return (
    <>
      <HStack justifyContent="space-between">
        <Text fontWeight="medium">Approved Doctors</Text>

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
        data={data || []}
        filter={{ globalFilter: searchFilter }}
      />
      <ModalComponent
        alignment="left"
        size="3xl"
        isOpen={isDetailsModalOpen}
        onClose={onDetailsModalClose}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Doctor Info</Text>
          </HStack>
        }
        footer={<></>}
      >
        {isFetching ? (
          <Spinner
            style={{ margin: "0 auto", textAlign: "center", display: "block" }}
          />
        ) : (
          <DoctorDetail {...detail} />
        )}
      </ModalComponent>
    </>
  );
};

export default ApprovedDocList;
