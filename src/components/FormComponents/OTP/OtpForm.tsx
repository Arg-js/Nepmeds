import Input from "@nepMeds/components/Form/Input";
import { useForm } from "react-hook-form";
import { Button, Icon } from "@chakra-ui/react";
import { Message } from "react-iconly";
import { colors } from "@nepMeds/theme/colors";
import { Link } from "react-router-dom";
const OtpForm = () => {
  const { register, handleSubmit } = useForm();

  return (
    <form
      //   onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%" }}
    >
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
        _placeholder={{ color: colors.placeholder }}
      />
      <p
        style={{
          textAlign: "right",
          marginBottom: "48px",
          color: colors.black_30,
        }}
      >
        Didnt recieve the code?
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
      <p style={{ textAlign: "center", color: colors.black_30 }}>
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
        Verify
      </Button>
    </form>
  );
};

export default OtpForm;
