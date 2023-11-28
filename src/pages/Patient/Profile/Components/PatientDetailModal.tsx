import { Flex, Grid, Divider, Text, Tag } from "@chakra-ui/react";
import { PAYMENTMODE } from "@nepMeds/config/enum";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import { getFullDate, getTime } from "@nepMeds/helper/dateTImeConverter";
import { IPatientDetailById } from "@nepMeds/service/nepmeds-patient-profile";
import { colors } from "@nepMeds/theme/colors";

const PatientDetailModal = ({
  patientDetail,
}: {
  patientDetail: IPatientDetailById;
}) => {
  const followUpDate = patientDetail.follow_up_date_and_time;
  return (
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
      {/* <Flex gap={3} cursor="pointer">
        <Text variant={"md500"} color={colors.main}>
          Download Prescriptions:
        </Text>
        <DownloadIcon />
      </Flex> */}
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
          {/* {patientDetail?.transaction_detail} */}
        </Text>
        <Text variant="sm400" color={colors.black_60}>
          Order ID:
        </Text>
        <Text variant="md600" color={colors.black_60}></Text>
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
  );
};

export default PatientDetailModal;
