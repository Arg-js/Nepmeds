import { ListItem, Flex, Text, Box } from "@chakra-ui/react";
import { useProfileData } from "@nepMeds/context/index";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "react-iconly";
import { useResolvedPath, useMatch, NavLink } from "react-router-dom";
import { ISidebarOption } from "@nepMeds/components/Sidebar/Sidebar";

const MenuOption = ({
  sidebarOption,
  isSmallScreen,
}: {
  sidebarOption: ISidebarOption;
  isSmallScreen: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);

  const isActiveFn = (to: string) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    return match;
  };

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

    // TODO: REMOVE THIS CODE AFTER QA testing
    // if (isAdmin) return true;
    // if (isDoctor && isPayment && payment_status === "1") return true;
    // if (text === "Dashboard" || text === "Payment") return true;

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
              fontSize={"sm"}
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
                  fontSize={"sm"}
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
              _activeLink={{
                background: colors.primary,
                color: colors.white,
              }}
              to={sidebarOption.link}
            >
              <sidebarOption.icon
                set={sidebarOption.set}
                color={colors?.black_50}
                size={20}
              />
              {/* TODO: need to reload page for the calculation to happen */}
              {window.innerWidth >= 768 && isSmallScreen && (
                <Text
                  fontWeight={"400"}
                  fontSize={"sm"}
                  lineHeight={"17px"}
                  color={colors?.black_50}
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
