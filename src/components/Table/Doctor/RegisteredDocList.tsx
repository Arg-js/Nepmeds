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
import { svgs } from "@nepMeds/assets/svgs";
import NepmedsLogo from "@nepMeds/assets/images/logo.png";
import { DataTable } from "@nepMeds/components/DataTable";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { toastSuccess, toastFail } from "@nepMeds/components/Toast";
import { useApproveDoc } from "@nepMeds/service/nepmeds-approve-doc";
import { useDoctorList } from "@nepMeds/service/nepmeds-doctorlist";
import { colors } from "@nepMeds/theme/colors";
import { CellContext } from "@tanstack/react-table";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Show } from "react-iconly";
import { RejectionForm } from "@nepMeds/components/FormComponents/RejectionForm/RejectionForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRejectDoc } from "@nepMeds/service/nepmeds-reject-doc";

const schema = yup.object().shape({
  remarks: yup.string().required("Remarks is required!"),
});

const RegisteredDocList = () => {
  const {
    isOpen: isDetailsModalOpen,
    onOpen: onDetailsModalOpen,
    onClose: onDetailsModalClose,
  } = useDisclosure();
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModalOpen,
    onClose: onRejectModalClose,
  } = useDisclosure();
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
  const [isRejected, setIsRejected] = React.useState(false);
  const [id, setId] = React.useState(null);
  const approvePendingDoc = useApproveDoc();
  const rejectPendingDoc = useRejectDoc();

  const { data, isLoading } = useDoctorList();
  const [searchFilter, setSearchFilter] = useState("");
  const rejectModal = () => {
    setIsRejected(true);
    onDetailsModalClose();
    onRejectModalOpen();
  };
  const acceptDoctor = () => {
    onDetailsModalClose();
  };
  const RejectDoctor = () => {
    onRejectModalClose();
  };
  const onSubmitForm = async () => {
    try {
      const isValid = await formMethods.trigger("remarks");
      if (!isValid) return;

      const val = formMethods.getValues("remarks");
      await rejectPendingDoc.mutateAsync({
        id: id ?? "",
        remarks: val,
      });
      onRejectModalClose();
      formMethods.reset();
    } catch (error) {
      toastFail("Doctor Rejected!");
    }
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
        isOpen={isDetailsModalOpen}
        onClose={acceptDoctor}
        size="xl"
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Doctor Info</Text>
          </HStack>
        }
        primaryText="Accept"
        secondaryText="Reject"
        otherAction={rejectModal}
        onApiCall={() => {
          onDetailsModalClose();
          approvePendingDoc.mutateAsync(id ?? "");
          toastSuccess("Doctor Approved");
        }}
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
      {/* {status === "pending" ||
        (status === "rejected" && ( */}
      <ModalComponent
        isOpen={isRejectModalOpen}
        onClose={RejectDoctor}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Remarks for rejection</Text>
          </HStack>
        }
        primaryText="Reject"
        secondaryText="Cancel"
        otherAction={onRejectModalClose}
      >
        <FormProvider {...formMethods}>
          <RejectionForm onSubmit={formMethods.handleSubmit(onSubmitForm)} />
        </FormProvider>
      </ModalComponent>
      {/* ))} */}
    </>
  );
};

export default RegisteredDocList;
