import { ComponentStyleConfig } from "@chakra-ui/react";

const p = {
  px: 4,
  py: 4,
};

export const ButtonTheme: ComponentStyleConfig = {
  baseStyle: {
    w: 180,
    minH: 14.5,
    ...p,
  },
  sizes: {
    sm: { ...p },
    md: { ...p },
    lg: { ...p },
    xl: { ...p },
    "2xl": { ...p },
  },
};
