import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@nepMeds/components/Form/Input";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import OtpSignUp from "@nepMeds/pages/SignUp/OtpSignup";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useSignUpUser } from "@nepMeds/service/nepmeds-register";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Call } from "react-iconly";
import { Link } from "react-router-dom";
import * as yup from "yup";
const phoneRegExp = /^(?:\+977[-\s]?)?9[78]\d{8}$/;

const emailRegExp = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

const schema = yup.object().shape({
  email_or_mobile_number: yup
    .string()
    .required("Email Address/ Mobile No. is required!")
    .test(
      "is-email-or-phone",
      "Please enter a valid email or phone number",
      value => {
        const emailRegex = emailRegExp;
        const phoneRegex = phoneRegExp;
        return (
          value !== undefined &&
          (emailRegex.test(value) || phoneRegex.test(value))
        );
      }
    ),
});

const SignupForm = () => {
  const [enableOTP, setEnableOTP] = useState(false);
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email_or_mobile_number: "",
    },
    resolver: yupResolver(schema),
  });

  const singUpAction = useSignUpUser();

  const onSubmit = async ({
    email_or_mobile_number,
  }: {
    email_or_mobile_number: string;
  }) => {
    try {
      await singUpAction.mutateAsync({
        email_or_mobile_number: email_or_mobile_number,
      });
      setEnableOTP(true);
      toastSuccess("OTP sent successfully!");
    } catch (error) {
      const err = serverErrorResponse(error);

      toastFail(err);
    }
  };

  if (enableOTP) {
    return (
      <OtpSignUp
        isResetPassword={false}
        mobile={getValues("email_or_mobile_number")}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <VStack gap={7.5} mb={12}>
        <Input
          name="email_or_mobile_number"
          register={register}
          startIcon={<Icon as={Call} fontSize={20} color={colors.black_40} />}
          border="none"
          backgroundColor={colors.forminput}
          placeholder="Email Address/ Mobile No."
          _placeholder={{ color: colors.light_gray }}
          error={errors.email_or_mobile_number?.message}
        />
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

      <HStack mt={12} justifyContent="center">
        <Button
          type="submit"
          width="180px"
          fontSize={"xl"}
          isLoading={singUpAction.isLoading}
        >
          Sign Up
        </Button>
      </HStack>
    </form>
  );
};

export default SignupForm;
