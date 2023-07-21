import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  useSignUpUser,
  useVerifySingUpOTP,
} from "@nepMeds/service/nepmeds-register";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { FormEvent, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";

const OtpForm = ({ mobile }: { mobile: string }) => {
  const navigate = useNavigate();
  const [otpCode, setOtp] = useState("");

  const verifySingUpOTPAction = useVerifySingUpOTP();

  const onFormSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await verifySingUpOTPAction.mutateAsync({
        otp: otpCode,
        email_or_mobile_number: mobile,
      });
      toastSuccess("OTP has been verified successfully!");
      navigate("/register", { state: { mobile } });
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
  };

  const singUpAction = useSignUpUser();
  const onSubmit = async () => {
    try {
      await singUpAction.mutateAsync({
        email_or_mobile_number: mobile,
      });

      toastSuccess("OTP code has been sent to your mobile!");
      setOtp("");
    } catch (error) {
      const err = serverErrorResponse(error);

      toastFail(err);
    }
  };
  return (
    <form style={{ width: "100%" }} onSubmit={onFormSubmit}>
      <VStack gap={7.5} mb={3}>
        <OtpInput
          value={otpCode}
          onChange={val => setOtp(val)}
          numInputs={6}
          inputStyle={{
            width: 45,
            backgroundColor: colors.forminput,
            color: colors.light_gray,
            padding: "14px",
            border: "none",
            height: "45px",
          }}
          renderSeparator={index => (
            <span style={{ margin: "7px" }}>{index % 2 ? "-" : ""}</span>
          )}
          inputType="tel"
          renderInput={props => <Input {...props} />}
        />
      </VStack>

      <p
        style={{
          textAlign: "right",
          marginBottom: "48px",
          color: colors.black_30,
          display: "flex",
          marginTop: "20px",
          fontSize: "14px",
          justifyContent: "end",
        }}
      >
        Didnt receive the code?
        <p
          onClick={() => onSubmit()}
          style={{
            color: colors.blue_100,
            marginLeft: "5px",
            marginRight: "22px",
            cursor: "pointer",
          }}
        >
          Resend
        </p>
      </p>

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

      <HStack mt={12} justifyContent="center">
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
    </form>
  );
};

export default OtpForm;
