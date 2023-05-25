import {
  Stack,
  Image,
  Box,
  List,
  ListItem,
  Text,
  Icon,
} from "@chakra-ui/react";
import {
  Calendar,
  Call,
  Category,
  Logout,
  Paper,
  TimeCircle,
  Wallet,
  Work,
} from "react-iconly";

import { images } from "@nepMeds/assets/images";
import { colors } from "@nepMeds/theme/colors";
import {
  useLoginTokenDetailQuery,
  useLogoutMutation,
} from "@nepMeds/service/nepmeds-auth";
import { NavLink } from "react-router-dom";

type IconSet = "two-tone" | "light" | "bold" | "bulk" | "broken" | "curved";
interface ISidebarOption {
  icon: React.ElementType;
  set: IconSet;
  text: string;
  link: string;
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
    icon: Work,
    set: "light",
    text: "Bank Details",
    link: "/bank-details",
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
    icon: TimeCircle,
    set: "light",
    text: "Master Data",
    link: "/master-data",
  },
  {
    icon: Call,
    set: "light",
    text: "Doctors",
    link: "/doctor-list",
  },
  {
    icon: Paper,
    set: "light",
    text: "Patients",
    link: "/patients",
  },
  {
    icon: Calendar,
    set: "light",
    text: "Appointments",
    link: "/appointments",
  },
  {
    icon: Work,
    set: "light",
    text: "User Role",
    link: "/user-role",
  },
  {
    icon: Wallet,
    set: "light",
    text: "Instant Consult Request",
    link: "/consult-request",
  },
];

const Sidebar = () => {
  const logoutAction = useLogoutMutation();
  const logout = () => {
    logoutAction.mutate();
  };
  const { data: userInfo } = useLoginTokenDetailQuery();

  const menuOptions =
    (userInfo?.is_superuser ? AdminSidebarOptions : sidebarOptions) || [];

  return (
    <Box
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
                  key={sidebarOption.text.trim()}
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
              );
            })}
          </List>
        </Box>
      </Stack>
      <Box
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
      </Box>
    </Box>
  );
};

export default Sidebar;
