import { ComponentStyleConfig } from "@chakra-ui/react";
import { colors } from "./colors";

export const InputTheme: ComponentStyleConfig = {
  baseStyle: {
    field: { fontSize: 14 },
    element: {
      minHeight: 11,
      "&.chakra-input__left-element": { width: "auto", ml: 4 },
    },
  },
  variants: {
    floating: {
      field: {
        _focusWithin: {
          borderColor: colors.primary,
          boxShadow: `0 0 0 1px ${colors.primary}`,
        },
      },
    },
    register: { field: { minHeight: 13 } },
  },
};
