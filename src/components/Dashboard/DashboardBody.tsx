import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { images } from "@nepMeds/assets/images";
import { useProfileData } from "@nepMeds/context/index";
import { colors } from "@nepMeds/theme/colors";
import "../../assets/styles/reactCalender.css";
import PendingDocList from "../Table/Doctor/PendingDocList";

interface IDashboardData {
  title: string;
  no: number;
  path: string;
}

const dashboardDatas: IDashboardData[] = [
  {
    title: "No. of Patient",
    no: 232,
    path: images?.dashboard1,
  },
  {
    title: "Appointments",
    no: 232,
    path: images?.dashboard2,
  },
  {
    title: "Pending Appointments",
    no: 232,
    path: images?.dashboard3,
  },
  {
    title: "Follow - Ups",
    no: 232,
    path: images?.dashboard4,
  },
];

const DashboardBody = () => {
  const profileData = useProfileData();
  return (
    <Box>
      {profileData?.data?.is_doctor &&
        !profileData?.data?.doctor?.set_payment_status && (
          <Flex
            width={"99%"}
            bg={colors.light_blue}
            h={"70px"}
            // alignItems={"start"}
            borderRadius={"16px"}
            p={"10px"}
            m={"10px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text
              color={colors.primary}
              fontSize={"16px"}
              justifyContent={"center"}
            >
              Hello ! {profileData?.data?.first_name}. Congratulations, your
              profile has been verified successfully. Please set estimated
              charge for appointment to use our functionality fully. Thankyou !
            </Text>
            <Button
              mr={"10px"}
              color={colors.white}
              bg={colors.primary}
              h={"45px"}
              w={"170px"}
              fontSize={"18px"}
              sx={{
                "&:hover": { bg: colors.primary, color: colors.white },
              }}
            >
              Click Me
            </Button>
          </Flex>
        )}

      <SimpleGrid
        spacing={8}
        templateColumns="repeat(4, 1fr)"
        margin={"28px 19px 20px"}
      >
        {dashboardDatas.map(dashboardData => {
          return (
            <Card
              key={dashboardData.title.trim()}
              boxShadow={"4px 5px 40px rgba(43, 102, 177, 0.05)"}
              backdropFilter={"blur(11px)"}
              borderRadius={"20px"}
              padding={"20px"}
              height={"96px"}
            >
              <Box>
                <Flex>
                  <Box>
                    <Image src={dashboardData?.path} />
                  </Box>
                  <Box pl={"18px"}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"14px"}
                      lineHeight={"24px"}
                      letterSpacing={"-0.02em"}
                      color={colors?.primary_blue}
                    >
                      {dashboardData?.title}
                    </Text>

                    <Text
                      fontSize={"24px"}
                      fontWeight={"600"}
                      lineHeight={"32px"}
                      color={colors?.gray_700}
                    >
                      {dashboardData?.no}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Card>
          );
        })}
      </SimpleGrid>
      <Box
        borderRadius={"12px"}
        marginRight={"20px"}
        display={"flex"}
        justifyContent={"flex-end"}
      >
        <Calendar />
      </Box>
      {profileData?.data?.is_superuser && (
        <Container maxW={"container.2xl"}>
          <Text fontWeight={"bold"}>Pending Doctors</Text>
          <PendingDocList showFilter={false} />
        </Container>
      )}
    </Box>
  );
};

export default DashboardBody;
