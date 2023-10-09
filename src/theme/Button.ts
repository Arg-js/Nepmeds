import {
  ComponentStyleConfig,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/react";
import { colors } from "./colors";

const baseStyles = {
  px: 7,
  height: "48px",
  borderRadius: "12px",
  fontFamily: "Quicksand",
  fontSize: "14px",
  fontWeight: 400,
  width: "auto",
  transition: "all 300ms ease-in-out",
};

const primaryHoverState = {
  bg: colors.primary,
  color: colors.white,
};

const primary = defineStyle({
  ...baseStyles,
  ...primaryHoverState,
  _hover: {
    bg: colors.primary_blue,
    "&:disabled": {
      ...primaryHoverState,
    },
  },
});

const secondary = defineStyle({
  ...baseStyles,
  color: colors.white,
  bg: `${colors.primary_blue}`,
  _hover: {
    bg: colors.primary,
  },
});

const primaryOutline = defineStyle({
  ...baseStyles,
  color: colors.primary,
  bg: "transparent",
  // TODO
  // borderRadius: "3px",
  border: `1px solid ${colors.primary}`,
  _hover: {
    bg: colors.sky_blue,
  },
});

const primaryOutlineFilled = defineStyle({
  ...primaryOutline,
  bg: colors.blue_10,
  _hover: primaryHoverState,
});

const outline = defineStyle({
  ...baseStyles,
  fontFamily: "Poppins",

  color: colors.black_50,
  border: `1px solid ${colors.black_50}`,
  height: "40px",
  borderRadius: "6",
  bg: "transparent",
});

const reset = defineStyle({
  ...baseStyles,
  bg: colors.reset,
  color: colors.white,
  _hover: {
    bg: colors.resetHover,
    color: colors.reset,
  },
});

const round = defineStyle({
  ...baseStyles,
  px: 0,
  fontSize: { base: "20px", md: "22px" },
  borderRadius: "50%",
  minWidth: "30px",
  width: { base: "30px", md: "40px" },
  height: { base: "30px", md: "40px" },
  lineHeight: "40px",
  _hover: primaryHoverState,
});

export const ButtonTheme: ComponentStyleConfig = defineStyleConfig({
  variants: {
    primary,
    secondary,
    primaryOutline,
    primaryOutlineFilled,
    outline,
    reset,
    round,
  },
  sizes: {
    sm: {
      height: "44px",
    },
    md: {
      height: "48px",
    },
  },
  defaultProps: {
    size: "md",
    variant: "primary",
  },
});
