import { Button, HStack, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  useSignUpUser,
  useVerifySingUpOTP,
} from "@nepMeds/service/nepmeds-register";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { useEffect, useRef, useState } from "react";
import Countdown, { CountdownRenderProps, zeroPad } from "react-countdown";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";

const OtpForm = ({ mobile }: { mobile: string }) => {
  const navigate = useNavigate();
  const [otpCode, setOtp] = useState("");
  const countRef = useRef<Countdown>(null);
  const [date, setDate] = useState(Date.now() + 300000);

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

        <Heading
          fontSize="14px"
          textAlign="center"
          color={colors.black_30}
          fontWeight="normal"
        >
          Didnt receive the code? &nbsp;
          <span>
            <Countdown
              ref={countRef}
              date={date}
              autoStart
              zeroPadTime={2}
              controlled={false}
              renderer={({
                minutes,
                seconds,
                completed,
              }: CountdownRenderProps) => {
                if (completed) {
                  return (
                    <span>
                      <Button
                        fontWeight="inherit"
                        fontSize="inherit"
                        p={0}
                        bg="transparent"
                        h={5}
                        color={colors.blue_100}
                        sx={{
                          "&:hover": {
                            bg: "transparent !important",
                            boxShadow: "none !important",
                          },
                        }}
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {
                          event.preventDefault();
                          if (
                            countRef.current !== null &&
                            countRef.current !== undefined
                          ) {
                            setDate(Date.now() + 300000);
                            countRef.current.stop();
                            countRef.current.start();
                            handleResend();
                            setOtp("");
                          }
                        }}
                      >
                        Resend
                      </Button>
                    </span>
                  );
                }
                return (
                  <span>
                    {zeroPad(minutes)}:{zeroPad(seconds)}
                  </span>
                );
              }}
            />
          </span>
        </Heading>
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
