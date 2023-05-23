import { HStack, VStack } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Message } from "react-iconly";
import { useNavigate } from "react-router-dom";

import { colors } from "@nepMeds/theme/colors";
import Input from "@nepMeds/components/Form/Input";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";

const schema = yup.object().shape({
  email: yup.string().email("Please enter a valid email"),
});

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = () => {
    // try {
    //   singUpAction.mutateAsync({ mobile_number: email });
    //   setEnableOTP(true);
    //   toastSuccess("Forgot password link has been sent to your email!");
    // } catch (error) {
    //   toastFail("Failed to sign up!");
    // }
    try {
      toastSuccess("Forgot password link has been sent to your email!");
      navigate("/");
    } catch {
      toastFail("Failed to sign up!");
    }
  };

  // if (enableOTP) {
  //   return <OtpSignUp otpText={otpText} />;
  // }
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
        />
      </VStack>
      <HStack mt={12} justifyContent="center">
        <Button
          backgroundColor={colors.primary}
          textColor={colors.white}
          type="submit"
        >
          Submit
        </Button>
      </HStack>
    </form>
  );
};

export default ForgotPasswordForm;
