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
import { useTimerCountDown } from "@nepMeds/hooks/useTimer";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import {
  useGenerateForgetPasswordOTP,
  useVerifyForgetPasswordOTP,
} from "@nepMeds/service/nepmeds-forgot-password";
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

const OtpForm = ({
  mobile,
  isResetPassword,
}: {
  mobile: string;
  isResetPassword: boolean;
}) => {
  const navigate = useNavigate();
  const [otpCode, setOtp] = useState("");

  const verifySignUpOTPAction = useVerifySingUpOTP();
  const signUpAction = useSignUpUser();

  //For Forget Password
  const forgotPasswordAction = useGenerateForgetPasswordOTP();
  const verifyForgetPasswordOTP = useVerifyForgetPasswordOTP();

  const handleResend = () => {
    try {
      if (isResetPassword) {
        forgotPasswordAction.mutateAsync({ email_or_mobile_number: mobile });
      } else {
        signUpAction.mutateAsync({
          email_or_mobile_number: mobile,
        });
      }

      toastSuccess("OTP has been sent!");
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
  };

  const onSubmit = async () => {
    try {
      if (isResetPassword) {
        await verifyForgetPasswordOTP.mutateAsync({
          email_or_mobile_number: mobile,
          otp: otpCode,
        });
        navigate("/reset-password", { state: { mobile, otp: otpCode } });
      } else {
        await verifySignUpOTPAction.mutateAsync({
          email_or_mobile_number: mobile,
          otp: otpCode,
        });

        navigate("/register", { state: { mobile } });
      }
      toastSuccess("OTP verification successful!");
      setOtp("");
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

  const { time, startTimer, pauseTimer, resetTimer } = useTimerCountDown({
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
            fontSize="sm"
            textAlign="center"
            color={colors.black_30}
            fontWeight="normal"
          >
            Didn&apos;t receive the code? &nbsp;
          </Heading>
          {timer !== "00:00" ? (
            <Text
              fontSize="sm"
              textAlign="center"
              color={colors.black_50}
              fontWeight="bold"
            >
              {" "}
              {timer}
            </Text>
          ) : (
            <Text
              fontSize="sm"
              textAlign="center"
              color={colors.blue_100}
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
          to={NAVIGATION_ROUTES.DOCTOR_LOGIN}
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
          onClick={onSubmit}
          isDisabled={otpCode.length !== 6}
          isLoading={
            verifySignUpOTPAction.isLoading || verifyForgetPasswordOTP.isLoading
          }
        >
          Verify
        </Button>
      </HStack>
    </>
  );
};

export default OtpForm;
