import { Flex, Divider, Tag, VStack, Box, Text } from "@chakra-ui/react";
import { DocumentIcon } from "@nepMeds/assets/svgs";
import {
  Gender,
  IGetAppointmentReqRes,
} from "@nepMeds/service/nepmeds-doctor-patient-appointment";
import { colors } from "@nepMeds/theme/colors";

export const getGender = (gender: Gender) => {
  const genderMap = {
    "1": "Male",
    "2": "Female",
    "3": "Others",
  };
  return genderMap[gender];
};

const InfoSection = ({
  label,
  content,
}: {
  label: string;
  content: string;
}) => {
  return (
    <Box flex={0.5}>
      <Text fontWeight={500} fontSize="xs">
        {label}
      </Text>
      <Text fontWeight={400} fontSize="md">
        {content}
      </Text>
    </Box>
  );
};

const ViewModal: React.FC<{ patient: IGetAppointmentReqRes | undefined }> = ({
  patient,
}) => {
  return (
    <Flex gap={4} direction={"column"}>
      <Flex>
        <InfoSection
          label={"Patient’s Name"}
          content={patient?.full_name || ""}
        />

        <InfoSection
          label={"Gender"}
          content={patient?.gender ? getGender(patient.gender) : ""}
        />
      </Flex>
      <Divider />
      <Flex direction={"column"} gap={2}>
        <Text fontWeight={500} fontSize="xs">
          Health Issues
        </Text>
        <Flex gap={2}>
          {/* TODO: check if a variant of this tag can be made */}
          {patient?.symptoms?.map(({ name }) => (
            <Tag
              bg={colors.blue_10}
              key={name}
              color={colors.main}
              fontSize={"sm"}
              fontWeight={600}
              fontFamily={"Inter"}
              px={2.5}
              py={1.5}
              borderRadius={"8px"}
              textTransform={"capitalize"}
            >
              {name}
            </Tag>
          ))}
        </Flex>
      </Flex>
      <Divider />
      <InfoSection
        label={"Symptom Description"}
        content={patient?.description || ""}
      />
      {patient?.old_report_file && (
        <>
          <Divider />
          <Flex direction={"column"} gap={2}>
            <Text fontWeight={500} fontSize="xs">
              Old Reports
            </Text>
            <Flex gap={2}>
              <Tag
                bg={colors.blue_10}
                borderRadius={"8px"}
                size={"lg"}
                height={"58px"}
                gap={4}
                width={"min-content"}
                cursor={"pointer"}
                onClick={() => window.open(patient?.old_report_file)}
              >
                <DocumentIcon />
                <VStack alignItems={"flex-start"}>
                  <Text
                    color={colors.main}
                    fontSize={"xs"}
                    fontWeight={600}
                    fontFamily={"Inter"}
                  >
                    Report
                  </Text>
                  <Text color={colors.main} fontSize={"sm"} fontWeight={400}>
                    12/12/2020
                  </Text>
                </VStack>
              </Tag>
            </Flex>
          </Flex>
        </>
      )}

      {patient?.reject_remarks && (
        <>
          <Divider />
          <InfoSection
            label="Rejected Reason"
            content={patient?.reject_remarks || ""}
          />
        </>
      )}
    </Flex>
  );
};

export default ViewModal;
