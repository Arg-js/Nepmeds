import { SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NepmedsLogo from "@nepMeds/assets/images/logo.png";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { useApprovedDoctorList } from "@nepMeds/service/nepmeds-approved-doctor-list";
import { colors } from "@nepMeds/theme/colors";
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
              onClick={onDetailsModalOpen}
              cursor="pointer"
            />
          );
        },
      },
    ],
    []
  );

  const { data, isLoading } = useApprovedDoctorList();
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
        size="xl"
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
        <Flex gap={4}>
          <Image
            src={NepmedsLogo}
            alt="nepmeds logo"
            h={20}
            w={20}
            borderRadius="100%"
            objectFit="cover"
          />
          <Flex direction="column">
            <Text color={colors.primary_blue} fontWeight={600}>
              Rahul Moktan
            </Text>

            <Text>MBBS M.S. (Gen. Surg), M.Ch.(PL Surg)</Text>
            <Text>
              Hello, I am a Plastic Surgeon. I have more than 5 years of
              experience in the field.
            </Text>
          </Flex>
        </Flex>

        <Text>Basic Information</Text>
        <Flex gap={30}>
          <Flex direction="column">
            <p style={{ fontSize: "small" }}>Number</p>
            <p>9990</p>
          </Flex>
          <Flex direction="column">
            <p style={{ fontSize: "small" }}>Email</p>
            <p>9990</p>
          </Flex>
          <Flex direction="column">
            <p style={{ fontSize: "small" }}>Gender</p>
            <p>9990</p>
          </Flex>
        </Flex>
        <Flex gap={30}>
          <Flex direction="column">
            <p style={{ fontSize: "small" }}>Specialization</p>
            <p>9990</p>
          </Flex>
        </Flex>
        <Flex gap={30}>
          <Flex direction="column">
            <p style={{ fontSize: "small" }}>Patients name</p>
            <p>9990</p>
          </Flex>
          <Flex direction="column">
            <p style={{ fontSize: "small" }}>Age</p>
            <p>9990</p>
          </Flex>
        </Flex>
        <Divider my={4} />
        <Text>Citizenship Details</Text>
        <Flex gap={30}>
          <Flex direction="column">
            <p style={{ fontSize: "small" }}>Citizenship Number</p>
            <p>9990</p>
          </Flex>
          <Flex direction="column">
            <p style={{ fontSize: "small" }}>Issued District</p>
            <p>9990</p>
          </Flex>
          <Flex direction="column">
            <p style={{ fontSize: "small" }}>Issued Date</p>
            <p>9990</p>
          </Flex>
        </Flex>
        <Divider my={4} />
        <Text>Address Details</Text>
        <Flex gap={30}>
          <Flex direction="column">
            <p style={{ fontSize: "small" }}>Province</p>
            <p>9990</p>
          </Flex>
          <Flex direction="column">
            <p style={{ fontSize: "small" }}>District</p>
            <p>9990</p>
          </Flex>
          <Flex direction="column">
            <p style={{ fontSize: "small" }}>Municipality/ VDC</p>
            <p>9990</p>
          </Flex>
        </Flex>
      </ModalComponent>
    </>
  );
};

export default ApprovedDocList;
