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
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { useDoctorList } from "@nepMeds/service/nepmeds-doctorlist";
import { CellContext } from "@tanstack/react-table";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Show } from "react-iconly";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDoctorDetail } from "@nepMeds/service/nepmeds-doctor-detail";
import DoctorDetail from "@nepMeds/components/DoctorDetail/DoctorDetail";

const schema = yup.object().shape({
  remarks: yup.string().required("Remarks is required!"),
});

const RegisteredDocList = () => {
  const {
    isOpen: isDetailsModalOpen,
    onOpen: onDetailsModalOpen,
    onClose: onDetailsModalClose,
  } = useDisclosure();
  const { isOpen: _isRejectModalOpen } = useDisclosure();
  const formMethods = useForm({
    resolver: yupResolver(schema),
  });

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
              colorScheme={
                profile_status === "approved"
                  ? "green"
                  : profile_status === "rejected"
                  ? "red"
                  : "yellow"
              }
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
                formMethods.reset(cell.row.original);
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
  const [id, setId] = React.useState("");
  const { data: detail, isLoading: isFetching } = useDoctorDetail(id);
  const { data, isLoading } = useDoctorList();
  const [searchFilter, setSearchFilter] = useState("");
  const acceptDoctor = () => {
    onDetailsModalClose();
  };

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
      <ModalComponent
        alignment="left"
        isOpen={isDetailsModalOpen}
        onClose={acceptDoctor}
        size="3xl"
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Doctor Info</Text>
          </HStack>
        }
        primaryText="Accept"
        secondaryText="Reject"
        footer={<HStack w="100%" gap={3}></HStack>}
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

export default RegisteredDocList;
