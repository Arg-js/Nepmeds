import Input from "@nepMeds/components/Form/Input";
import { useForm } from "react-hook-form";
import { Button, Icon } from "@chakra-ui/react";
import { Message, Lock, Hide, Show } from "react-iconly";
import { colors } from "@nepMeds/theme/colors";
import { Link } from "react-router-dom";
import { useState } from "react";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const togglepasswordView = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form style={{ width: "100%" }}>
      <Input
        name="email"
        register={register}
        type="emali"
        startIcon={<Icon as={Message} fontSize={20} color={colors.black_40} />}
        px={4}
        py={6}
        border="none"
        backgroundColor={colors.forminput}
        mb={6}
        placeholder="Email Address/ Mobile No."
        _placeholder={{ color: colors.light_gray }}
      />
      <Input
        name="password"
        register={register}
        type={showPassword ? "password" : "text"}
        startIcon={<Icon as={Lock} fontSize={20} color={colors.black_40} />}
        endIcons={
          showPassword ? (
            <Icon
              as={Hide}
              fontSize={20}
              onClick={togglepasswordView}
              cursor="pointer"
            />
          ) : (
            <Icon
              as={Show}
              fontSize={20}
              onClick={togglepasswordView}
              cursor="pointer"
            />
          )
        }
        px={4}
        py={6}
        backgroundColor={colors.forminput}
        border="none"
        placeholder="Password"
        mb={3}
        _placeholder={{ color: colors.light_gray }}
      />
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
      <Button
        margin="0 auto"
        mt={12}
        backgroundColor={colors.primary}
        textColor={colors.white}
        type="submit"
        display="flex"
        borderRadius="12px"
        w="50%"
        p={7}
        fontSize={20}
        fontWeight={400}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
