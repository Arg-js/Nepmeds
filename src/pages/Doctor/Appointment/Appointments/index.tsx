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
  ConfirmationImage,
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
  useSetAppointmentRequestById,
} from "@nepMeds/service/nepmeds-doctor-patient-appointment";
import { colors } from "@nepMeds/theme/colors";
import { CellContext } from "@tanstack/react-table";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import { STATUSTYPE1 } from "@nepMeds/config/enum";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { useForm } from "react-hook-form";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

const schema = Yup.object({
  reject_title: Yup.string().required("This field is required"),
  reject_remarks: Yup.string().required("This field is required"),
});

const defaultValues = {
  reject_title: "",
  reject_remarks: "",
};

const Appointments: React.FC = () => {
  const [appointmentId, setAppointmentId] = useState("");

  // PAGINATION
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // PAGINATION ENDS

  const {
    isOpen: isApproveModalOpen,
    onOpen: onApproveModalOpen,
    onClose: onApproveModalClose,
  } = useDisclosure();
  const {
    isOpen: isRejectionModalOpen,
    onOpen: onRejectionModalOpen,
    onClose: onRejectionModalClose,
  } = useDisclosure();
  const {
    isOpen: isViewModalOpen,
    onOpen: onViewModalOpen,
    onClose: onViewModalClose,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  // // UPDATES page on page change
  // const pageChange = (pageIndex: number) => {
  //   setPageParams({ ...pageParams, pageIndex });
  // };

  // // UPDATES limit change on limit change and sets the page to page === 1
  // const pageSizeChange = (pageSize: number) => {
  //   setPageParams({ ...pageParams, pageIndex: 0, pageSize });
  // };
  // PAGINATION ENDS

  // REACT QUERIES
  const { data: appointment, isLoading: appointmentLoading } =
    useGetAppointmentRequest({
      page: pageParams.pageIndex + 1,
      page_size: pageParams.pageSize,
    });
  const { mutate: setAppointmentRequestById, isLoading } =
    useSetAppointmentRequestById();
  const { data: patient, isLoading: isPatientLoading } =
    useGetAppointmentRequestById({ id: appointmentId });
  // REACT QUERIES END

  const onSubmitHandler = (data: typeof defaultValues) => {
    setAppointmentId("");

    setAppointmentRequestById({
      ...data,
      id: appointmentId,
      status: STATUSTYPE1.Cancelled,
      reject_title: 1,
    });
    onRejectionModalClose();
    reset(defaultValues);
  };

  const column = useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: any, index: number) => {
          return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
          // return ` ${index + 1}.`;
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
            setAppointmentId(row.original?.id);
            onViewModalOpen();
          };
          const onAccept = () => {
            setAppointmentId(row.original?.id);
            onApproveModalOpen();
          };
          const onReject = () => {
            setAppointmentId(row.original?.id);
            onRejectionModalOpen();
            // setAppointmentRequestById({
            //   id: row.original?.id,
            //   status: STATUSTYPE1.Cancelled,
            // });
          };
          return (
            <TableActions
              onView={onView}
              onAccept={onAccept}
              onReject={onReject}
            />
          );
        },
      },
    ],
    [appointment, pageParams]
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
            <Text>Doctor Approval</Text>
          </HStack>
        }
        isOpen={isApproveModalOpen}
        onClose={onApproveModalClose}
        // approve
        // reject
        footer={
          <HStack w="100%">
            <Button
              variant={"primaryOutline"}
              w="100%"
              onClick={() => {
                // TODO: repeated code
                setAppointmentId("");
                onApproveModalClose();
                //
              }}
            >
              Cancel
            </Button>
            <Button
              w="100%"
              onClick={() => {
                setAppointmentRequestById({
                  id: appointmentId,
                  status: STATUSTYPE1.Confirmed,
                });
                //
                setAppointmentId("");
                onApproveModalClose();
                //
              }}
              isLoading={isLoading}
            >
              Yes
            </Button>
          </HStack>
        }
      >
        {/* TODO: add border bottom */}
        <Flex direction={"column"} alignItems={"center"} gap={8}>
          <ConfirmationImage />
          <Text fontWeight={600} fontSize="18px">
            Are you sure you want to Approve Patient?
          </Text>
        </Flex>
      </ModalComponent>

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
        footer={
          <></>
          // <HStack w="100%">
          //   <Button
          //     variant={"primaryOutline"}
          //     w="100%"
          //     onClick={() => {
          //       setAppointmentId("");
          //       onViewModalClose();
          //     }}
          //   >
          //     Cancel
          //   </Button>
          //   <Button
          //     w="100%"
          //     onClick={() => {
          //       //
          //       setAppointmentRequestById({
          //         id: id,
          //         status: STATUSTYPE1.Cancelled,
          //       });
          //       setAppointmentId("");
          //       onViewModalClose();
          //     }}
          //     isLoading={isLoading}
          //     //
          //   >
          //     Yes
          //   </Button>
          // </HStack>
        }
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
                {/* TODO: ADDITION of age from BE */}
                {/* <Box>
              <Text fontWeight={400} fontSize={"xs"}>
                Doctors Name
              </Text>
              <Text fontWeight={400} fontSize={"md"}>
                {patient?.symptoms?.[0]?.name}
              </Text>
            </Box> */}
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

      <ModalComponent
        size={"2xl"}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Remark for Rejection</Text>
          </HStack>
        }
        isOpen={isRejectionModalOpen}
        onClose={() => {
          {
            reset(defaultValues);
            onRejectionModalClose();
          }
        }}
        footer={
          <HStack w="100%">
            <Button
              variant={"primaryOutline"}
              w="100%"
              onClick={() => {
                reset(defaultValues);
                onRejectionModalClose();
              }}
            >
              Cancel
            </Button>
            <Button
              w="100%"
              onClick={handleSubmit(onSubmitHandler)}
              isLoading={isLoading}
            >
              Yes
            </Button>
          </HStack>
        }
      >
        {/* TODO: add border bottom */}
        <form>
          <Flex direction={"column"} alignItems={"center"} gap={8}>
            <FloatingLabelInput
              label="Reason for rejection"
              name="reject_title"
              placeholder="Enter reason for rejection"
              required
              register={register}
              //TODO: where is this rule used
              // rules={{
              //   required: "Please Enter the Instant rate",
              // }}
              error={errors.reject_title?.message || ""}
            />
            <FloatinglabelTextArea
              label="Description"
              name="reject_remarks"
              required
              register={register}
              //TODO: where is this rule used
              // rules={{
              //   required: "Please Enter the Instant rate",
              // }}
              error={errors.reject_remarks?.message || ""}
            />
          </Flex>
        </form>
      </ModalComponent>

      {/* TODO: CREATE seperate table header */}
      {/* TABLE HEADER */}
      <HStack justifyContent="space-between">
        <Text> Appointments</Text>
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

export default Appointments;
