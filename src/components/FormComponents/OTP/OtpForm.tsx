import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useVerifySingUpOTP } from "@nepMeds/service/nepmeds-register";
import { colors } from "@nepMeds/theme/colors";
import { FormEvent, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";

const OtpForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const verifySingUpOTPAction = useVerifySingUpOTP();

  const onFormSubmit = (e: FormEvent) => {
    try {
      e.preventDefault();
      verifySingUpOTPAction.mutateAsync({ otp });
      toastSuccess("OTP has been verified successfully!");
      navigate("/register");
    } catch (error) {
      toastFail("Failed to verify OTP!");
    }
  };

  return (
    <form style={{ width: "100%" }} onSubmit={onFormSubmit}>
      <VStack gap={7.5} mb={3}>
        <OtpInput
          value={otp}
          onChange={val => setOtp(val)}
          numInputs={6}
          inputStyle={{
            width: 41,
            backgroundColor: colors.forminput,
            color: colors.light_gray,
            padding: "12px",
            border: "none",
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
          marginTop: "15px",
          fontSize: "14px",
        }}
      >
        Didnt receive the code?
        <Link
          to="/"
          style={{
            color: colors.blue_100,
            marginLeft: "5px",
          }}
        >
          Resend
        </Link>
      </p>

      <Text textAlign="center" fontSize={14} color={colors.black_30}>
        Already have an account?
        <Link
          to="/login"
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
          isDisabled={otp.length !== 6}
        >
          Verify
        </Button>
      </HStack>
    </form>
  );
};

export default OtpForm;
