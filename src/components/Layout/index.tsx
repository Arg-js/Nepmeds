import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
// import { useState } from "react";
import { svgs } from "@nepMeds/assets/svgs";
import { useDoctorBasicProfile } from "@nepMeds/service/nepmeds-doctor-profile";

const Layout = () => {
  const { data } = useDoctorBasicProfile();
  console.log(data, "hhhh");

  // const [approved, setApproved] = useState(false);
  // console.log(setApproved());

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

    <>
      {data?.status === "4" ? (
        <>
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            h={"700px"}
            flexDir={"row"}
            width={"100%"}
          >
            <svgs.Work />
          </Box>
          <Stack justifyContent={"center"} alignItems={"center"} mt={"-150px"}>
            <Heading color={"red"}>Account on Hold</Heading>
            <Text color={colors.gray_700} fontSize={"18px"}>
              Since, your application has been put on hold due to insufficient
              details provided. To resubmit the application for verification
              please click here.
            </Text>
          </Stack>
          <Stack pt={"15px"} justifyContent={"center"} alignItems={"center"}>
            <Button
              color={colors.white}
              bg={colors.primary}
              width={"250px"}
              h={"60px"}
              sx={{
                "&:hover": { color: colors.white, bg: colors.primary },
              }}
            >
              {" "}
              Click Here
            </Button>
          </Stack>
        </>
      ) : (
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
      )}
    </>
  );
};

export default Layout;
