import { Box, Card, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { images } from "@nepMeds/assets/images";
import { colors } from "@nepMeds/theme/colors";
import "../../assets/styles/reactCalender.css";

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
  return (
    <Box>
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
    </Box>
  );
};

export default DashboardBody;
