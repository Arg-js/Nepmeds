import { DownloadIcon } from "@nepMeds/assets/svgs";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import CenterLoader from "@nepMeds/components/Common/Loader";
import { DataTable } from "@nepMeds/components/DataTable";
import { appointmentColumn } from "@nepMeds/components/DataTable/adminAppointmentColumn";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { ADMINAPPOINTMENT, PAYMENTMODE } from "@nepMeds/config/enum";
import PatientPrescription from "@nepMeds/pages/Patient/Profile/Components/PatientDetailsTab/AppointmentDetailsTab/AppointmentDetailActions/PatientPrescription";
import {
  useAdminAppointment,
  useAdminAppointmentDetail,
} from "@nepMeds/service/nepmeds-appointment";
import { colors } from "@nepMeds/theme/colors";
import {
  appendServerUrl,
  getImageUrl,
  openLinkInNewTab,
} from "@nepMeds/utils/getImageUrl";
import { PaginationState } from "@tanstack/react-table";
import { useState, useRef } from "react";
import { BsDownload } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";

const Appointment = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [appointmentId, setAppointmentId] = useState<string>("");

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const {
    isOpen: prescriptionOpen,
    onOpen: presriptionOpenModal,
    onClose: prescriptionCloseModal,
  } = useDisclosure();
  const { data, isFetching } = useAdminAppointment({
    page_no: pageIndex + 1,
    page_size: pageSize,
    consulting_type: ADMINAPPOINTMENT.Appointment.toString(),
  });
  const { data: appointmentDetail, isLoading: appointmentLoading } =
    useAdminAppointmentDetail(appointmentId);

  const openModalHandler = (id: string) => {
    setAppointmentId(id);
    openModal();
  };

  const printableContentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printableContentRef.current,
  });

  return (
    <div>
      {/* Downlaod Prescription  */}
      <ModalComponent
        heading={<>Prescription</>}
        isOpen={prescriptionOpen}
        onClose={prescriptionCloseModal}
        size={"2xl"}
        footer={
          // Todo: add download svg
          <Flex justifyContent={"flex-end"} width={"full"}>
            <Button onClick={handlePrint} leftIcon={<BsDownload />}>
              Download
            </Button>
          </Flex>
        }
        modalRef={printableContentRef}
      >
        {/* TODO: move the api consumption inside the modal body */}
        <PatientPrescription
          prescription={appointmentDetail?.prescription_details}
        />
      </ModalComponent>

      {/* Detail Modal */}
      <ModalComponent
        size={"3xl"}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Detail View</Text>
          </HStack>
        }
        isOpen={isModalOpen}
        onClose={closeModal}
        footer={<></>}
      >
        {appointmentLoading ? (
          <CenterLoader />
        ) : (
          <Box>
            <Flex gap={2}>
              <Card flex={1}>
                <Text
                  textAlign={"center"}
                  bg={colors.main}
                  color={"white"}
                  p={2}
                  borderTopRadius={"4px"}
                >
                  Doctor
                </Text>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box fontSize={"sm"}>
                      <Flex gap={2}>
                        <Text>Name :</Text>
                        <Text
                          color={colors.primary}
                          textTransform={"capitalize"}
                        >
                          {appointmentDetail?.doctor_detail?.title}{" "}
                          {appointmentDetail?.doctor_detail?.doctor_name}
                        </Text>
                      </Flex>
                      <Heading size={"sx"}>
                        {appointmentDetail?.doctor_detail?.title}
                      </Heading>

                      <Flex gap={2}>
                        <Text>NMC No. :</Text>
                        <Text>{appointmentDetail?.doctor_detail?.nmc_no}</Text>
                      </Flex>
                    </Box>
                    <Flex
                      m={"auto"}
                      p={2}
                      justifyContent={"space-between"}
                      textAlign={"center"}
                      bg={colors.greenish_yellow}
                      color={"white"}
                      w={"80%"}
                      borderRadius={"6px"}
                      fontSize={"sm"}
                    >
                      <Text>Consultation Fee</Text>
                      <Text>Rs. {appointmentDetail?.doctor_rate}</Text>
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
              <Card flex={1}>
                <Text
                  textAlign={"center"}
                  bg={colors.primary}
                  color={"white"}
                  p={2}
                  borderTopRadius={"4px"}
                >
                  User Details
                </Text>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box fontSize={"sm"}>
                      <Flex gap={2}>
                        <Text>Name :</Text>
                        <Text color={colors.primary}>
                          {appointmentDetail?.full_name}
                        </Text>
                      </Flex>

                      <Flex gap={2}>
                        <Text>Contact No. :</Text>
                        <Text>
                          {appointmentDetail?.patient_detail?.patient_contact}
                        </Text>
                      </Flex>
                      <Flex
                        alignItems={"center"}
                        gap={3}
                        justifyContent={"start"}
                      >
                        <Text>Symptoms:</Text>
                        <Box>
                          {appointmentDetail?.symptoms_list?.map(
                            (symptom, index) => (
                              <Badge
                                key={index}
                                borderRadius={"lg"}
                                colorScheme={"green"}
                                p={1}
                              >
                                {symptom}
                              </Badge>
                            )
                          )}
                        </Box>
                      </Flex>
                    </Box>
                    <Flex
                      m={"auto"}
                      p={2}
                      justifyContent={"space-between"}
                      textAlign={"center"}
                      bg={colors.greenish_yellow}
                      color={"white"}
                      w={"80%"}
                      borderRadius={"6px"}
                      fontSize={"sm"}
                    >
                      <Text>Amount Paid</Text>
                      <Text>
                        Rs. {appointmentDetail?.transaction?.paid_amount}
                      </Text>
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>

            <Card my={3}>
              <Text
                textAlign={"center"}
                bg={colors.main}
                color={"white"}
                p={2}
                borderTopRadius={"4px"}
              >
                Transaction Details
              </Text>
              <Flex justifyContent={"space-between"} m={3}>
                <Box fontSize={"sm"}>
                  <Flex gap={2}>
                    <Text>Payment ID:</Text>
                    <Text>{appointmentDetail?.transaction?.payment_id}</Text>
                  </Flex>

                  <Flex gap={2}>
                    <Text>Order ID:</Text>
                    <Text>
                      {appointmentDetail?.transaction?.transaction_id}
                    </Text>
                  </Flex>
                  <Flex gap={2}>
                    <Text>Payment Method: </Text>

                    <Text variant="md600" color={colors.green_button}>
                      {
                        PAYMENTMODE[
                          appointmentDetail?.transaction
                            ?.payment_type as keyof typeof PAYMENTMODE
                        ]
                      }
                    </Text>
                  </Flex>
                </Box>
                <Box fontSize={"sm"}>
                  <Flex gap={2}>
                    <Text>Number of Booking:</Text>
                    <Text>{appointmentDetail?.number_of_bookings}</Text>
                  </Flex>
                  <Flex gap={2}>
                    <Text>Discount Code:</Text>
                    <Text>
                      {appointmentDetail?.transaction?.discount_code ?? "N/A"}
                    </Text>
                  </Flex>
                  <Flex gap={2}>
                    <Text>Applied Discount:</Text>
                    <Text>
                      {appointmentDetail?.transaction?.discount_amount ?? "N/A"}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Card>

            <Flex gap={2} my={1}>
              <Card flex={1}>
                <Text
                  textAlign={"center"}
                  bg={colors.main}
                  color={"white"}
                  p={2}
                  borderTopRadius={"4px"}
                >
                  Prescription Details
                </Text>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box fontSize={"sm"}>
                      <Flex gap={2} alignItems={"center"}>
                        <Text>Patient&apos;s Uploaded Record: </Text>
                        <TooltipComponent label="Download Patient's Uploaded Record">
                          <DownloadIcon
                            color={colors.main}
                            cursor="pointer"
                            onClick={() =>
                              openLinkInNewTab(
                                getImageUrl(
                                  appointmentDetail?.old_report_file ?? ""
                                )
                              )
                            }
                          />
                        </TooltipComponent>
                      </Flex>

                      <Flex gap={3}>
                        <Text>Download Prescriptions:</Text>

                        <TooltipComponent label="Download Patient's Prescription Record">
                          <DownloadIcon
                            color={colors.main}
                            cursor="pointer"
                            onClick={presriptionOpenModal}
                          />
                        </TooltipComponent>
                        {appointmentDetail?.prescription_details?.prescription_image?.map(
                          item => (
                            <TooltipComponent
                              label="Download Patient's Prescription Record"
                              key={item.id}
                            >
                              <DownloadIcon
                                color={colors.main}
                                cursor="pointer"
                                onClick={() =>
                                  openLinkInNewTab(appendServerUrl(item.image))
                                }
                              />
                            </TooltipComponent>
                          )
                        )}
                      </Flex>
                      {appointmentDetail?.call_duration_minutes && (
                        <Flex gap={2}>
                          <Text>Call Duration: </Text>
                          <Text>
                            {appointmentDetail?.call_duration_minutes.toFixed(
                              2
                            ) ?? ""}{" "}
                            Minutes
                          </Text>
                        </Flex>
                      )}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>

              {/* Follow Up Details */}
              {appointmentDetail?.follow_up_details && (
                <Card flex={1}>
                  <Text
                    textAlign={"center"}
                    bg={colors.primary}
                    color={"white"}
                    p={2}
                    borderTopRadius={"4px"}
                  >
                    Follow Up Details
                  </Text>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box fontSize={"sm"}>
                        <Flex gap={2}>
                          <Text>Date :</Text>
                          <Text>
                            {
                              appointmentDetail?.follow_up_details
                                ?.follow_up_date
                            }
                          </Text>
                        </Flex>

                        <Flex gap={2}>
                          <Text>From Time:</Text>
                          <Text>
                            {
                              appointmentDetail?.follow_up_details
                                ?.follow_up_from_time
                            }
                          </Text>
                        </Flex>
                        <Flex gap={2}>
                          <Text>To Time:</Text>
                          <Text>
                            {
                              appointmentDetail?.follow_up_details
                                ?.follow_up_to_time
                            }
                          </Text>
                        </Flex>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              )}
            </Flex>
          </Box>
        )}
      </ModalComponent>

      <DataTable
        isLoading={isFetching}
        columns={appointmentColumn({ pageIndex, pageSize }, openModalHandler)}
        data={data?.results ?? []}
        pagination={{
          manual: true,
          pageParams: { pageIndex, pageSize },
          pageCount: data?.page_count,
          onChangePagination: setPagination,
        }}
      />
    </div>
  );
};

const TooltipComponent = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <Tooltip
      label={label}
      aria-label={label}
      hasArrow
      placement="top"
      color={"white"}
    >
      <span>{children}</span>
    </Tooltip>
  );
};

export default Appointment;
