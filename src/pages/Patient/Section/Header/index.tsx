import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NepmedsLogo from "@nepMeds/assets/images/logo.png";
import { HamburgerMenuIcon, SignInIcon, svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { toastFail } from "@nepMeds/components/Toast";
import { CallState, NotificationType } from "@nepMeds/config/enum";
import { PUSHER_SUBSCRIBE_EVENT } from "@nepMeds/config/index";
import {
  IPusherNotification,
  useNotification,
} from "@nepMeds/hooks/useNotification";
import useVideoCall from "@nepMeds/hooks/useVideoCall";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useLogoutMutation } from "@nepMeds/service/nepmeds-auth";
import { usePatientBasicProfile } from "@nepMeds/service/nepmeds-patient-details";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import TokenService from "@nepMeds/service/service-token";
import { colors } from "@nepMeds/theme/colors";
import { MutableRefObject, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import ring from "@nepMeds/assets/sound/ring.mp3";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";
import { useGetAllNotification } from "@nepMeds/service/nepmeds-notification";
import NotificationDropDown from "@nepMeds/components/Notification/NotificationDropDown";

const Header: React.FC<{
  onClick?: () => void;
  btnRef?: MutableRefObject<null>;
}> = ({ onClick, btnRef }) => {
  const navigate = useNavigate();
  const isAuthenticated = TokenService.isAuthenticated();
  const { data } = usePatientBasicProfile(isAuthenticated);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { rejectCall } = useVideoCall();
  const [roomName, setRoomName] = useState("");
  const [declineLoading, setDeclineLoading] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState<IPusherNotification["doctor"]>();
  const channel = useNotification();
  const [unReadNotification, setUnReadNotification] = useState(false);
  const {
    data: notificationData,
    isLoading: notificationLoading,
    refetch,
  } = useGetAllNotification();

  const modalClose = () => {
    onClose();
  };

  const callNotification = ({
    is_missed,
    doctor,
    room_name,
  }: IPusherNotification) => {
    if (is_missed) {
      modalClose();
      setDoctorInfo(undefined);
      setRoomName("");
    } else {
      onOpen();
      setDoctorInfo(doctor);
      setRoomName(room_name ?? "");
    }
  };

  {
    isAuthenticated &&
      channel.bind(
        `${PUSHER_SUBSCRIBE_EVENT}-${data?.user}`,
        (data: IPusherNotification) => {
          data?.notification_type.toString() ===
            NotificationType.VIDEOCALL.toString() && callNotification(data);
          setUnReadNotification(true);
          refetch();
        }
      );
  }

  const rejectCallFN = async () => {
    try {
      setDeclineLoading(true);
      await rejectCall({
        call_state: CallState.REJECTED,
        room_name: roomName,
      });
      modalClose();
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
    setDeclineLoading(false);
  };

  // REACT QUERY
  const { mutate: logoutAction } = useLogoutMutation({ user: "PATIENT" });
  // REACT QUERY ENDS
  return (
    <WrapperBox
      height={"100px"}
      padding={"6"}
      boxShadow={"rgba(99, 99, 99, 0.2) 0px 0px 10px 0px"}
      style={{
        mb: "2px",
      }}
    >
      <Flex justifyContent={"space-between"}>
        <ModalComponent
          closeOnOverlayClick={false}
          heading={
            <Flex alignItems={"center"} gap={4}>
              <svgs.logo_small />
              Doctor&apos;s Call
            </Flex>
          }
          isOpen={isOpen}
          onClose={modalClose}
          footer={
            <HStack w="100%" gap={3} justifyContent={"space-between"}>
              <Button
                flex={1}
                bg={colors.reset}
                leftIcon={<RxCrossCircled />}
                isLoading={declineLoading}
                onClick={rejectCallFN}
              >
                Decline
              </Button>

              <Button
                flex={1}
                as={Link}
                leftIcon={<CheckIcon />}
                bg={colors.green_button}
                state={{
                  receiver_user: data?.user,
                  room_name: roomName,
                  call_state: CallState.ACCEPTED,
                }}
                to={"/video-call"}
              >
                Answer
              </Button>
            </HStack>
          }
        >
          <>
            <Flex
              gap={3}
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {doctorInfo?.doctor_image && (
                <Image
                  src={
                    getImageUrl(doctorInfo?.doctor_image) ??
                    "https://image.pngaaa.com/909/2676909-middle.png"
                  }
                  width={"150px"}
                />
              )}

              <Text fontWeight={"bold"} fontSize={"xl"}>
                {doctorInfo?.doctor_name}
              </Text>
            </Flex>

            <audio id="player" autoPlay loop style={{ display: "none" }}>
              <source src={ring} type="audio/mp3" />
            </audio>
          </>
        </ModalComponent>
        <Image
          src={NepmedsLogo}
          alt={"Nepmemds logo"}
          onClick={() => navigate(NAVIGATION_ROUTES.DOCTOR_CONSULTATION)}
          cursor={"pointer"}
        />
        <Flex alignItems={"center"} justifyContent={"space-around"} gap={6}>
          {/* Search Field */}
          <InputGroup
            style={{ height: "46px" }}
            width={{ base: "auto", lg: "561px" }}
            display={{ base: "none", md: "block" }}
          >
            <InputRightElement pointerEvents="none">
              <IconButton
                right="1px"
                aria-label="button"
                height="38px"
                size="sm"
                borderLeftRadius={0}
                borderRightRadius="30px"
                width={{ base: "30px", md: "61px" }}
              >
                <SearchIcon fill="#fff" />
              </IconButton>
            </InputRightElement>
            <Input
              type="text"
              placeholder="Search for doctors"
              borderRadius="30px"
              borderColor={colors.primary}
              color={colors.gray_text_header}
            />
          </InputGroup>
          {/* Search Field ends */}

          {/* Notificaiton Dropdown with Login */}
          {isAuthenticated && !notificationLoading && (
            <NotificationDropDown
              notificationData={notificationData}
              notificationState={{
                setUnReadNotification,
                unReadNotification,
              }}
              profileData={data}
            />
          )}

          {/* Login icon */}
          {!isAuthenticated ? (
            <Flex
              gap={1}
              cursor={"pointer"}
              onClick={() =>
                (window.location.href =
                  import.meta.env.VITE_APP_NEPMEDS_LOGIN_ROUTE)
              }
              display={{ base: "none", md: "flex" }}
            >
              <SignInIcon />
              <Text fontWeight={500} fontSize={"sm"} color={colors.black}>
                Login/SignUp
              </Text>
            </Flex>
          ) : (
            <Flex
              cursor={"pointer"}
              display={{ base: "none", md: "flex" }}
              alignItems={"center"}
              gap={3}
            >
              <Menu>
                <MenuButton
                  sx={{
                    "&>span": { display: "flex", alignItems: "center", gap: 2 },
                  }}
                >
                  <Avatar />
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem onClick={() => logoutAction({})}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}
          {/* Login icon ENDS*/}
        </Flex>

        {/\/patient\/doctor-list/.test(window.location.href) && (
          <Box
            display={{ base: "block", md: "none" }}
            ref={btnRef}
            onClick={onClick}
            cursor={"pointer"}
          >
            <HamburgerMenuIcon />
          </Box>
        )}
        {/* ENDS */}
      </Flex>
    </WrapperBox>
  );
};

export default Header;
