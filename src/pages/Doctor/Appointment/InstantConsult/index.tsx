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
  description: Yup.string().required("This field is requrired"),
});

const defaultValues = {
  description: "",
};

const InstantConsult: React.FC = () => {
  const [id, setId] = useState("");

  // PAGINATION
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 10,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
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

  // UPDATES page on page change
  const pageChange = (page: number) => {
    setPageParams({ ...pageParams, page });
  };

  // UPDATES limit change on limit change and sets the page to page === 1
  const pageSizeChange = (limit: number) => {
    setPageParams({ ...pageParams, page: 1, limit });
  };
  // PAGINATION ENDS

  // REACT QUERIES
  const { data: appointment, isLoading: appointmentLoading } =
    useGetAppointmentRequest();
  const { mutate: setAppointmentRequestById, isLoading } =
    useSetAppointmentRequestById();
  const { data: patient } = useGetAppointmentRequestById({ id });
  // REACT QUERIES END

  const onSubmitHandler = (data: typeof defaultValues) => {
    setId("");
    onRejectionModalClose();
    setAppointmentRequestById({
      id,
      status: STATUSTYPE1.Cancelled,
      ...data,
    });
    reset(defaultValues);
  };

  const patientDetails = useMemo(
    () => [
      {
        title: "Patient’s Name",
        value: patient?.patient_name,
      },
      {
        title: "Symptoms",
        value: patient?.symptoms,
      },
      {
        title: "Number",
        value: patient?.patient_name,
      },
      {
        title: "Doctors Name",
        value: patient?.patient_name,
      },
    ],
    [patient]
  );

  const column = useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: any, index: number) => {
          return `${(pageParams.page - 1) * pageParams.limit + (index + 1)}.`;
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
          const onAccept = () => {
            setId(row.original?.id);
            onOpen();
          };
          const onReject = () => {
            setId(row.original?.id);
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
    [appointment, pageParams.page]
  );

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
        isOpen={isOpen}
        onClose={onClose}
        // approve
        // reject
        footer={
          <HStack w="100%">
            <Button
              variant={"primaryOutline"}
              w="100%"
              onClick={() => {
                setId("");
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              w="100%"
              onClick={() => {
                //
                setAppointmentRequestById({
                  id,
                  status: STATUSTYPE1.Confirmed,
                });
                setId("");
                onClose();
              }}
              isLoading={isLoading}
              //
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
          //       setApproveId("");
          //       onClose();
          //     }}
          //   >
          //     Cancel
          //   </Button>
          //   <Button
          //     w="100%"
          //     onClick={() => {
          //       //
          //       setAppointmentRequestById({
          //         id: approveId,
          //         status: STATUSTYPE1.Confirmed,
          //       });
          //       setApproveId("");
          //       onClose();
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
        <Flex gap={6}>
          <Avatar size="xl" />
          <Flex flex={1} direction={"column"} gap={2}>
            <Box>
              <Text fontWeight={400} fontSize={"xs"}>
                Patient’s Name
              </Text>
              <Text fontWeight={400} fontSize={"md"}>
                {patient?.patient_name}
              </Text>
            </Box>
            <Box>
              <Text fontWeight={400} fontSize={"xs"}>
                Symptoms
              </Text>
              <Text fontWeight={400} fontSize={"md"}>
                {patient?.symptoms?.[0]?.name}
              </Text>
            </Box>
          </Flex>
          <Flex flex={1} direction={"column"} gap={2}>
            <Box>
              <Text fontWeight={400} fontSize={"xs"}>
                Number
              </Text>
              <Text fontWeight={400} fontSize={"md"}>
                {patient?.symptoms?.[0]?.name}
              </Text>
            </Box>
            <Box>
              <Text fontWeight={400} fontSize={"xs"}>
                Doctors Name
              </Text>
              <Text fontWeight={400} fontSize={"md"}>
                {patient?.symptoms?.[0]?.name}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex mt={7} gap="0.5" direction={"column"}>
          <Text fontWeight={400} fontSize={"xs"}>
            Rejected Reason
          </Text>
          <Text fontWeight={400} fontSize={"md"}>
            {patient?.description}
          </Text>
        </Flex>
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
              name="rejection_reason"
              placeholder="Enter reason for rejection"
              required
              register={register}
              //TODO: where is this rule used
              // rules={{
              //   required: "Please Enter the Instant rate",
              // }}
              error={""}
            />
            <FloatinglabelTextArea
              label="Description"
              name="description"
              required
              register={register}
              //TODO: where is this rule used
              // rules={{
              //   required: "Please Enter the Instant rate",
              // }}
              error={errors.description?.message || ""}
            />
          </Flex>
        </form>
      </ModalComponent>

      {/* TODO: CREATE seperate table header */}
      {/* TABLE HEADER */}
      <HStack justifyContent="space-between">
        <Text>Appointments</Text>
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
      />
    </>
  );
};

export default InstantConsult;
