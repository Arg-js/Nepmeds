import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useVerifySingUpOTP } from "@nepMeds/service/nepmeds-register";
import { colors } from "@nepMeds/theme/colors";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  otp: yup
    .string()
    .min(6, "OTP should be if min 6 length!")
    .required("OTP is required!"),
});

const OtpForm = () => {
  const navigate = useNavigate();
  const { getValues, setValue, handleSubmit } = useForm({
    defaultValues: {
      otp: "",
    },
    resolver: yupResolver(schema),
  });

  const verifySingUpOTPAction = useVerifySingUpOTP();

  const onFormSubmit = ({ otp }: { otp: string }) => {
    try {
      verifySingUpOTPAction.mutateAsync({ otp });
      toastSuccess("OTP has been verified successfully!");
      navigate("/register");
    } catch (error) {
      toastFail("Failed to verify OTP!");
    }
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onFormSubmit)}>
      <VStack gap={7.5} mb={3}>
        <OtpInput
          value={getValues("otp")}
          onChange={val => setValue("otp", val)}
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
          isDisabled={getValues("otp").length !== 6}
        >
          Verify
        </Button>
      </HStack>
    </form>
  );
};

export default OtpForm;
