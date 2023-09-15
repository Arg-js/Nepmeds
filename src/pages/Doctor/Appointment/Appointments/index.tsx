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
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ConfirmationImage, DocumentIcon, svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import {
  Gender,
  useGetAppointmentRequest,
  useGetAppointmentRequestById,
  useSetAppointmentRequestById,
} from "@nepMeds/service/nepmeds-doctor-patient-appointment";
import { colors } from "@nepMeds/theme/colors";
import { STATUSTYPE } from "@nepMeds/config/enum";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { useForm } from "react-hook-form";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { column } from "@nepMeds/components/DataTable/Columns/Doctor/Appointments";
import Select from "@nepMeds/components/Form/Select";
import { useGetRejectionTitle } from "@nepMeds/service/nepmeds-reject-doc";

type StatusType =
  | STATUSTYPE.approved
  | STATUSTYPE.pending
  | STATUSTYPE.rejected
  | STATUSTYPE.completed
  | 0;

const schema = Yup.object({
  reject_title: Yup.number().required("This field is required"),
  reject_remarks: Yup.string().required("This field is required"),
});

const defaultValues = {
  reject_title: -1,
  reject_remarks: "",
};

const getGender = (gender: Gender) => {
  const genderMap = {
    "1": "Male",
    "2": "Female",
    "3": "Others",
  };
  return genderMap[gender];
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
      status: type || "",
    });

  const { mutateAsync: setAppointmentRequestById, isLoading } =
    useSetAppointmentRequestById();
  const { data: patient, isLoading: isPatientLoading } =
    useGetAppointmentRequestById({ id: appointmentId });

  const { data: rejectionTitle } = useGetRejectionTitle();
  // REACT QUERIES END

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
                <Flex flex={1} gap={4} direction={"column"} key={i}>
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
            <Flex gap={4} direction={"column"}>
              <Skeleton height={"8px"} width={"30%"} />
              <Flex gap={2}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Skeleton height={"8px"} width={"10%"} key={i} />
                ))}
              </Flex>
            </Flex>
            <Divider />
            <Flex gap={4} direction={"column"}>
              <Skeleton height={"8px"} width={"30%"} />
              <SkeletonText noOfLines={4} spacing="4" skeletonHeight="2" />
            </Flex>
          </Flex>
        ) : (
          <Flex gap={4} direction={"column"}>
            <Flex>
              <InfoSection
                label={"Patient’s Name"}
                content={patient?.full_name || ""}
              />
              {/* patient?.gender === "1"
                    ? "Male"
                    : patient?.gender === "2"
                    ? "Female"
                    : "Others" */}
              <InfoSection
                label={"Gender"}
                content={patient?.gender ? getGender(patient.gender) : ""}
              />
            </Flex>
            <Divider />
            <Flex direction={"column"} gap={2}>
              <Text fontWeight={500} fontSize="xs">
                Health Issues
              </Text>
              <Flex gap={2}>
                {patient?.symptoms?.map(({ name }) => (
                  <Tag
                    bg={colors.blue_10}
                    key={name}
                    color={colors.main}
                    fontSize={"sm"}
                    fontWeight={600}
                    fontFamily={"Inter"}
                    px={2.5}
                    py={1.5}
                    borderRadius={"8px"}
                    textTransform={"capitalize"}
                  >
                    {name}
                  </Tag>
                ))}
              </Flex>
            </Flex>
            <Divider />
            <InfoSection
              label={"Symptom Description"}
              content={patient?.description || ""}
            />
            {patient?.old_report_file && (
              <>
                <Divider />
                <Flex direction={"column"} gap={2}>
                  <Text fontWeight={500} fontSize="xs">
                    Old Reports
                  </Text>
                  <Flex gap={2}>
                    <Tag
                      bg={colors.blue_10}
                      borderRadius={"8px"}
                      size={"lg"}
                      height={"58px"}
                      gap={4}
                      width={"min-content"}
                      cursor={"pointer"}
                      onClick={() => window.open(patient?.old_report_file)}
                    >
                      <DocumentIcon />
                      <VStack alignItems={"flex-start"}>
                        <Text
                          color={colors.main}
                          fontSize={"xs"}
                          fontWeight={600}
                          fontFamily={"Inter"}
                        >
                          Report
                        </Text>
                        <Text
                          color={colors.main}
                          fontSize={"sm"}
                          fontWeight={400}
                        >
                          12/12/2020
                        </Text>
                      </VStack>
                    </Tag>
                  </Flex>
                </Flex>
              </>
            )}

            {patient?.reject_remarks && (
              <>
                <Divider />
                <InfoSection
                  label="Rejected Reason"
                  content={patient?.reject_remarks || ""}
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
            <Select
              name="reject_title"
              label="Reason for Rejection"
              placeholder="Enter reason for rejection"
              required
              register={register}
              error={errors.reject_title?.message || ""}
              options={rejectionTitle ?? []}
              style={{
                background: colors.forminput,
                border: "none",
                paddingTop: "15px",
              }}
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
        data={appointment?.results || []}
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
        isLoading={appointmentFetching}
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
