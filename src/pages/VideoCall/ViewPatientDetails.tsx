import { ViewIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { IRoomUsersInfo } from "@nepMeds/hooks/useVideoCall";
import { appendServerUrl } from "@nepMeds/utils/getImageUrl";

const ViewPatientDetails = ({
  userDetail,
}: {
  userDetail: IRoomUsersInfo | undefined;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <div>
      <ModalComponent
        size={"xl"}
        heading={
          <HStack>
            <Avatar
              name={userDetail?.patient?.name}
              src={appendServerUrl(userDetail?.patient?.profile_picture ?? "")}
            />
            <Text>{userDetail?.patient?.name}</Text>
          </HStack>
        }
        isOpen={isOpen}
        onClose={onClose}
        footer={
          <HStack w="100%" gap={3}>
            <Button flex={1} onClick={onClose}>
              Done
            </Button>
          </HStack>
        }
      >
        <Flex flexDirection={"column"} gap={2}>
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
      </ModalComponent>

      <Button
        onClick={onOpen}
        leftIcon={<ViewIcon />}
        variant={"primaryOutline"}
      >
        View
      </Button>
    </div>
  );
};

export default ViewPatientDetails;
