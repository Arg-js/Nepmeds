import {
  Flex,
  Grid,
  Divider,
  Text,
  Tag,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { DownloadIcon } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { PAYMENTMODE } from "@nepMeds/config/enum";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import { getFullDate, getTime } from "@nepMeds/helper/dateTImeConverter";
import { IPatientDetailById } from "@nepMeds/service/nepmeds-patient-profile";
import { useGetAllPrescriptionInfo } from "@nepMeds/service/nepmeds-prescription";
import { colors } from "@nepMeds/theme/colors";
import PatientPrescription from "./PatientPrescription";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { BsDownload } from "react-icons/bs";

const PatientDetailModal = ({
  patientDetail,
}: {
  // Todo: IPatientDetailById or undefined is correct approach
  patientDetail: IPatientDetailById | undefined;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const followUpDate = patientDetail?.follow_up_date_and_time;

  // React Queries
  const { data: prescription } = useGetAllPrescriptionInfo(
    patientDetail?.id.toString() ?? ""
  );
  // React Queries Ends
  const printableContentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printableContentRef.current,
  });

  return (
    <>
      <ModalComponent
        heading={<>Prescription</>}
        isOpen={isOpen}
        onClose={onClose}
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
        <PatientPrescription prescription={prescription} />
      </ModalComponent>

      <Flex direction={"column"} gap={4}>
        <Grid templateColumns={"repeat(4, 1fr)"} gap={3}>
          <Text variant="sm400" color={colors.black_60}>
            Name:
          </Text>
          <Text
            variant="md600"
            color={colors.black_60}
            textTransform={"capitalize"}
          >
            {patientDetail?.doctor}
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            Specialization:
          </Text>
          <Text
            variant="md600"
            color={colors.black_60}
            textTransform={"capitalize"}
          >
            {patientDetail?.specialization?.map(({ name }) => `${name} `)}
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            Symptoms:
          </Text>
          <Text variant="md600" color={colors.black_60}>
            {patientDetail?.symptoms?.map(({ name }) => (
              <Tag key={name}>{name}</Tag>
            ))}
          </Text>
        </Grid>
        <Flex gap={3} cursor="pointer" onClick={onOpen}>
          <Text variant={"md500"} color={colors.main}>
            Download Prescriptions:
          </Text>
          <DownloadIcon />
        </Flex>
        <Divider />
        <Text variant={"lg600"}>Payment Detail</Text>
        <Grid templateColumns={"repeat(4, 1fr)"} gap={3}>
          <Text variant="sm400" color={colors.black_60}>
            Rate:
          </Text>
          <Text variant="md600" color={colors.black_60}>
            Rs. {patientDetail?.doctor_rate}
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            Paid Amount:
          </Text>
          <Text variant="md600" color={colors.black_60}>
            Rs. {patientDetail?.paid_amount}
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            Discount Applied:
          </Text>
          <Text variant="md600" color={colors.black_60}>
            {patientDetail?.discount_applied ? "Yes" : "No"}
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            Transaction ID:
          </Text>
          <Text variant="md600" color={colors.black_60}>
            {/* TODO: transaction_detail is sometimes not available */}
            {patientDetail?.transaction_detail?.transaction_id}
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            Order ID:
          </Text>
          <Text variant="md600" color={colors.black_60}>
            ---
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            Payment Method:
          </Text>
          <Text variant="md600" color={colors.green_button}>
            {
              PAYMENTMODE[
                patientDetail?.payment_method as keyof typeof PAYMENTMODE
              ]
            }
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            Payment Date:
          </Text>
          <Text variant="md600" color={colors.black_60}>
            {patientDetail?.payment_date}
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            Payment Time:
          </Text>
          <Text variant="md600" color={colors.black_60}>
            {patientDetail?.payment_time
              ? removeSeconds(patientDetail.payment_time)
              : "---"}
          </Text>
        </Grid>
        <Text variant={"lg600"}>Follow Up</Text>
        <Divider />
        <Grid templateColumns={"repeat(2, 1fr)"}>
          <Text variant="sm400" color={colors.black_60}>
            Follow up Date:
          </Text>
          <Text variant="md600" color={colors.black_60}>
            {/* TODO: find another way to solve this tedious task */}
            {followUpDate ? getFullDate(followUpDate) : "---"}
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            Follow up Time:
          </Text>
          <Text variant="md600" color={colors.black_60}>
            {followUpDate ? getTime(followUpDate) : "---"}
          </Text>
        </Grid>
      </Flex>
    </>
  );
};

export default PatientDetailModal;
