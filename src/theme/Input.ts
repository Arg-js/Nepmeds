import { ComponentStyleConfig } from "@chakra-ui/react";
import { colors } from "./colors";

const pl = 13;
export const InputTheme: ComponentStyleConfig = {
  baseStyle: {
    field: { fontSize: 14, minHeight: 13 },
    element: {
      minHeight: 11,
      "&.chakra-input__left-element": { width: "auto", ml: 4 },
    },
  },
  sizes: {
    sm: { field: { pl } },
    md: { field: { pl } },
    lg: { field: { pl } },
    xl: { field: { pl } },
    "2xl": { field: { pl } },
  },
  variants: {
    floating: {
      field: {
        pl: 4,
        _focusWithin: {
          borderColor: colors.primary,
          boxShadow: `0 0 0 1px ${colors.primary}`,
        },
      },
    },
  },
};
