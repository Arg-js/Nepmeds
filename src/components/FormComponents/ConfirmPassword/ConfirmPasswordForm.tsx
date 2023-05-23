import { Button, HStack, Icon, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Hide, Lock, Show } from "react-iconly";

import { colors } from "@nepMeds/theme/colors";
import Input from "@nepMeds/components/Form/Input";

const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Password is required"),
});

const ConformPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
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
  const onSubmit = () => {
    alert("done");
  };
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
          //   isLoading={loginAction.isLoading}
        >
          Create Password
        </Button>
      </HStack>
    </form>
  );
};

export default ConformPasswordForm;
