import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import CenterLoader from "@nepMeds/components/Common/Loader";
import { DataTable } from "@nepMeds/components/DataTable";
import { appointmentColumn } from "@nepMeds/components/DataTable/adminAppointmentColumn";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { ADMINAPPOINTMENT } from "@nepMeds/config/enum";
import {
  useAdminAppointment,
  useAdminAppointmentDetail,
} from "@nepMeds/service/nepmeds-appointment";
import { colors } from "@nepMeds/theme/colors";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

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

  return (
    <div>
      {/* Detail Modal */}
      <ModalComponent
        size={"2xl"}
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
                      <Text color={colors.primary} textTransform={"capitalize"}>
                        Dr. {appointmentDetail?.doctor_detail?.doctor_name}
                      </Text>
                    </Flex>
                    <Heading size={"sx"}>
                      {appointmentDetail?.doctor_detail?.title}
                    </Heading>

                    <Flex gap={2}>
                      <Text>NMC No. :</Text>
                      <Text>
                        Dr. {appointmentDetail?.doctor_detail?.nmc_no}
                      </Text>
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
                Patient
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
                    <Flex gap={2}>
                      <Text>Email :</Text>
                      <Text>
                        {appointmentDetail?.patient_detail?.patient_email}
                      </Text>
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
                    <Text>Rs. {appointmentDetail?.doctor_rate}</Text>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          </Flex>
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

export default Appointment;
