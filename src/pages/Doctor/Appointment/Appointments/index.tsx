import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Skeleton,
  SkeletonText,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { ConfirmationImage, svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import {
  useGetAppointmentRequest,
  useGetAppointmentRequestById,
  useSetAppointmentRequestById,
} from "@nepMeds/service/nepmeds-doctor-patient-appointment";
import { colors } from "@nepMeds/theme/colors";
import { STATUSTYPE } from "@nepMeds/config/enum";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { useForm } from "react-hook-form";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { column } from "@nepMeds/components/DataTable/Columns/Doctor/Appointments";

type StatusType =
  | STATUSTYPE.approved
  | STATUSTYPE.pending
  | STATUSTYPE.rejected
  | STATUSTYPE.completed
  | 0;

const schema = Yup.object({
  reject_title: Yup.string().required("This field is required"),
  reject_remarks: Yup.string().required("This field is required"),
});

const defaultValues = {
  reject_title: "",
  reject_remarks: "",
};

const AppointmentTab: React.FC<{ type: StatusType; heading: string }> = ({
  type,
  heading,
}) => {
  const [appointmentId, setAppointmentId] = useState("");

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

  // PAGINATION
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // PAGINATION ENDS

  // REACT QUERIES

  const { data: appointment, isFetching: appointmentFetching } =
    useGetAppointmentRequest({
      page: pageParams.pageIndex + 1,
      page_size: pageParams.pageSize,
    });

  // PENDING
  const { data: pendingAppointment, isFetching: pendingAppointmentFetching } =
    useGetAppointmentRequest({
      page: pageParams.pageIndex + 1,
      page_size: pageParams.pageSize,
      status: STATUSTYPE.pending,
    });

  // APPROVED
  const { data: approvedAppointment, isFetching: approvedAppointmentFetching } =
    useGetAppointmentRequest({
      page: pageParams.pageIndex + 1,
      page_size: pageParams.pageSize,
      status: STATUSTYPE.approved,
    });

  // REJECTED
  const { data: rejectedAppointment, isFetching: rejectedAppointmentFetching } =
    useGetAppointmentRequest({
      page: pageParams.pageIndex + 1,
      page_size: pageParams.pageSize,
      status: STATUSTYPE.rejected,
    });

  const { mutateAsync: setAppointmentRequestById, isLoading } =
    useSetAppointmentRequestById();
  const { data: patient, isLoading: isPatientLoading } =
    useGetAppointmentRequestById({ id: appointmentId });
  // REACT QUERIES END

  const appointmentData = {
    0: appointment?.results,
    [STATUSTYPE.pending]: pendingAppointment?.results,
    [STATUSTYPE.approved]: approvedAppointment?.results,
    [STATUSTYPE.rejected]: rejectedAppointment?.results,
    [STATUSTYPE.completed]: [],
  };

  const onModalClose = () => {
    setAppointmentId("");
    onApproveModalClose();
    onRejectionModalClose();
    reset(defaultValues);
  };

  const onSubmitHandler = async (data: typeof defaultValues) => {
    try {
      await setAppointmentRequestById({
        ...data,
        id: appointmentId,
        status: STATUSTYPE.rejected,
        reject_title: 1,
      });
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };

  const InfoSection = ({
    label,
    content,
  }: {
    label: string;
    content: string;
  }) => {
    return (
      <Box flex={0.5}>
        <Text fontWeight={500} fontSize="xs">
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
      {/* Approval Modal */}
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
        footer={
          <HStack w="100%">
            <Button
              variant={"primaryOutline"}
              w="100%"
              onClick={() => {
                onModalClose();
              }}
            >
              Cancel
            </Button>
            <Button
              w="100%"
              onClick={async () => {
                await setAppointmentRequestById({
                  id: appointmentId,
                  status: STATUSTYPE.approved,
                });
                onModalClose();
              }}
              isLoading={isLoading}
            >
              Yes
            </Button>
          </HStack>
        }
      >
        <Flex direction={"column"} alignItems={"center"} gap={8}>
          <ConfirmationImage />
          <Text fontWeight={600} fontSize="18px">
            Are you sure you want to Approve Patient?
          </Text>
        </Flex>
      </ModalComponent>
      {/* Approval Modal ENDS*/}

      {/* View Modal */}
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
          <Flex gap={4} direction={"column"}>
            <Flex>
              {Array.from({ length: 2 }, (_, i) => (
                <Flex flex={0.5} gap={4} direction={"column"} key={i}>
                  {Array.from({ length: 2 }, (_, i) => (
                    <Skeleton
                      height={"8px"}
                      width={i ? "80%" : "50%"}
                      key={i}
                    />
                  ))}
                </Flex>
              ))}
            </Flex>
            <Divider />
            <Flex flex={0.5} gap={4} direction={"column"}>
              <Skeleton height={"8px"} width={"30%"} />
              <Flex gap={2}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Skeleton height={"8px"} width={"10%"} key={i} />
                ))}
              </Flex>
            </Flex>
            <Divider />
            <Flex flex={0.5} gap={4} direction={"column"}>
              <Skeleton height={"8px"} width={"30%"} />
              <SkeletonText noOfLines={4} spacing="4" skeletonHeight="2" />
            </Flex>
          </Flex>
        ) : (
          <Flex gap={4} direction={"column"}>
            <Flex>
              <InfoSection
                label={"Patient’s Name"}
                content={patient?.patient_name as string}
              />
              <InfoSection
                label={"Gender"}
                content={patient?.patient_name as string}
              />
            </Flex>
            <Divider />
            <Flex direction={"column"} gap={2}>
              <Text fontWeight={500} fontSize="xs">
                Health Issues
              </Text>
              <Flex gap={2}>
                {patient?.symptoms?.map(({ name }) => (
                  <Tag colorScheme="linkedin" key={name}>
                    {name}
                  </Tag>
                ))}
              </Flex>
            </Flex>
            <Divider />
            <InfoSection
              label={"Symptom Description"}
              content={patient?.description as string}
            />
            {patient?.reject_remarks && (
              <>
                <Divider />
                <InfoSection
                  label="Rejected Reason"
                  content={patient?.reject_remarks as string}
                />
              </>
            )}
          </Flex>
        )}
      </ModalComponent>
      {/* View Modal ENDS */}

      {/* Rejection Modal */}
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
          onModalClose();
        }}
        footer={
          <HStack w="100%">
            <Button
              variant={"primaryOutline"}
              w="100%"
              onClick={() => onModalClose()}
            >
              Cancel
            </Button>
            <Button
              w="100%"
              isLoading={isLoading}
              onClick={handleSubmit(onSubmitHandler)}
            >
              Yes
            </Button>
          </HStack>
        }
      >
        <form>
          <Flex direction={"column"} alignItems={"center"} gap={8}>
            <FloatingLabelInput
              label="Reason for rejection"
              name="reject_title"
              placeholder="Enter reason for rejection"
              required
              register={register}
              error={errors.reject_title?.message || ""}
            />
            <FloatinglabelTextArea
              label="Description"
              name="reject_remarks"
              required
              register={register}
              error={errors.reject_remarks?.message || ""}
            />
          </Flex>
        </form>
      </ModalComponent>
      {/* Rejection Modal ENDS*/}

      {/* TABLE HEADER */}
      <HStack justifyContent="space-between">
        <Text fontSize="16px" fontWeight="500" color={colors.black_60}>
          {heading}
        </Text>
      </HStack>
      {/* TABLE HEADER ENDS*/}

      <DataTable
        data={appointmentData[type] || []}
        columns={column({
          appointment,
          pageParams,
          setAppointmentId,
          onModalOpen: {
            onViewModalOpen,
            onApproveModalOpen,
            onRejectionModalOpen,
          },
        })}
        isLoading={
          appointmentFetching ||
          pendingAppointmentFetching ||
          approvedAppointmentFetching ||
          rejectedAppointmentFetching
        }
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

export default AppointmentTab;
