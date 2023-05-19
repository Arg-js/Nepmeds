import { Box, Flex } from "@chakra-ui/react";

import Sidebar from "@nepMeds/components/Sidebar/Sidebar";
import Navbar from "@nepMeds/components/Navbar/Navbar";
import DashboardBody from "@nepMeds/components/Dashboard/DashboardBody";

const Dashboard = () => {
  return (
    <>
      <Flex>
        <Box flex={"1"}>
          <Sidebar />
        </Box>
        <Box flex={"5"}>
          <Navbar />
          <DashboardBody />
        </Box>
      </Flex>
    </>
  );
};
export default Dashboard;
