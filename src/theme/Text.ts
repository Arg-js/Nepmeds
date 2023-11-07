import { defineStyleConfig } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

const baseStyles = {
  fontSize: "md",
  fontWeight: "500",
  color: colors.black_60,
  fontFamily: "Inter",
  mb: 3,
};

const tableHeading = {
  ...baseStyles,
};

export const TextTheme = defineStyleConfig({
  variants: {
    tableHeading,
  },
});
