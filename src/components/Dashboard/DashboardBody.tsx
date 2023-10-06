import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  GridItem,
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
import PendingDocList from "@nepMeds/components/Table/Doctor/PendingDocList";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";

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
    <Container maxW="container.xl">
      {profileData?.data?.is_doctor &&
        !profileData?.data?.doctor?.set_payment_status && (
          <Flex
            width={"99%"}
            bg={colors.dimmed_red}
            h={"auto"}
            borderRadius={"16px"}
            px={"2"}
            py={"1"}
            m={"4"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text color={colors.red} fontSize={"sm"} justifyContent={"center"}>
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

      <SimpleGrid spacing={8} minChildWidth="252px" my={"28px"}>
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
              <Flex gap={2}>
                <Image src={dashboardData?.path} />
                <Box>
                  <Text
                    fontSize={"sm"}
                    fontWeight={"500"}
                    color={colors?.primary_blue}
                  >
                    {dashboardData?.title}
                  </Text>

                  <Text
                    fontSize={"2xl"}
                    fontWeight={"600"}
                    color={colors?.gray_700}
                  >
                    {dashboardData?.no}
                  </Text>
                </Box>
              </Flex>
            </Card>
          );
        })}
      </SimpleGrid>
      <Grid templateColumns={"repeat(2, 1fr)"}>
        <GridItem></GridItem>
        <GridItem justifySelf={"flex-end"}>
          <Calendar className={"react-calendar"} />
        </GridItem>
      </Grid>
      <Box
        borderRadius={"12px"}
        marginRight={"20px"}
        display={"flex"}
        justifyContent={"flex-end"}
      ></Box>

      {/* ADMIN */}
      {profileData?.data?.is_superuser && (
        // TODO: check the wrapper
        <WrapperBox
          style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}
        >
          <>
            <Text variant="tableHeading">Pending Doctors</Text>
            <PendingDocList showFilter={false} />
          </>
        </WrapperBox>
      )}
    </Container>
  );
};

export default DashboardBody;
