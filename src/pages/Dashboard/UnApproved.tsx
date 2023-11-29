import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import CenterLoader from "@nepMeds/components/Common/Loader";
import { useProfileData } from "@nepMeds/context/index";
import doctorStatus from "@nepMeds/helper/doctorStatus";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useLogoutMutation } from "@nepMeds/service/nepmeds-auth";
import { colors } from "@nepMeds/theme/colors";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UnApprovedDoctor = () => {
  const profileData = useProfileData();
  const logoutAction = useLogoutMutation({});
  const navigate = useNavigate();
  const data = profileData?.data;

  const doctorStatusState = doctorStatus(data?.doctor?.status?.toString());

  useEffect(() => {
    if (data && doctorStatusState?.isApproved) {
      navigate(NAVIGATION_ROUTES.DASHBOARD);
    }
  }, [data]);

  profileData?.isLoading && <CenterLoader />;

  return (
    <Container maxW="100%">
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        // pb={"15px"}
        // pr={"50px"}
        mt={"1%"}
      >
        <svgs.logo />
      </Box>
      <Box m={"auto"}>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
          h={"50dvh"}
          flexDir={"row"}
          width={"100%"}
          mt={"30px"}
        >
          <svgs.Work />
        </Box>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Heading color={"red"}>
            Account on {doctorStatusState.isRejected ? "Hold" : "Pending"}
          </Heading>
          <Text
            color={colors.gray_700}
            fontSize={"lg"}
            w={"50%"}
            textAlign={"center"}
          >
            Your application is{" "}
            {doctorStatusState.isRejected ? "on Hold" : "Pending"}.{"\n"} To
            resubmit the application for verification please{" "}
            <Button
              variant={"unstyled"}
              as={Link}
              to={NAVIGATION_ROUTES.DOCTOR_PROFILE}
              fontSize={"md"}
              fontWeight={"500"}
              color={colors.blue_100}
            >
              click here
            </Button>
          </Text>

          {data && doctorStatusState.isRejected && (
            <Box
              p={"18px"}
              borderRadius={"16px"}
              bg={colors.dimmed_red}
              w={"auto"}
              display={"flex"}
            >
              <Heading fontSize={"lg"} color={colors.red}>
                Rejected Reason{" "}
              </Heading>
              <Text color={colors.red} ml={1}>
                {data?.doctor?.rejected_remarks}
              </Text>
            </Box>
          )}
        </Stack>
        <Stack pt={"15px"} justifyContent={"center"} alignItems={"center"}>
          <Button onClick={() => logoutAction.mutate({})}>Logout</Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default UnApprovedDoctor;
