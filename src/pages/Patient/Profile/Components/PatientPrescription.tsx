import { Grid, GridItem, Text } from "@chakra-ui/react";
import { IPrescriptionInfo } from "@nepMeds/service/nepmeds-prescription";
import { colors } from "@nepMeds/theme/colors";

const PatientPrescription = ({
  prescription,
}: {
  prescription: IPrescriptionInfo | undefined;
}) => {
  return (
    <>
      <Text variant="sm400" color={colors.black_60} mb={3}>
        Medicine:
      </Text>
      <Grid templateColumns={"repeat(3, 1fr)"}>
        <GridItem>Medicine:</GridItem>
        <GridItem> Dose:</GridItem>
        <GridItem>Frequency:</GridItem>
      </Grid>
      <Grid gap={3}>
        <Grid
          templateColumns={"repeat(3, 1fr)"}
          // variant="md600"
          // color={colors.black_60}
          // textTransform={"capitalize"}
        >
          {prescription?.drug_referral?.map(({ medicine, dose, frequency }) => (
            <>
              <GridItem>{medicine}</GridItem>
              <GridItem> {dose}</GridItem>
              <GridItem>{frequency}</GridItem>
            </>
          ))}
        </Grid>

        <Text variant="sm400" color={colors.black_60}>
          Recommendation:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          {prescription?.additional_info?.recommendation}
        </Text>

        <Text variant="sm400" color={colors.black_60}>
          Follow Up date:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          {prescription?.additional_info?.follow_up_date}
        </Text>
      </Grid>
    </>
  );
};

export default PatientPrescription;
