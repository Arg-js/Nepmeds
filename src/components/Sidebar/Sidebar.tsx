import {
  Box,
  Flex,
  Image,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Calendar,
  Call,
  Category,
  ChevronDown,
  ChevronUp,
  // Logout,
  Paper,
  TimeCircle,
  Wallet,
  Work,
  User,
  Document,
} from "react-iconly";

import { images } from "@nepMeds/assets/images";
import { useLoginTokenDetailQuery } from "@nepMeds/service/nepmeds-auth";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
// import { STATUSTYPE } from "@nepMeds/config/enum";

type IconSet = "two-tone" | "light" | "bold" | "bulk" | "broken" | "curved";
interface ISidebarOption {
  icon: React.ElementType;
  set: IconSet;
  text: string;
  link: string;
  isOpenable?: boolean;
  data?: { link: string; text: string }[];
}
const sidebarOptions: ISidebarOption[] = [
  {
    icon: Category,
    set: "two-tone",
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: TimeCircle,
    set: "light",
    text: "Appointments",
    link: "/appointments",
  },
  {
    icon: Call,
    set: "light",
    text: "Follow Up",
    link: "/followup",
  },
  {
    icon: Paper,
    set: "light",
    text: "Patient's History",
    link: "/patient-history",
  },
  {
    icon: Calendar,
    set: "light",
    text: "Calender",
    link: "/calendar",
  },

  {
    icon: Wallet,
    set: "light",
    text: "Payment",
    link: "/payment",
  },
];

const AdminSidebarOptions: ISidebarOption[] = [
  {
    icon: Category,
    set: "two-tone",
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: Document,
    set: "light",
    text: "Master Data",
    link: "/master-data",
  },
  {
    icon: Work,
    set: "light",
    text: "Doctors",
    link: "/doctor-list",
    isOpenable: true,
    data: [
      {
        text: "Registration",
        link: "/doctor-list/registration",
      },
      {
        text: "Payment",
        link: "/doctor-list/payment",
      },
    ],
  },
  {
    icon: Paper,
    set: "light",
    text: "Patients",
    link: "/patients",
  },
  {
    icon: TimeCircle,
    set: "light",
    text: "Appointments",
    link: "/appointments",
  },
  {
    icon: User,
    set: "light",
    text: "User Role",
    link: "/user-role",
  },
  {
    icon: Call,
    set: "light",
    text: "Instant Consult Request",
    link: "/consult-request",
  },
];

const MenuOption = ({ sidebarOption }: { sidebarOption: any }) => {
  const [isActive, setIsActive] = useState(false);

  const isActiveFn = (to: string) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    return match;
  };

  return (
    <Box key={sidebarOption.text.trim()}>
      {sidebarOption?.isOpenable ? (
        <>
          <ListItem
            display={"flex"}
            alignItems={"center"}
            height="56px"
            pl={4}
            borderRadius={12}
            _activeLink={{
              background: colors.blue_100,
              color: colors.white,
            }}
            style={
              isActiveFn("/doctor-list/*")
                ? {
                    background: colors.blue_100,
                    color: colors.white,
                  }
                : {}
            }
            _hover={{ cursor: "pointer" }}
            onClick={() => setIsActive(!isActive)}
          >
            <sidebarOption.icon
              set={sidebarOption.set}
              color={
                isActiveFn("/doctor-list/*") ? colors?.white : colors?.black_50
              }
              size={20}
            />
            <Text
              fontWeight={"400"}
              fontSize={"14px"}
              lineHeight={"17px"}
              color={
                isActiveFn("/doctor-list/*") ? colors?.white : colors?.black_50
              }
              ml={"18px"}
              w="140px"
            >
              {sidebarOption?.text}
            </Text>
            {isActive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </ListItem>
          {isActive && (
            <Flex flexDirection={"column"} gap={6} my={3}>
              {sidebarOption?.data?.map((item: any) => (
                <Text
                  as={NavLink}
                  to={item?.link}
                  key={item?.text}
                  fontWeight={"400"}
                  fontSize={"14px"}
                  lineHeight={"17px"}
                  color={colors?.black_50}
                  ml={"50px"}
                  w="140px"
                  _activeLink={{
                    color: colors.blue_100,
                  }}
                >
                  {item?.text}
                </Text>
              ))}
            </Flex>
          )}
        </>
      ) : (
        <>
          <ListItem
            display={"flex"}
            alignItems={"center"}
            as={NavLink}
            height="56px"
            pl={4}
            borderRadius={12}
            _activeLink={{
              background: colors.blue_100,
              color: colors.white,
            }}
            to={sidebarOption.link}
          >
            <sidebarOption.icon
              set={sidebarOption.set}
              color={colors?.black_50}
              size={20}
            />
            <Text
              fontWeight={"400"}
              fontSize={"14px"}
              lineHeight={"17px"}
              color={colors?.black_50}
              ml={"18px"}
              w="140px"
            >
              {sidebarOption?.text}
            </Text>
          </ListItem>
        </>
      )}
    </Box>
  );
};

const Sidebar = () => {
  const { data: userInfo } = useLoginTokenDetailQuery();

  const menuOptions =
    (userInfo?.is_superuser ? AdminSidebarOptions : sidebarOptions) || [];

  return (
    <Box
      w={"300px"}
      display="flex"
      flexDirection="column"
      h="100vh"
      py={3.75}
      px={3.75}
      background="white"
      position="fixed"
      justifyContent="space-between"
    >
      <Stack>
        <Image mb={"47px"} src={images?.logo} alt="nepmeds logo" h={65} />
        <Box p={"0 8px"}>
          <List pl={3}>
            {menuOptions?.map((sidebarOption: any) => {
              return (
                <MenuOption
                  key={sidebarOption.text}
                  sidebarOption={sidebarOption}
                />
              );
            })}
          </List>
        </Box>
      </Stack>
      {/* <Box
        display="flex"
        gap={3}
        onClick={logout}
        cursor="pointer"
        alignItems="center"
        height="48px"
        pl="40px"
        transition="0.35s ease-in-out"
      >
        <Icon as={Logout} fontSize={20} color={colors.error} />
        <span>Logout</span>
      </Box> */}
    </Box>
  );
};

export default Sidebar;
