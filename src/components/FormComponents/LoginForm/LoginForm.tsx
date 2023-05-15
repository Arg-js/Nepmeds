import { Button, HStack, Icon, VStack } from "@chakra-ui/react";
import Input from "@nepMeds/components/Form/Input";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Hide, Lock, Message, Show } from "react-iconly";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useForm();
  const togglepasswordView = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form style={{ width: "100%" }}>
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
      <p
        style={{
          textAlign: "center",
          color: colors.black_30,
          fontSize: "14px",
        }}
      >
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
      </p>

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
