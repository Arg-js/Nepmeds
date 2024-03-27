import {
  Box,
  Flex,
  Grid,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { IPrescriptionInfo } from "@nepMeds/service/nepmeds-prescription";
import NepmedsLogo from "@nepMeds/assets/images/logo.png";
import { colors } from "@nepMeds/theme/colors";
import { getGender } from "@nepMeds/pages/Doctor/Appointment/AppointmentTab/ModalForm/ViewModal";
const DrugReferralHeader = ["Medicine", "Dose", "Frequency", "Remarks"];
const PatientPrescription = ({
  prescription,
}: {
  prescription: IPrescriptionInfo | undefined;
}) => {
  const InfoForPatient = [
    {
      title: "History",
      value: prescription?.patient_info?.history,
    },
    {
      title: "Examination",
      value: prescription?.patient_info?.examination,
    },
    {
      title: "Investigation",
      value: prescription?.patient_info?.investigation,
    },
    {
      title: "Diagnosis",
      value: prescription?.patient_info?.diagnosis,
    },
    {
      title: "Advice",
      value: prescription?.patient_info?.advice,
    },
  ];
  return (
    <>
      <Grid gap={3}>
        <Image
          src={NepmedsLogo}
          alt={"Nepmemds logo"}
          justifySelf={"flex-end"}
        />
        {/* TODO: this is being repeated */}
        <Box
          bgColor={colors.primary}
          color={colors.white}
          p={2}
          mb={3}
          textAlign={"center"}
        >
          <Text variant="sm400">Patient Information</Text>
        </Box>
        <Box mx={3}>
          <Flex alignItems={"center"} gap={3}>
            <Text variant="sm400" color={colors.black_60}>
              Patient&apos;s name:
            </Text>
            <Text variant="md600" color={colors.black_60}>
              {prescription?.patient_name}
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={3}>
            <Text variant="sm400" color={colors.black_60}>
              Sex:
            </Text>
            <Text variant="md600" color={colors.black_60}>
              {prescription?.gender && getGender(prescription.gender)}
            </Text>
          </Flex>
        </Box>
        <Box
          bgColor={colors.primary}
          color={colors.white}
          p={2}
          mb={3}
          textAlign={"center"}
        >
          <Text variant="sm400">Information for Patient</Text>
        </Box>
        {/* TODO: design in progress */}
        <TableContainer>
          <Table
            size="sm"
            variant="simple"
            sx={{
              "tr:nth-of-type(even)": {
                background: "none",
              },
            }}
          >
            <Tbody>
              {InfoForPatient?.map(({ title, value }) => (
                <Tr key={title}>
                  <Td borderBottom={"none"}>{title}:</Td>
                  <Td borderBottom={"none"}>{value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Box
          bgColor={colors.primary}
          color={colors.white}
          p={2}
          mb={3}
          textAlign={"center"}
        >
          <Text variant="sm400">Drug Referral</Text>
        </Box>

        <TableContainer>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th border={`1px solid ${colors.gray_border}`}>S.N.</Th>
                {DrugReferralHeader?.map(title => (
                  <Th
                    key={title}
                    borderRight={`1px solid ${colors.gray_border}`}
                    borderTop={`1px solid ${colors.gray_border}`}
                  >
                    {title}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {prescription?.drug_referral?.map(
                ({ medicine, dose, frequency, remarks }, index) => (
                  <Tr key={medicine}>
                    {/* TODO: refactor this */}
                    <Td
                      borderRight={`1px solid ${colors.gray_border}`}
                      borderLeft={`1px solid ${colors.gray_border}`}
                    >
                      {index + 1}.
                    </Td>
                    {/* todo: there are few todos in this file since the design is not finalized */}
                    {/* todo: i have medicine as a string i want it as a key */}
                    {/* {DrugReferralHeader?.map(title => (
                      <Td borderRight={`1px solid ${colors.gray_border}`}>
                        {title.toLowerCase()}
                      </Td>
                    ))} */}
                    <Td borderRight={`1px solid ${colors.gray_border}`}>
                      {medicine}
                    </Td>
                    <Td borderRight={`1px solid ${colors.gray_border}`}>
                      {dose}
                    </Td>
                    <Td borderRight={`1px solid ${colors.gray_border}`}>
                      {frequency}
                    </Td>
                    <Td borderRight={`1px solid ${colors.gray_border}`}>
                      {remarks}
                    </Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
        <Box
          bgColor={colors.primary}
          color={colors.white}
          p={2}
          mb={3}
          textAlign={"center"}
        >
          <Text variant="sm400">Additional Information&apos;s</Text>
        </Box>

        <TableContainer>
          {/* todo: make a variant for table */}
          <Table
            variant="simple"
            size="sm"
            sx={{
              "tr:nth-of-type(even)": {
                background: "none",
              },
            }}
          >
            <Tbody>
              <Tr>
                <Td borderBottom={"none"}> Recommendation:</Td>
                <Td borderBottom={"none"}>
                  {prescription?.additional_info?.recommendation}
                </Td>
              </Tr>
              <Tr>
                <Td borderBottom={"none"}> Follow Up date:</Td>
                <Td borderBottom={"none"}>
                  {prescription?.additional_info?.follow_up_date}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Flex direction={"column"} gap={1} mx={4}>
          <Text variant="md600" color={colors.black_60}>
            Dr. {prescription?.doctor_name}
          </Text>

          <Text variant="md600" color={colors.black_60}>
            NMC/ NHPC/ NAMC no: {prescription?.doctor_nmc_number}
          </Text>
        </Flex>
      </Grid>
    </>
  );
};

export default PatientPrescription;
