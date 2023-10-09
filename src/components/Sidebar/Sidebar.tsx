import { Flex, Image, List } from "@chakra-ui/react";
import {
  Calendar,
  Call,
  Category,
  Paper,
  TimeCircle,
  Wallet,
  Work,
  User,
  Document,
} from "react-iconly";

import { images } from "@nepMeds/assets/images";
import { useLoginTokenDetailQuery } from "@nepMeds/service/nepmeds-auth";
import MenuOption from "@nepMeds/components/Sidebar/MenuOptions";

type IconSet = "two-tone" | "light" | "bold" | "bulk" | "broken" | "curved";
export interface ISidebarOption {
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
    link: "/follow-up",
  },
  {
    icon: Paper,
    set: "light",
    text: "Patient's History",
    link: "/patient's-history",
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
        text: "Rate",
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
    link: "/instant-consult-request",
  },
];

const Sidebar = ({ sidebarCollapsed }: { sidebarCollapsed: boolean }) => {
  const { data: userInfo } = useLoginTokenDetailQuery();

  const menuOptions =
    (userInfo?.is_superuser ? AdminSidebarOptions : sidebarOptions) || [];

  return (
    <Flex
      display="flex"
      flexDirection="column"
      h="100vh"
      py={3.75}
      px={3.75}
      background="white"
      position="fixed"
      gap={6}
      zIndex={1}
    >
      <Image
        src={
          // TODO: consult with UI/UX for design update
          window.innerWidth >= 768 && sidebarCollapsed
            ? images?.logo
            : images?.smallLogo
        }
        alt="logo"
      />
      <List>
        {menuOptions?.map((sidebarOption: ISidebarOption) => {
          return (
            <MenuOption
              key={sidebarOption.text}
              sidebarOption={sidebarOption}
              sidebarCollapsed={sidebarCollapsed}
            />
          );
        })}
      </List>
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
    </Flex>
  );
};

export default Sidebar;
