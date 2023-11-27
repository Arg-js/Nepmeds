import { defineStyleConfig } from "@chakra-ui/react";

const baseStyles = {
  container: {
    m: 1,
    textAlign: "center",
  },
};

const outline = {
  ...baseStyles,
};

// TODO: add another variant with theme
const red = {
  colorScheme: "red",
};

export const TagTheme = defineStyleConfig({
  variants: {
    outline,
    red,
  },
  defaultProps: {
    variant: "outline",
    colorScheme: "blue",
  },
});
