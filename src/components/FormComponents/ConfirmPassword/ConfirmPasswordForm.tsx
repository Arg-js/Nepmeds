import { Button, HStack, Icon, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Hide, Lock, Show } from "react-iconly";
import * as yup from "yup";

import Input from "@nepMeds/components/Form/Input";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useResetPasswordMutation } from "@nepMeds/service/nepmeds-forgot-password";
import { colors } from "@nepMeds/theme/colors";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Password is required"),
});

const ConformPasswordForm = () => {
  const { uidb64 = "", token = "" } = useParams<{
    uidb64: string;
    token: string;
  }>();
  const resetPasswordAction = useResetPasswordMutation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const togglepasswordView = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordView = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async () => {
    try {
      await resetPasswordAction
        .mutateAsync({
          token,
          uidb64,
          new_password: getValues("password"),
          confirm_new_password: getValues("confirmPassword"),
        })
        .then(() => {
          toastSuccess("New password saved successfully!");
          navigate("/login");
        })
        .catch(error => {
          {
            const err = error as AxiosError<{ message: string }>;
            toastFail(err?.response?.data?.message || "");
          }
        });
    } catch (error) {
      toastFail("Failed to update password!");
    }
  };

  if (!uidb64 && !token) {
    return <Navigate to={NAVIGATION_ROUTES.LOGIN} replace />;
  }

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={7.5} mb={3}>
        <Input
          name="password"
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
          placeholder="Password"
          _placeholder={{ color: colors.light_gray }}
          error={errors.password?.message}
        />
        <Input
          name="confirmPassword"
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
          backgroundColor={colors.forminput}
          border="none"
          placeholder="Password"
          _placeholder={{ color: colors.light_gray }}
          error={errors.password?.message}
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
