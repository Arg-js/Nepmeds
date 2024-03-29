import {
  Container,
  Stack,
  Heading,
  Button,
  Box,
  Text,
  Image,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import { images } from "@nepMeds/assets/images";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CenterLoader from "../Common/Loader";
import { colors } from "@nepMeds/theme/colors";
import TokenService from "@nepMeds/service/service-token";
import { usePatientBasicProfile } from "@nepMeds/service/nepmeds-patient-details";
import { useGetPaymentStatus } from "@nepMeds/service/nepmeds-payment";
import { convertToTitleCase } from "@nepMeds/utils/string";
import { splitDateTime } from "@nepMeds/utils/time";

const PaymentStatus = ({ isSuccess }: { isSuccess: boolean }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("payment_id");
  const navigate = useNavigate();
  const isAuthenticated = TokenService.isAuthenticated();
  const { data: profileData, isLoading } =
    usePatientBasicProfile(isAuthenticated);
  const { data: paymentData } = useGetPaymentStatus(id ?? "");

  useEffect(() => {
    if (!isAuthenticated || !id) {
      navigate(NAVIGATION_ROUTES.PATIENT.DOCTOR_CONSULTATION);
    }
  }, [profileData]);

  isLoading && <CenterLoader />;

  return (
    <Container maxW="100%">
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        onClick={() => navigate(NAVIGATION_ROUTES.PATIENT.DOCTOR_CONSULTATION)}
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
          <Image
            src={isSuccess ? images?.paymentSuccess : images?.paymentFail}
          />
        </Box>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Heading color={isSuccess ? "green" : "red"}>
            Payment {isSuccess ? "Successful" : "Failed"}
          </Heading>
          <Text
            color={colors.gray_700}
            fontSize={"lg"}
            w={"50%"}
            textAlign={"center"}
          >
            {/* {isSuccess
              ? "Thank you for you payment! Your transaction was successful."
              : "Unfortunately your payment failed. Please try again."} */}
            {paymentData?.transaction_message}
          </Text>
        </Stack>
        {isSuccess && paymentData?.transaction_detail && (
          <Stack justifyContent={"center"} alignItems={"center"} mt={2}>
            <Text fontSize={"lg"} fontWeight={"bold"}>
              Transaction Details:
            </Text>
            <Flex minW={"30%"} flexDirection={"column"}>
              {Object.entries(paymentData?.transaction_detail).map(
                ([key, value]) => {
                  return (
                    <HStack key={value} justifyContent={"space-between"}>
                      <Text fontWeight={"light"}>
                        {convertToTitleCase(key)}
                      </Text>
                      <Text>
                        {key === "amount"
                          ? `Rs. ${value}`
                          : key === "date"
                          ? splitDateTime(String(value))[0]
                          : value}
                      </Text>
                    </HStack>
                  );
                }
              )}
            </Flex>
          </Stack>
        )}
        <Stack pt={"15px"} justifyContent={"center"} alignItems={"center"}>
          <Button
            onClick={() =>
              navigate(NAVIGATION_ROUTES.PATIENT.DOCTOR_CONSULTATION)
            }
          >
            Go to Home
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default PaymentStatus;
