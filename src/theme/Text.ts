import { defineStyleConfig } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

const baseStyles = {
  fontSize: "md",
  fontWeight: "500",
  color: colors.black_60,
  fontFamily: "Inter",
  mb: 3,
};

const small600 = {
  fontSize: "sm",
  fontWeight: "600",
  color: colors.dark_blue,
  fontFamily: "Inter",
};

const md600 = {
  ...small600,
  fontSize: "md",
};

const sm400 = {
  fontSize: "sm",
  fontWeight: "400",
};

const lg600 = {
  fontSize: "lg",
  fontWeight: "600",
};

const md500 = {
  fontSize: "md",
  fontWeight: "500",
};
const tableHeading = {
  ...baseStyles,
};

export const TextTheme = defineStyleConfig({
  variants: {
    tableHeading,
    sm400,
    small600,
    md500,
    md600,
    lg600,
  },
});
