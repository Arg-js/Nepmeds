import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { HStack, VStack } from "@chakra-ui/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Message } from "react-iconly";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import Input from "@nepMeds/components/Form/Input";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useGenerateForgetPasswordLink } from "@nepMeds/service/nepmeds-forgot-password";
import { colors } from "@nepMeds/theme/colors";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";

const schema = yup.object().shape({
  email: yup.string().required("Mobile number or email is required!"),
});

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const forgotPasswordAction = useGenerateForgetPasswordLink();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async () => {
    try {
      await forgotPasswordAction.mutateAsync({ email: getValues("email") });
      toastSuccess("Reset password link has been sent to your email!");
      navigate(NAVIGATION_ROUTES.DOCTOR_LOGIN);
    } catch {
      toastFail("Failed to send reset password link!");
    }
  };

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
