import {
  Box,
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
          <Text variant="sm400">Information for Patient</Text>
        </Box>
        {/* TODO: design in progress */}
        {/* <Flex alignItems={"flex-end"} gap={3}>
          <Text variant="sm400" color={colors.black_60}>
            Recommendation:
          </Text>
          <Text variant="md600" color={colors.black_60}>
            {prescription?.additional_info?.recommendation}
          </Text>
        </Flex> */}
        {/* {InfoForPatient?.map(({title, value}) => (
          <Flex alignItems={"flex-end"} justifyContent={"flex-start"} gap={3}>
            <Text variant="sm400" color={colors.black_60}>
              {title}:
            </Text>
            <Text variant="md600" color={colors.black_60}>
              {value}
            </Text>
          </Flex>
        ))} */}
        <TableContainer>
          <Table
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
          <Table variant="simple">
            <Thead>
              <Tr>
                {/* TODO: convert the key to text  */}
                <Th
                  borderRight={`1px solid ${colors.gray_border}`}
                  borderLeft={`1px solid ${colors.gray_border}`}
                  borderTop={`1px solid ${colors.gray_border}`}
                >
                  S.N.
                </Th>
                <Th
                  borderRight={`1px solid ${colors.gray_border}`}
                  borderTop={`1px solid ${colors.gray_border}`}
                >
                  Medicine
                </Th>
                <Th
                  borderRight={`1px solid ${colors.gray_border}`}
                  borderTop={`1px solid ${colors.gray_border}`}
                >
                  Dose
                </Th>
                <Th
                  borderRight={`1px solid ${colors.gray_border}`}
                  borderTop={`1px solid ${colors.gray_border}`}
                >
                  Frequency
                </Th>
                <Th
                  borderRight={`1px solid ${colors.gray_border}`}
                  borderTop={`1px solid ${colors.gray_border}`}
                >
                  Remarks
                </Th>
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
          <Table
            variant="simple"
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
              <Tr>
                <Td borderBottom={"none"} fontSize="sm" fontWeight={"600"}>
                  {" "}
                  Dr.{prescription?.doctor_name}
                </Td>
              </Tr>
              <Tr>
                <Td borderBottom={"none"} fontSize="sm" fontWeight={"600"}>
                  NMC no: {prescription?.doctor_nmc_number}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        {/* <Text variant="sm400" color={colors.black_60}>
          Follow Up date:
        </Text>
        <Text variant="md600" color={colors.black_60}>
          {prescription?.additional_info?.follow_up_date}
        </Text> */}
        {/* <Text variant="sm400" color={colors.black_60}>
          Dr. {prescription?.doctor_name}
        </Text> */}
        {/* <Text variant="sm400" color={colors.black_60}>
          NMC no:
        </Text> */}
        {/* <Text variant="sm400" color={colors.black_60}>
          NMC no: {prescription?.doctor_nmc_number}
        </Text> */}
      </Grid>
    </>
  );
};

export default PatientPrescription;
