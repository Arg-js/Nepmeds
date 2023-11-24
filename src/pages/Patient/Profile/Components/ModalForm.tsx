import { Flex, Grid, Divider, Text } from "@chakra-ui/react";
import { DownloadIcon } from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";

const ModalForm = () => {
  return (
    <Flex direction={"column"} gap={4}>
      <Grid templateColumns={"repeat(4, 1fr)"} gap={3}>
        <Text variant="sm400" color={colors.black_60}>
          Name:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          Bishal Thapa
        </Text>
        <Text variant="sm400" color={colors.black_60}>
          Specialization:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          Cardiologist
        </Text>
        <Text variant="sm400" color={colors.black_60}>
          Symptoms:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          Coughing
        </Text>
      </Grid>
      <Flex gap={3} cursor="pointer">
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
          Rs. 400
        </Text>
        <Text variant="sm400" color={colors.black_60}>
          Paid Amount:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          Rs. 300
        </Text>
        <Text variant="sm400" color={colors.black_60}>
          Discount Applied:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          Yes
        </Text>
        <Text variant="sm400" color={colors.black_60}>
          Transaction ID:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          68yvui7
        </Text>
        <Text variant="sm400" color={colors.black_60}>
          Order ID:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          68yvui7
        </Text>
        <Text variant="sm400" color={colors.black_60}>
          Payment Method:
        </Text>
        <Text variant="md600" color={colors.green_button}>
          Esewa
        </Text>
        <Text variant="sm400" color={colors.black_60}>
          Payment Date:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          12/21/2023
        </Text>
        <Text variant="sm400" color={colors.black_60}>
          Payment Time:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          03:00 PM
        </Text>
      </Grid>
      <Text variant={"lg600"}>Follow Up</Text>
      <Divider />
      <Grid templateColumns={"repeat(2, 1fr)"}>
        <Text variant="sm400" color={colors.black_60}>
          Follow up Date:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          12/23/2023
        </Text>
        <Text variant="sm400" color={colors.black_60}>
          Follow up Time:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          03:00 PM
        </Text>
      </Grid>
    </Flex>
  );
};

export default ModalForm;
