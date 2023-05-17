import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FormControlProps, IconButton } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { UseFormRegister } from "react-hook-form";
import FormControl from "./FormControl";

enum Type {
  TEXT = "type",
  PASSWORD = "password",
}

const PasswordViewIcon = ({ onToggle, isVisible }: ISetPasswordViewIcon) => {
  return (
    <IconButton
      aria-label="password"
      onClick={onToggle}
      icon={isVisible ? <ViewIcon /> : <ViewOffIcon />}
      sx={{
        bgColor: "transparent",
        "&:focus": { outline: "none" },
        color: colors.grey_50,
        "&:hover": {
          bgColor: "transparent",
          color: colors.grey_50,
        },
      }}
    />
  );
};

const Password = ({
  register,
  isVisible,
  error,
  onToggleVisibility,
  name,
  placeholder,
  ...rest
}: IPassword) => {
  return (
    <FormControl
      control="input"
      register={register}
      size="lg"
      type={isVisible ? Type.TEXT : Type.PASSWORD}
      name={name}
      placeholder={placeholder}
      error={error}
      required
      endIcons={
        <PasswordViewIcon onToggle={onToggleVisibility} isVisible={isVisible} />
      }
      {...rest}
    />
  );
};

interface ISetPasswordViewIcon {
  onToggle: () => void;
  isVisible: boolean;
}

export interface IPassword extends FormControlProps {
  register: UseFormRegister<any>;
  isVisible: boolean;
  error?: string;
  onToggleVisibility: () => void;
  name: string;
  placeholder?: string;
}

export default Password;
