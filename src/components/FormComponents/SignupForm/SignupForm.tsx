import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@nepMeds/components/Form/Input";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import OtpSignUp from "@nepMeds/pages/SignUp/OtpSignup";
import { useSignUpUser } from "@nepMeds/service/nepmeds-register";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Call } from "react-iconly";
import { Link } from "react-router-dom";
import * as yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object().shape({
  mobile: yup
    .string()
    .required("Mobile number is required!")
    .matches(phoneRegExp, "Mobile number is not valid")
    .min(10, "Please enter a 10 digit mobile number")
    .max(10, "Please enter a 10 digit mobile number"),
});

const SignupForm = () => {
  const [otp, setOTP] = useState("");
  const [enableOTP, setEnableOTP] = useState(false);
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile: "",
    },
    resolver: yupResolver(schema),
  });

  const singUpAction = useSignUpUser();

  const onSubmit = async ({ mobile }: { mobile: string }) => {
    try {
      const { data: otpInfo } = await singUpAction.mutateAsync({
        mobile_number: mobile,
      });
      setEnableOTP(true);
      setOTP(typeof otpInfo.data === "string" ? otpInfo.data : "");
      toastSuccess("OTP code has been sent to your mobile!");
    } catch (error) {
      toastFail("Failed to send OTP code!");
    }
  };

  if (enableOTP) {
    return <OtpSignUp mobile={getValues("mobile")} otp={otp} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <VStack gap={7.5} mb={12}>
        <Input
          name="mobile"
          register={register}
          type="number"
          startIcon={<Icon as={Call} fontSize={20} color={colors.black_40} />}
          border="none"
          backgroundColor={colors.forminput}
          placeholder="Mobile No."
          _placeholder={{ color: colors.light_gray }}
          error={errors.mobile?.message}
        />
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

      <HStack mt={12} justifyContent="center">
        <Button
          backgroundColor={colors.primary}
          textColor={colors.white}
          type="submit"
          variant="register"
        >
          Sign Up
        </Button>
      </HStack>
    </form>
  );
};

export default SignupForm;
