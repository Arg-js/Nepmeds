import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import { images } from "@nepMeds/assets/images";
import { useProfileData } from "@nepMeds/context/index";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { colors } from "@nepMeds/theme/colors";
import { useNavigate } from "react-router-dom";
import PendingDocList from "@nepMeds/components/Table/Doctor/PendingDocList";
import PendingPayment from "../Table/Payment/PendingPayment";
import { STATUSTYPE } from "@nepMeds/config/enum";
import TableWrapper from "../TableWrapper";
import { useMemo } from "react";
import { fallbackToDash } from "@nepMeds/pages/Patient/Profile/Components/PatientDetails";
import { useAdminProfile } from "@nepMeds/service/nepmeds-doctor-profile";

interface IDashboardData {
  title: string;
  no: number | string;
  path: string;
}

export const DashboardBody = () => {
  const profileData = useProfileData();
  const { data } = useAdminProfile(profileData?.data?.is_superuser);
  const navigate = useNavigate();
  const dashboardData: IDashboardData[] = useMemo(
    () => [
      {
        title: "No. of Patient",
        no: fallbackToDash(
          data?.no_of_patient ?? profileData?.data?.no_of_patient
        ),
        // TODO: better approach for this if any
        path: images?.dashboard1 ?? "",
      },
      {
        title: "Appointments",
        no: fallbackToDash(data?.appointment ?? profileData?.data?.appointment),
        path: images?.dashboard2 ?? "",
      },
      {
        title: "Pending",
        no: fallbackToDash(data?.pending ?? profileData?.data?.pending),
        path: images?.dashboard3 ?? "",
      },
      {
        title: "Follow - Ups",
        no: fallbackToDash(data?.follow_ups ?? profileData?.data?.follow_ups),
        path: images?.dashboard4 ?? "",
      },
    ],
    [profileData]
  );

  return (
    <Box m={4}>
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
        {dashboardData.map(dashboardDetails => {
          return (
            <Card
              key={dashboardDetails.title.trim()}
              boxShadow={"4px 5px 40px rgba(43, 102, 177, 0.05)"}
              backdropFilter={"blur(11px)"}
              borderRadius={"20px"}
              padding={"20px"}
              height={"96px"}
            >
              <Flex gap={2}>
                <Image src={dashboardDetails.path} />
                <Box>
                  <Text
                    fontSize={"sm"}
                    fontWeight={"500"}
                    color={colors?.primary_blue}
                  >
                    {dashboardDetails.title}
                  </Text>

                  <Text
                    fontSize={"2xl"}
                    fontWeight={"600"}
                    color={colors?.gray_700}
                  >
                    {dashboardDetails.no}
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
        <TableWrapper>
          <Text variant="tableHeading">Pending Doctors</Text>
          <Tabs>
            <TabList border={"none"}>
              <Tab>Registration</Tab>
              <Tab>Rate</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <PendingDocList showFilter={false} />
              </TabPanel>
              <TabPanel>
                <PendingPayment type={STATUSTYPE.pending} heading={"Pending"} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </TableWrapper>
      )}
    </Box>
  );
};
