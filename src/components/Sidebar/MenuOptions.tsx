import { ListItem, Flex, Text, Box } from "@chakra-ui/react";
import { useProfileData } from "@nepMeds/context/index";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "react-iconly";
import { NavLink } from "react-router-dom";
import { ISidebarOption } from "@nepMeds/components/Sidebar/Sidebar";

const MenuOption = ({
  sidebarOption,
  sidebarCollapsed,
}: {
  sidebarOption: ISidebarOption;
  sidebarCollapsed: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);

  // TODO: remove this once QA confrims
  // const isActiveFn = (to: string) => {
  //   const match = useMatch({ path: to, end: true });
  //   return match;
  // };

  //  USER DATA
  const userInfo = useProfileData();
  //  destructure userInfo data
  const isAdmin = userInfo?.data?.is_superuser;
  const isDoctor = userInfo?.data?.is_doctor;
  const isPayment = userInfo?.data?.doctor?.set_payment_status;
  const payment_status = userInfo?.data?.doctor?.payment_status;

  //  check side bar role
  const checkSideBarRole = ({
    isAdmin,
    isDoctor,
    isPayment,
    payment_status,
    text,
  }: {
    isAdmin: boolean | undefined;
    isDoctor: boolean | undefined;
    isPayment: boolean | undefined;
    payment_status: string | undefined;
    text: string;
  }) => {
    if (
      isAdmin ||
      (isDoctor && isPayment && payment_status === "1") ||
      text === "Dashboard" ||
      text === "Payment"
    )
      return true;

    return false;
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
            color={colors.black_50}
            cursor={"pointer"}
            _hover={{ cursor: "pointer", bgColor: colors.forminput }}
            // TODO: remove this once the QA confirms
            // sx={
            //   isActiveFn("/doctor-list/*")
            //     ? {
            //         background: colors.primary,
            //         color: colors.white
            //       }
            //     : { ":hover": { bgColor: colors.forminput } }
            // }
            onClick={() => setIsActive(prev => !prev)}
            mb={2}
          >
            <Flex justifyContent={"space-around"} alignItems={"center"}>
              <sidebarOption.icon
                set={sidebarOption.set}
                color={colors.black_50}
                // color={
                //   isActiveFn("/doctor-list/*")
                //     ? colors?.white
                //     : colors?.black_50
                // }
                size={20}
              />
              {!sidebarCollapsed && (
                <>
                  <Text
                    fontWeight={"400"}
                    fontSize={"sm"}
                    lineHeight={"17px"}
                    w="min-content"
                    ml={"18px"}
                  >
                    {sidebarOption?.text}
                  </Text>
                  <Box ml={"18px"}>
                    {isActive ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </Box>
                </>
              )}
            </Flex>
          </ListItem>
          {isActive && (
            <Flex flexDirection={"column"} gap={2} my={3}>
              {sidebarOption?.child?.map((item: any) => (
                <ListItem
                  key={item.text}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={sidebarCollapsed ? "center" : "left"}
                  as={NavLink}
                  px={5}
                  py={3}
                  borderRadius={8}
                  to={item.link}
                  _hover={{ cursor: "pointer", bgColor: colors.forminput }}
                  _activeLink={{
                    color: colors.blue_100,
                    bg: colors.primary,
                  }}
                >
                  <item.icon set={item.set} color={colors.black_50} size={15} />
                  {/* TODO: need to reload page for the calculation to happen */}
                  {!sidebarCollapsed && (
                    <Text
                      fontWeight={"400"}
                      fontSize={"sm"}
                      lineHeight={"17px"}
                      color={colors.black_50}
                      ml={"18px"}
                    >
                      {item.text}
                    </Text>
                  )}
                </ListItem>
              ))}
            </Flex>
          )}
        </>
      ) : (
        <>
          {checkSideBarRole({
            isAdmin,
            isDoctor,
            isPayment,
            payment_status,
            text: sidebarOption?.text,
          }) && (
            <ListItem
              display={"flex"}
              alignItems={"center"}
              as={NavLink}
              height="56px"
              p={4}
              borderRadius={12}
              color={colors.black_50}
              _hover={{
                cursor: "pointer",
                bgColor: colors.forminput,
              }}
              _activeLink={{
                background: colors.primary,
                color: colors.white,
              }}
              to={sidebarOption.link}
              mb={2}
            >
              <sidebarOption.icon
                set={sidebarOption.set}
                color={colors.black_50}
                size={20}
              />
              {/* TODO: need to reload page for the calculation to happen */}
              {!sidebarCollapsed && (
                <Text
                  fontWeight={"400"}
                  fontSize={"sm"}
                  lineHeight={"17px"}
                  ml={"18px"}
                >
                  {sidebarOption?.text}
                </Text>
              )}
            </ListItem>
          )}
        </>
      )}
    </Box>
  );
};

export default MenuOption;
