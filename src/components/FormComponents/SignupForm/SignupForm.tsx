import Input from "@nepMeds/components/Form/Input";
import { useForm } from "react-hook-form";
import { Button, Icon } from "@chakra-ui/react";
import { Message } from "react-iconly";
import { colors } from "@nepMeds/theme/colors";
import { Link, useNavigate } from "react-router-dom";
const SignupForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (e: any) => {
    // e.preventDefault();
    navigate("/otp-verify");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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

      <p
        style={{
          textAlign: "center",
          color: colors.black_30,
          fontSize: "14px",
        }}
      >
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
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
