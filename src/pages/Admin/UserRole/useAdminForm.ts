import { useState } from "react";
import { useForm } from "react-hook-form";
const defaultValues = {
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  mobile_number: "",
  password: "",
  confirm_password: "",
  gender: "",
  date_of_birth: "",
};

const passwordDefaultValues = {
  password: "",
  confirm_password: "",
};

const useAdminForm = () => {
  const formMethods = useForm({
    defaultValues,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setConfirmpasswordVisible] = useState(false);

  const passwordFormMethods = useForm({
    defaultValues: passwordDefaultValues,
  });

  const validateConfirmPassword = (password: string, confirm: string) => {
    return password === confirm || "Passwords do not match.";
  };

  return {
    formMethods,
    passwordFormMethods,
    validateConfirmPassword,
    passwordVisible,
    setPasswordVisible,
    confirmpasswordVisible,
    setConfirmpasswordVisible,
  };
};

export default useAdminForm;
