import {
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useTimer } from "@nepMeds/hooks/Usetimer";
import {
  useSignUpUser,
  useVerifySingUpOTP,
} from "@nepMeds/service/nepmeds-register";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { formatSecondsToMinuteAndSeconds } from "@nepMeds/utils/time";
import { useEffect, useState } from "react";

import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";

const OtpForm = ({ mobile }: { mobile: string }) => {
  const navigate = useNavigate();
  const [otpCode, setOtp] = useState("");

  const verifySingUpOTPAction = useVerifySingUpOTP();

  const signUpAction = useSignUpUser();

  const handleResend = () => {
    signUpAction.mutateAsync({
      email_or_mobile_number: mobile,
    });
  };

  const onSubmit = async () => {
    try {
      await verifySingUpOTPAction.mutateAsync({
        email_or_mobile_number: mobile,
        otp: otpCode,
      });

      toastSuccess("OTP verification successful!");
      setOtp("");
      navigate("/register", { state: { mobile } });
    } catch (error) {
      const err = serverErrorResponse(error);

      toastFail(err);
    }
  };

  useEffect(() => {
    if (otpCode.length === 6) {
      onSubmit();
    }
  }, [otpCode.length]);
  const WAITING_TIME_IN_SECONDS = 5 * 60;

  const { time, startTimer, pauseTimer, resetTimer } = useTimer({
    seconds: WAITING_TIME_IN_SECONDS,
  });
  useEffect(() => {
    startTimer();
    return () => pauseTimer();
  }, []);
  const timer = formatSecondsToMinuteAndSeconds(time);

  return (
    <>
      <VStack alignItems={"end"}>
        <OtpInput
          value={otpCode}
          onChange={val => setOtp(val)}
          numInputs={6}
          inputStyle={{
            width: 45,
            backgroundColor: colors.forminput,
            color: colors.light_gray,
            padding: "14px",
            border: "1px solid #adadc9",
            height: "45px",
          }}
          renderSeparator={index => (
            <span style={{ margin: "7px" }}>{index % 2 ? "-" : ""}</span>
          )}
          // inputType="tel"
          renderInput={props => <Input {...props} />}
          shouldAutoFocus
        />
        <Flex alignItems={"center"}>
          <Heading
            fontSize="14px"
            textAlign="center"
            color={colors.black_30}
            fontWeight="normal"
          >
            Didnt receive the code? &nbsp;
          </Heading>
          {timer !== "00:00" ? (
            <Text
              fontSize="14px"
              textAlign="center"
              color={colors.black_30}
              fontWeight="normal"
            >
              {" "}
              {timer}
            </Text>
          ) : (
            <Text
              fontSize="14px"
              textAlign="center"
              color={colors.black_30}
              fontWeight="normal"
              cursor={"pointer"}
              justifyContent={"center"}
              onClick={() => {
                handleResend();
                setOtp("");
                resetTimer();
                startTimer();
              }}
            >
              Resend
            </Text>
          )}
        </Flex>
      </VStack>

      <Text textAlign="center" fontSize={14} color={colors.black_30}>
        Already have an account?
        <Link
          to="/"
          style={{
            color: colors.blue_100,
            marginLeft: "5px",
          }}
        >
          Login
        </Link>
      </Text>

      <HStack mt={8} justifyContent="center">
        <Button
          backgroundColor={colors.primary}
          textColor={colors.white}
          type="submit"
          isDisabled={otpCode.length !== 6}
          isLoading={verifySingUpOTPAction.isLoading}
        >
          Verify
        </Button>
      </HStack>
    </>
  );
};

export default OtpForm;
