import { SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
  HStack,
  Text,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import { usePendingDoctorList } from "@nepMeds/service/nepmeds-pending-doctor-list";
import { CellContext } from "@tanstack/react-table";
import React, { useState } from "react";
import { Show } from "react-iconly";
import { FormProvider, useForm } from "react-hook-form";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { RejectionForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useApproveDoc } from "@nepMeds/service/nepmeds-approve-doc";
import { useRejectDoc } from "@nepMeds/service/nepmeds-reject-doc";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDoctorDetail } from "@nepMeds/service/nepmeds-doctor-detail";
import DoctorDetail from "@nepMeds/components/DoctorDetail/DoctorDetail";

const schema = yup.object().shape({
  remarks: yup.string().required("Remarks  is required!"),
});
const PendingDocList = () => {
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
  const [_isRejected, setIsRejected] = React.useState(false);
  const { data, isLoading } = usePendingDoctorList();
  const [id, setId] = React.useState("");

  const approvePendingDoc = useApproveDoc();
  const rejectPendingDoc = useRejectDoc();
  const { data: detail, isLoading: isFetching } = useDoctorDetail(id);
  const formMethods = useForm({ resolver: yupResolver(schema) });
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
        <Text fontWeight="medium">Pending Doctors</Text>

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
        size="2xl"
        approve
        reject
        isOpen={isDetailsModalOpen}
        onClose={acceptDoctor}
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
        {isFetching ? (
          <Spinner
            style={{ margin: "0 auto", textAlign: "center", display: "block" }}
          />
        ) : (
          <DoctorDetail {...detail} />
        )}
      </ModalComponent>

      <ModalComponent
        isOpen={isRejectModalOpen}
        onClose={RejectDoctor}
        approve
        reject
        size="xl"
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Remarks for rejection</Text>
          </HStack>
        }
        primaryText="Reject"
        secondaryText="Cancel"
        otherAction={onRejectModalClose}
        onApiCall={async () => {
          try {
            const isValid = await formMethods.trigger("remarks");
            if (!isValid) return;

            const val = formMethods.getValues("remarks");
            await rejectPendingDoc.mutateAsync({
              id: id ?? "",
              remarks: val,
            });
            onRejectModalClose();
            toastFail("Doctor Rejected!");
            formMethods.reset();
          } catch (error) {
            toastFail("Some issue while rejection!");
          }
        }}
      >
        <FormProvider {...formMethods}>
          <RejectionForm onSubmit={formMethods.handleSubmit(onSubmitForm)} />
        </FormProvider>
      </ModalComponent>
    </>
  );
};

export default PendingDocList;
