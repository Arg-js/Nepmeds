import { Box, Flex } from "@chakra-ui/react";
import Navbar from "@nepMeds/components/Navbar/Navbar";
import Sidebar from "@nepMeds/components/Sidebar/Sidebar";
import ApprovedDocList from "@nepMeds/components/Table/Doctor/ApprovedDocList";

const ApprovedDoctor = () => {
  return (
    <Flex>
      <Box flex={"1"}>
        <Sidebar />
      </Box>
      <Box flex={"5"}>
        <Navbar />
        <ApprovedDocList />
      </Box>
    </Flex>
  );
};

export default ApprovedDoctor;
