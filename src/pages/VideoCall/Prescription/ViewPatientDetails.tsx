import { CloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Card,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { IRoomUsersInfo } from "@nepMeds/hooks/useVideoCall";
import { appendServerUrl } from "@nepMeds/utils/getImageUrl";

const ViewPatientDetails = ({
  userDetail,
  onClose,
}: {
  userDetail: IRoomUsersInfo | undefined;
  onClose: () => void;
}) => {
  return (
    <Card align="center" maxW="sm" minW={"sm"}>
      <Flex
        justifyContent={"space-between"}
        px={5}
        alignItems={"center"}
        w={"100%"}
      >
        <Heading size="sm">View Patient Details</Heading>
        <IconButton
          variant="ghost"
          colorScheme="gray"
          aria-label="View Patient Details"
          icon={<CloseIcon />}
          onClick={onClose}
        />
      </Flex>
      <Divider w={"90%"} mb={5} />
      <Flex flexDirection={"column"} gap={2} alignItems={"start"} w={"90%"}>
        <Flex alignItems={"center"} gap={3} justifyContent={"start"}>
          <Text fontWeight={"bold"}>Symptoms:</Text>
          <Box>
            {userDetail?.symptoms.map((symptom, index) => (
              <Badge
                key={index}
                borderRadius={"lg"}
                colorScheme={"green"}
                p={1}
              >
                {symptom}
              </Badge>
            ))}
          </Box>
        </Flex>

        <Flex justifyContent={"start"} flexDirection={"column"}>
          <Text fontWeight={"bold"}>Description:</Text>
          <Box>{userDetail?.description}</Box>
        </Flex>

        {userDetail?.old_reports && (
          <Image src={appendServerUrl(userDetail?.old_reports)} />
        )}
      </Flex>
    </Card>
  );
};

export default ViewPatientDetails;
