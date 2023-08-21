import { Button, HStack, Icon, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Hide, Lock, Show } from "react-iconly";

import Input from "@nepMeds/components/Form/Input";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useResetPasswordMutation } from "@nepMeds/service/nepmeds-forgot-password";
import { colors } from "@nepMeds/theme/colors";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ConformPasswordForm = () => {
  const resetPasswordAction = useResetPasswordMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { mobile, otp } = location.state as { mobile: string; otp: string };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_password: "",
      confirm_new_password: "",
    },
  });

  const togglepasswordView = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordView = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async () => {
    try {
      await resetPasswordAction.mutateAsync({
        otp,
        email_or_mobile_number: mobile,
        new_password: getValues("new_password"),
        confirm_new_password: getValues("confirm_new_password"),
      });
      toastSuccess("New password saved successfully!");
      navigate("/login");
    } catch (error) {
      toastFail("Failed to update password!");
    }
  };

  const validateConfirmPassword = (value: string) => {
    const password = getValues("new_password");
    return value === password || "Passwords do not match.";
  };

  if (!mobile && !otp) {
    return <Navigate to={NAVIGATION_ROUTES.LOGIN} replace />;
  }

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={7.5} mb={3}>
        <Input
          name="new_password"
          register={register}
          type={showPassword ? "text" : "password"}
          startIcon={<Icon as={Lock} fontSize={20} color={colors.black_40} />}
          endIcons={
            <Icon
              as={showPassword ? Show : Hide}
              fontSize={20}
              onClick={togglepasswordView}
              cursor="pointer"
            />
          }
          backgroundColor={colors.forminput}
          border="none"
          placeholder="New Password"
          _placeholder={{ color: colors.light_gray }}
          rules={{
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
          }}
          error={errors?.new_password?.message}
        />
        {errors?.new_password?.message}
        <Input
          name="confirm_new_password"
          register={register}
          type={showConfirmPassword ? "text" : "password"}
          startIcon={<Icon as={Lock} fontSize={20} color={colors.black_40} />}
          endIcons={
            <Icon
              as={showConfirmPassword ? Show : Hide}
              fontSize={20}
              onClick={toggleConfirmPasswordView}
              cursor="pointer"
            />
          }
          rules={{
            required: "Confirm password is required.",
            validate: validateConfirmPassword,
          }}
          backgroundColor={colors.forminput}
          border="none"
          placeholder="Confirm Password"
          _placeholder={{ color: colors.light_gray }}
          error={errors?.confirm_new_password?.message}
        />
      </VStack>
      <HStack mt={12} justifyContent="center">
        <Button
          backgroundColor={colors.primary}
          textColor={colors.white}
          type="submit"
          isLoading={resetPasswordAction.isLoading}
        >
          Update Password
        </Button>
      </HStack>
    </form>
  );
};

export default ConformPasswordForm;
