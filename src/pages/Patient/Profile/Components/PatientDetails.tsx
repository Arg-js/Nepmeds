import { Box, Divider, Flex, Tag, Text } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { usePatientBasicProfile } from "@nepMeds/service/nepmeds-patient-details";
import TokenService from "@nepMeds/service/service-token";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { useMemo } from "react";

const PatientDetails = () => {
  const isAuthenticated = TokenService.isAuthenticated();
  const { data: patientData } = usePatientBasicProfile(isAuthenticated);

  const PersonalInfo = useMemo(
    () => [
      {
        title: "Age",
        value: patientData?.age ?? "-",
      },
      {
        title: "Gender",
        value: patientData?.gender ?? "-",
      },
      {
        title: "Date of Birth",
        value: patientData?.date_of_birth ?? "-",
      },
    ],
    [patientData]
  );

  const ContactInfo = useMemo(
    () => [
      {
        title: "Contact",
        value: patientData?.mobile_number ?? "-",
      },
      {
        title: "Email",
        value: patientData?.email ?? "-",
      },
    ],
    [patientData]
  );

  return (
    <WrapperBox>
      <Flex
        gap={{ base: 5, lg: 10, xl: 20 }}
        direction={{ base: "column", lg: "row" }}
      >
        <Box>
          <Text fontWeight={600} fontSize={"2xl"}>
            {patientData?.name ?? "-"}
          </Text>
          <Flex justifyContent={"space-between"} mb={1}>
            <Text variant={"md600"} color={colors.black_60}>
              Patient ID:
            </Text>
            <Text variant={"md500"} color={colors.primary}>
              {patientData?.user ?? "-"}
            </Text>
          </Flex>
          <Tag
            borderRadius="full"
            variant="solid"
            bgColor={colors.green_action}
          >
            active
          </Tag>
        </Box>
        <Divider
          display={{ base: "none", lg: "block" }}
          orientation="vertical"
          height={"85px"}
        />
        <Flex direction={"column"} gap={4}>
          <Text variant={"sm400"} color={colors.black_30}>
            PERSONAL INFORMATION
          </Text>
          <Flex gap={10}>
            {PersonalInfo.map(({ title, value }) => (
              <Box key={title}>
                <Text variant={"md600"} color={colors.black_60}>
                  {title}
                </Text>
                <Text variant={"md400"} color={colors.black_60}>
                  {value}
                </Text>
              </Box>
            ))}
          </Flex>
        </Flex>
        <Divider
          display={{ base: "none", lg: "block" }}
          orientation="vertical"
          height={"85px"}
        />
        <Flex direction={"column"} gap={4}>
          <Text variant={"sm400"} color={colors.black_30}>
            CONTACT INFORMATION
          </Text>
          <Flex gap={10}>
            {ContactInfo.map(({ title, value }) => (
              <Box key={title}>
                <Text variant={"md600"} color={colors.black_60}>
                  {title}
                </Text>
                <Text variant={"md400"} color={colors.primary}>
                  {value}
                </Text>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </WrapperBox>
  );
};

export default PatientDetails;
