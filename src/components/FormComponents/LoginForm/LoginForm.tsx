import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Input from "@nepMeds/components/Form/Input";
import { useLoginMutation } from "@nepMeds/service/nepmeds-auth";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Hide, Lock, Message, Show } from "react-iconly";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginAction = useLoginMutation();

  const togglepasswordView = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async ({
    email,
    password,
  }) => {
    loginAction.mutate({ email, password });
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={7.5} mb={3}>
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
        />
        <Input
          name="password"
          register={register}
          type={showPassword ? "password" : "text"}
          startIcon={<Icon as={Lock} fontSize={20} color={colors.black_40} />}
          endIcons={
            <Icon
              as={showPassword ? Hide : Show}
              fontSize={20}
              onClick={togglepasswordView}
              cursor="pointer"
            />
          }
          backgroundColor={colors.forminput}
          border="none"
          placeholder="Password"
          _placeholder={{ color: colors.light_gray }}
        />
      </VStack>

      <Link
        to="/"
        style={{
          color: colors.blue_100,
          display: "block",
          textAlign: "right",
          marginBottom: "48px",
          fontSize: "14px",
        }}
      >
        Recover Password
      </Link>

      <Text textAlign="center" fontSize={14} color={colors.black_30}>
        Don’t have an account?
        <Link
          to="/signup"
          style={{
            color: colors.blue_100,
            marginLeft: "5px",
          }}
        >
          Sign Up
        </Link>
      </Text>

      <HStack mt={12} justifyContent="center">
        <Button
          backgroundColor={colors.primary}
          textColor={colors.white}
          type="submit"
        >
          Login
        </Button>
      </HStack>
    </form>
  );
};

export default LoginForm;
