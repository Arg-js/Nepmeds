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

const primary = defineStyle({
  ...baseStyles,
  color: colors.white,
  bg: `${colors.primary}`,
  _hover: {
    bg: colors.primary_blue,
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
  // borderRadius: "3px",
  border: `1px solid ${colors.primary}`,
  _hover: {
    bg: colors.sky_blue,
  },
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
  fontSize: "22px",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  lineHeight: "40px",
  _hover: {
    bg: colors.primary,
    color: colors.white,
  },
});

export const ButtonTheme: ComponentStyleConfig = defineStyleConfig({
  variants: { primary, secondary, primaryOutline, outline, reset, round },
  // sizes: {
  //   lg: {
  //     width: "auto",
  //   },
  // },
  defaultProps: {
    // size: "lg",
    variant: "primary",
  },
});
