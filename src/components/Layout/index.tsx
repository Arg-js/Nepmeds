import { Box, Card, CardBody, Flex } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <Flex>
      <Box flex={"1"}>
        <Sidebar />
      </Box>
      <Box flex={"5"} bg={colors.bg}>
        <Navbar />
        <Card m={5} borderRadius={12} boxShadow="none">
          <CardBody>
            <Outlet />
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
};

export default Layout;
