import { Box, Grid, GridItem } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    // <Flex>
    //   <Box flex={"1"}>
    //     <Sidebar />
    //   </Box>
    //   <Box flex={"6"} bg={colors.bg}>
    //     <Navbar />
    //     <Card m={5} borderRadius={12} boxShadow="none">
    //       <CardBody>
    //         <Outlet />
    //       </CardBody>
    //     </Card>
    //   </Box>
    // </Flex>
    // "nav footer"
    <Grid
      templateAreas={`"side nav"`}
      gridTemplateColumns={"296px 1fr"}
      gap="1"
    >
      <GridItem area={"side"}>
        <Sidebar />
      </GridItem>
      <GridItem bg={colors.bg} area={"nav"}>
        <Navbar />
        <Box
        //  m={2}
        >
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Layout;
