import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { NotificationWithDotIcon } from "@nepMeds/assets/svgs";
import { CallState } from "@nepMeds/config/enum";
import { INotification } from "@nepMeds/service/nepmeds-notification";
import { IGetPatientBasicProfile } from "@nepMeds/service/nepmeds-patient-details";
import { colors } from "@nepMeds/theme/colors";
import { formatDistance } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { Notification } from "react-iconly";
import { MdCall } from "react-icons/md";
import { Link } from "react-router-dom";

const NotificationDropDown = ({
  notificationData,
  profileData,
  notificationState: { unReadNotification, setUnReadNotification },
}: {
  notificationData: INotification[] | undefined;
  profileData: IGetPatientBasicProfile | undefined;
  notificationState: {
    unReadNotification: boolean;
    setUnReadNotification: Dispatch<SetStateAction<boolean>>;
  };
}) => {
  return (
    <Box position="relative">
      <Menu>
        {({ isOpen, onClose }) => (
          <>
            <MenuButton
              isActive={isOpen}
              onClick={() => {
                onClose();
                setUnReadNotification(false);
              }}
              as={IconButton}
              isRound
              _hover={{
                bg: "transparent",
              }}
              icon={
                unReadNotification ? (
                  <NotificationWithDotIcon />
                ) : (
                  <Notification primaryColor={colors.blue_100} />
                )
              }
              fontSize="20px"
              size={"sm"}
              bg={colors.white}
            >
              Actions
            </MenuButton>
            <MenuList minW={"300"}>
              {notificationData?.map(notification => (
                <Box
                  p={3}
                  m={1}
                  key={notification.id}
                  display={"flex"}
                  flexDirection={"column"}
                  boxShadow={"4px 5px 40px rgba(43, 102, 177, 0.05)"}
                >
                  <Flex gap={2} alignItems={"center"}>
                    <MdCall size={"20"} color={colors.green_button} />
                    <Text>{notification.content}</Text>
                  </Flex>
                  <Flex justifyContent={"space-around"} gap={5}>
                    <Text fontSize={"sm"} color={colors.primary}>
                      {formatDistance(
                        new Date(notification.created_at),
                        new Date(),
                        { addSuffix: true },
                      )}
                    </Text>

                    {notification?.call_notification?.map(
                      notification =>
                        notification.is_callable && (
                          <Text
                            as={Link}
                            key={notification.room_name}
                            fontSize={"sm"}
                            textDecoration={"underline"}
                            color={colors.primary}
                            state={{
                              receiver_user: profileData?.user,
                              room_name: notification.room_name,
                              call_state: CallState.ACCEPTED,
                            }}
                            to={"/video-call"}
                          >
                            Join
                          </Text>
                        ),
                    )}
                  </Flex>
                </Box>
              ))}
              {notificationData?.length === 0 && (
                <Box
                  p={3}
                  m={1}
                  boxShadow={"4px 5px 40px rgba(43, 102, 177, 0.05)"}
                >
                  <Text>No notification found</Text>
                </Box>
              )}
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default NotificationDropDown;
