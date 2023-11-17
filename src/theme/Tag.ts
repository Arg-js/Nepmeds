import { defineStyleConfig } from "@chakra-ui/react";

const baseStyles = {
  container: {
    m: 1,
  },
};

const outline = {
  ...baseStyles,
};

export const TagTheme = defineStyleConfig({
  variants: {
    outline,
  },
  defaultProps: {
    variant: "outline",
    colorScheme: "blue",
  },
});
