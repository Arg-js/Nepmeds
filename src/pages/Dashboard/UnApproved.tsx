import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import CenterLoader from "@nepMeds/components/Common/Loader";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { useProfileData } from "@nepMeds/context/index";
import { useLogoutMutation } from "@nepMeds/service/nepmeds-auth";
import { colors } from "@nepMeds/theme/colors";
import { Link } from "react-router-dom";

const UnApprovedDoctor = () => {
  const profileData = useProfileData();
  const logoutAction = useLogoutMutation();

  profileData?.isLoading && <CenterLoader />;

  return (
    <Container maxW="100%">
      <Box m={"auto"} mt={"7%"}>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
          h={"auto"}
          flexDir={"row"}
          width={"100%"}
          mt={"30px"}
          // bg={"red"}
        >
          <svgs.Work />
        </Box>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Heading color={"red"}>
            Account on{" "}
            {profileData?.data?.doctor?.status ===
            STATUSTYPE.rejected.toString()
              ? "Hold"
              : "Pending"}
          </Heading>
          <Text
            color={colors.gray_700}
            fontSize={"18px"}
            w={"50%"}
            textAlign={"center"}
          >
            Since, your application has been put on hold due to insufficient
            details provided.{"\n"} To resubmit the application for verification
            please{" "}
            <Button
              variant={"unstyled"}
              as={Link}
              to={"/doctor-profile"}
              onClick={() => {}}
              fontSize={"16px"}
              fontWeight={"500"}
              color={colors.blue_100}
            >
              click here
            </Button>
          </Text>

          {profileData?.data?.doctor?.status ===
            STATUSTYPE.rejected.toString() && (
            <Box
              p={"18px"}
              borderRadius={"16px"}
              bg={"#FEE2E2"}
              w={"auto"}
              display={"flex"}
            >
              <Heading fontSize={"18px"} color={colors.red}>
                Rejected Reason :{" "}
              </Heading>
              <Text color={colors.red}>
                {profileData.data.doctor.rejected_remarks}
              </Text>
            </Box>
          )}
        </Stack>
        <Stack pt={"15px"} justifyContent={"center"} alignItems={"center"}>
          <Button onClick={() => logoutAction.mutate()}>Logout</Button>
        </Stack>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        pb={"15px"}
        pr={"50px"}
        mt={"3%"}
      >
        <svgs.logo />
      </Box>
    </Container>
  );
};

export default UnApprovedDoctor;
