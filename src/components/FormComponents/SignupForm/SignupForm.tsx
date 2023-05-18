import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@nepMeds/components/Form/Input";
import OtpSignUp from "@nepMeds/pages/SignUp/OtpSignup";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Message } from "react-iconly";
import { Link } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is required!"),
});

const SignupForm = () => {
  const [enableOTP, setEnableOTP] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    setEnableOTP(true);
  };

  if (enableOTP) {
    return <OtpSignUp />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <VStack gap={7.5} mb={12}>
        <Input
          name="email"
          register={register}
          type="emali"
          startIcon={
            <Icon as={Message} fontSize={20} color={colors.black_40} />
          }
          border="none"
          backgroundColor={colors.forminput}
          placeholder="Email Address/ Mobile No."
          _placeholder={{ color: colors.light_gray }}
          error={errors.email?.message}
        />
      </VStack>

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
        >
          Sign Up
        </Button>
      </HStack>
    </form>
  );
};

export default SignupForm;
