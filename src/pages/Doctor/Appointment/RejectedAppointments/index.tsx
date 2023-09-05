import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SkeletonCircle,
  SkeletonText,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import {
  DownIcon,
  FilterIcon,
  SearchLargeIcon,
  svgs,
} from "@nepMeds/assets/svgs";
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

const RejectedAppointments: React.FC = () => {
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
      status: STATUSTYPE1.Cancelled,
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
      // TODO: check for large amount of data
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
        // TODO: why CELL somewhere and accessorfn somewhere
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
        {/* TODO: add border bottom */}
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
              {/* TODO: detail flex wrapper can be created */}
              <Flex flex={1} direction={"column"} gap={2}>
                <InfoSection
                  label="Patient’s Name"
                  content={patient?.patient_name as string}
                />

                {/* TODO: need to get all the items from the list */}
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

      {/* TODO: CREATE separate table header */}
      {/* TABLE HEADER */}
      <HStack justifyContent="space-between">
        <Text>Rejected Appointments</Text>
        <HStack>
          {/* Search Field */}
          <InputGroup>
            {/* TODO: add space between icon and the text */}
            <InputLeftElement marginRight={3}>
              <SearchLargeIcon />
            </InputLeftElement>
            <Input placeholder="Search" />
          </InputGroup>
          {/* ends */}
          <Button leftIcon={<FilterIcon />} variant="outline">
            Filter
          </Button>
          <Button rightIcon={<DownIcon />} variant="outline">
            Bulk Action
          </Button>
        </HStack>
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

export default RejectedAppointments;
