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
import { FaRegCalendarCheck } from "react-icons/fa";
import { images } from "@nepMeds/assets/images";
import { useLoginTokenDetailQuery } from "@nepMeds/service/nepmeds-auth";
import MenuOption from "@nepMeds/components/Sidebar/MenuOptions";

type IconSet = "two-tone" | "light" | "bold" | "bulk" | "broken" | "curved";
interface ISidebarItem {
  link: string;
  text: string;
  icon: React.ElementType;
}
export interface ISidebarOption extends ISidebarItem {
  set: IconSet;
  isOpenable?: boolean;
  child?: ISidebarItem[];
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
    icon: FaRegCalendarCheck,
    set: "light",
    text: "Rescheduled",
    link: "/reschedule",
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
    child: [
      {
        text: "Registration",
        link: "/doctor-list/registration",
        icon: Document,
      },
      {
        text: "Rate",
        link: "/doctor-list/payment",
        icon: Wallet,
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
    icon: FaRegCalendarCheck,
    set: "light",
    text: "Rescheduled",
    link: "/reschedule",
  },
  {
    // todo: CHANGE THE ICON
    icon: Category,
    set: "light",
    text: "Discount",
    link: "/discount",
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
    text: "Instant Consult",
    link: "/instant-consult-request",
  },
  {
    icon: Paper,
    set: "light",
    text: "Follow Up",
    link: "/follow-up",
  },
  {
    icon: Wallet,
    set: "light",
    text: "Payment",
    link: "/payment",
  },
  {
    icon: Category,
    set: "light",
    text: "FAQ",
    link: "/faq",
  },
];

const height = "40px";
const logoWidthSmall = "50px";
const logoWidthLarge = "180px";

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
      overflowY={"auto"}
    >
      <Image
        src={!sidebarCollapsed ? images?.logo : images?.smallLogo}
        alt="logo"
        height={sidebarCollapsed ? height : "auto"}
        width={sidebarCollapsed ? logoWidthSmall : logoWidthLarge}
        alignSelf={"center"}
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
