import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { HStack, VStack } from "@chakra-ui/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Message } from "react-iconly";
import * as yup from "yup";

import Input from "@nepMeds/components/Form/Input";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import OtpSignUp from "@nepMeds/pages/SignUp/OtpSignup";
import { useGenerateForgetPasswordOTP } from "@nepMeds/service/nepmeds-forgot-password";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";

const schema = yup.object().shape({
  email_or_mobile_number: yup
    .string()
    .required("Email Address/ Mobile No. is required!"),
});

const ForgotPasswordForm = () => {
  const forgotPasswordAction = useGenerateForgetPasswordOTP();
  const [enableOTP, setEnableOTP] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email_or_mobile_number: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async () => {
    try {
      await forgotPasswordAction.mutateAsync({
        email_or_mobile_number: getValues("email_or_mobile_number"),
      });
      toastSuccess("Reset password OTP has been sent!");
      setEnableOTP(true);
    } catch (error) {
      const err = serverErrorResponse(error);

      toastFail(err);
    }
  };

  if (enableOTP) {
    return (
      <OtpSignUp
        isResetPassword={true}
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
          startIcon={
            <Icon as={Message} fontSize={20} color={colors.black_40} />
          }
          border="none"
          backgroundColor={colors.forminput}
          placeholder="Email Address/ Mobile No."
          _placeholder={{ color: colors.light_gray }}
          error={errors.email_or_mobile_number?.message}
        />
      </VStack>
      <HStack mt={12} justifyContent="center">
        <Button
          backgroundColor={colors.primary}
          textColor={colors.white}
          type="submit"
          isLoading={forgotPasswordAction.isLoading}
        >
          Submit
        </Button>
      </HStack>
    </form>
  );
};

export default ForgotPasswordForm;
