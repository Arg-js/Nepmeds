import {
  Avatar,
  Badge,
  Box,
  Flex,
  HStack,
  SkeletonCircle,
  SkeletonText,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import {
  ISymptom,
  useGetAppointmentRequest,
  useGetAppointmentRequestById,
} from "@nepMeds/service/nepmeds-doctor-patient-appointment";
import { colors } from "@nepMeds/theme/colors";
import { CellContext } from "@tanstack/react-table";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import { STATUSTYPE1 } from "@nepMeds/config/enum";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";

const statusInfo: {
  [key: string]: {
    label: string;
    color: string;
    textColor: string;
  };
} = {
  "1": {
    label: "Pending",
    color: "orange",
    textColor: colors.maroon,
  },
  "2": {
    label: "Confirmed",
    color: "green",
    textColor: colors.dark_green,
  },
  "3": {
    label: "Completed",
    color: "green",
    textColor: colors.dark_green,
  },
  "4": { label: "Cancelled", color: "red", textColor: colors.maroon },
};

const ApprovedAppointments: React.FC = () => {
  const [id, setId] = useState("");

  const {
    isOpen: isViewModalOpen,
    onOpen: onViewModalOpen,
    onClose: onViewModalClose,
  } = useDisclosure();

  // PAGINATION
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // PAGINATION ENDS

  // REACT QUERIES
  const { data: appointment, isLoading: appointmentLoading } =
    useGetAppointmentRequest({
      page: pageParams.pageIndex + 1,
      page_size: pageParams.pageSize,
      status: STATUSTYPE1.Confirmed,
    });

  const { data: patient, isLoading: isPatientLoading } =
    useGetAppointmentRequestById({ id });
  // REACT QUERIES END

  const column = useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: any, index: number) => {
          return ` ${index + 1}.`;
        },
      },
      {
        header: "Date",
        accessorKey: "created_at",
        accessorFn: ({ created_at }: { created_at: string }) => {
          return created_at.substr(0, 10);
        },
      },
      { header: "Patient Name", accessorKey: "patient_name" },
      {
        header: "Symptoms",
        accessorKey: "symptoms",
        accessorFn: ({ symptoms }: { symptoms: ISymptom[] }) => {
          return symptoms?.map(({ name }) => name);
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        // cell: ({ row }: CellProps<{ status: string }>) => {
        cell: ({ row }: CellContext<any, any>) => {
          return (
            <Badge
              colorScheme={statusInfo[row.original?.status].color}
              borderRadius={10}
              px={3}
              py={0.5}
              fontWeight={400}
              fontSize={"xs"}
              textTransform="capitalize"
              sx={{
                color: statusInfo[row.original?.status].textColor,
              }}
            >
              {statusInfo[row.original?.status].label}
            </Badge>
          );
        },
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }: CellContext<any, any>) => {
          const onView = () => {
            setId(row.original?.id);
            onViewModalOpen();
          };
          return <TableActions onView={onView} />;
        },
      },
    ],
    [appointment]
  );

  const InfoSection = ({
    label,
    content,
  }: {
    label: string;
    content: string;
  }) => {
    return (
      <Box>
        <Text fontWeight={400} fontSize="xs">
          {label}
        </Text>
        <Text fontWeight={400} fontSize="md">
          {content}
        </Text>
      </Box>
    );
  };

  return (
    <>
      <ModalComponent
        size={"2xl"}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Appointment</Text>
          </HStack>
        }
        isOpen={isViewModalOpen}
        onClose={onViewModalClose}
        footer={<></>}
      >
        {isPatientLoading ? (
          <>
            <Flex gap={6}>
              <SkeletonCircle size="30" />
              <Flex flex={1} direction={"column"} gap={2}>
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="3"
                />
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="3"
                />
              </Flex>
              <Flex flex={1} direction={"column"} gap={2}>
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="3"
                />
              </Flex>
            </Flex>
            <Flex mt={7} gap="0.5" direction={"column"}>
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Flex>
          </>
        ) : (
          <>
            <Flex gap={6}>
              <Avatar size="xl" />
              <Flex flex={1} direction={"column"} gap={2}>
                <InfoSection
                  label="Patient’s Name"
                  content={patient?.patient_name as string}
                />

                <InfoSection
                  label="Symptoms"
                  content={patient?.symptoms?.[0]?.name || "N/A"}
                />
              </Flex>
              <Flex flex={1} direction={"column"} gap={2}>
                <InfoSection label="Gender" content="Male" />
              </Flex>
            </Flex>
            <Flex mt={7} gap="0.5" direction={"column"}>
              <InfoSection
                label="Symptom Description"
                content={patient?.description as string}
              />
            </Flex>
          </>
        )}
      </ModalComponent>

      {/* TABLE HEADER */}
      <HStack justifyContent="space-between">
        <Text>Approved Appointments</Text>
      </HStack>
      <DataTable
        data={appointment?.results || []}
        columns={column}
        isLoading={appointmentLoading}
        pagination={{
          manual: true,
          pageParams: {
            pageIndex: pageParams.pageIndex,
            pageSize: pageParams.pageSize,
          },
          pageCount: appointment?.page_count,
          onChangePagination: setPageParams,
        }}
      />
    </>
  );
};

export default ApprovedAppointments;
