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

const tableHeading = {
  ...baseStyles,
};

export const TextTheme = defineStyleConfig({
  variants: {
    tableHeading,
    small600,
    md600,
  },
});
