import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const DashboardWrapper = ({ children }: IWrapper) => {
  return (
    <Flex>
      <Box flex={"1"}>
        <Sidebar />
      </Box>
      <Box flex={"5"}>
        <Navbar />
        {children}
      </Box>
    </Flex>
  );
};

interface IWrapper {
  children: React.ReactNode;
}
export default DashboardWrapper;
