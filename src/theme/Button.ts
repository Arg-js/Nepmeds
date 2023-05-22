import { ComponentStyleConfig } from "@chakra-ui/react";

const p = {
  px: 4,
  py: 4,
};

export const ButtonTheme: ComponentStyleConfig = {
  baseStyle: {
    // minH: 14.5,
  },
  sizes: {},
  variants: { register: { ...p, w: 180, minH: 14.5 } },
};
