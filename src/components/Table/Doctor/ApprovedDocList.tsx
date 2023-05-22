import {
  Badge,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NepmedsLogo from "@nepMeds/assets/images/logo.png";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { RejectionForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useDoctorList } from "@nepMeds/service/nepmeds-doctorlist";
import { colors } from "@nepMeds/theme/colors";
import { CellContext } from "@tanstack/react-table";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Show } from "react-iconly";

const ApprovedDocList = () => {
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
  const [isRejected, setIsRejected] = React.useState(false);

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
              onClick={onDetailsModalOpen}
              cursor="pointer"
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
    toastSuccess("Doctor Approved");
  };
  const RejectDoctor = () => {
    onRejectModalClose();
  };

  // const approvedList = useApprovedDoctorList();
  const { data } = useDoctorList();

  const formMethods = useForm();
  const onSubmitForm = (values: any) => {};

  return (
    <>
      <DataTable columns={columns} data={data || []} />
      <ModalComponent
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
        onApiCall={() => {
          formMethods.trigger("remarks");
          const val = formMethods.getValues("remarks");
          toastFail("Doctor Rejected!");
          onRejectModalClose();
          formMethods.reset();
        }}
      >
        <FormProvider {...formMethods}>
          <RejectionForm onSubmit={formMethods.handleSubmit(onSubmitForm)} />
        </FormProvider>
      </ModalComponent>
    </>
  );
};

export default ApprovedDocList;
