import { Flex, Grid, Image, Text } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import userAvatar from "@nepMeds/assets/images/userAvatar.png";
import { usePatientBasicProfile } from "@nepMeds/service/nepmeds-patient-details";
import TokenService from "@nepMeds/service/service-token";
import TableWrapper from "@nepMeds/components/TableWrapper";

const PatientDetails = () => {
  const isAuthenticated = TokenService.isAuthenticated();
  const { data: patientData } = usePatientBasicProfile(isAuthenticated);
  return (
    <TableWrapper>
      <Flex direction={"column"} gap={5}>
        <Text fontWeight={600} fontSize={"md"}>
          General Information
        </Text>
        <Image
          boxSize="120px"
          src={userAvatar}
          objectFit={"cover"}
          objectPosition={"top"}
          borderRadius={"full"}
          alignSelf={"center"}
        />
        <Flex
          mx={2}
          bg={colors.primary}
          color={colors.white}
          fontWeight={600}
          fontSize={"md"}
          height={"auto"}
          py={1}
          justifyContent={"center"}
          alignItems={"center"}
          transform={"skew(-15deg)"}
          textAlign={"center"}
          textTransform={"capitalize"}
        >
          {patientData?.name ?? "---"}
        </Flex>
        <Text variant="sm400" color={colors.black_30}>
          PERSONAL INFORMATION
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            lg: "repeat(1, 1fr)",
            xl: "repeat(2, 1fr)",
          }}
        >
          {/* TODO: check if this can be refactored */}
          <Text variant="md600" color={colors.black_60}>
            Age:
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            {patientData?.age ?? "---"}
          </Text>
          <Text variant="md600" color={colors.black_60}>
            Gender:
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            {patientData?.gender ?? "---"}
          </Text>
          <Text variant="md600" color={colors.black_60}>
            Date of Birth:
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            {patientData?.date_of_birth ?? "---"}
          </Text>
        </Grid>
        <Text variant="sm400" color={colors.black_30}>
          CONTACT INFORMATION
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            lg: "repeat(1, 1fr)",
            xl: "repeat(2, 1fr)",
          }}
        >
          <Text variant="md600" color={colors.black_60}>
            Contact:
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            {patientData?.mobile_number ?? "---"}
          </Text>
          <Text variant="md600" color={colors.black_60}>
            Email:
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            {patientData?.email ?? "---"}
          </Text>
          {/* TODO: address never comes from api */}
          {/* <Text variant="md600" color={colors.black_60}>
            Address:
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            {patientData?.address ?? "---"}
          </Text> */}
        </Grid>
      </Flex>
    </TableWrapper>
  );
};

export default PatientDetails;
