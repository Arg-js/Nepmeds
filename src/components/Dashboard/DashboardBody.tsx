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
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { colors } from "@nepMeds/theme/colors";
import { useNavigate } from "react-router-dom";
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
    title: "Pending",
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
  const navigate = useNavigate();
  return (
    <Box>
      {profileData?.data?.is_doctor &&
        !profileData?.data?.doctor?.set_payment_status && (
          <Flex
            width={"99%"}
            bg={colors.dimmed_red}
            h={"70px"}
            // alignItems={"start"}
            borderRadius={"16px"}
            p={"10px"}
            m={"10px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text
              color={colors.red}
              fontSize={"16px"}
              justifyContent={"center"}
            >
              Congratulations on the successful verification of your profile! To
              fully utilize our platform`s functionality, please set an
              estimated charge for appointments by{" "}
              <Button
                variant={"unstyled"}
                onClick={() => {
                  navigate(NAVIGATION_ROUTES.PAYMENTS);
                }}
              >
                Clicking here
              </Button>
            </Text>
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
        {/* To do : remove calendar border color */}
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
