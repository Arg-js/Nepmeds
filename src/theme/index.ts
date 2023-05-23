import { extendTheme } from "@chakra-ui/react";
import { ButtonTheme } from "./Button";
import { InputTheme } from "./Input";
import { colors } from "./colors";

const space = {
  px: "1px",
  0.5: "2px",
  0.75: "3px",
  1: "4px",
  1.25: "5px",
  1.5: "6px",
  1.75: "7px",
  2: "8px",
  2.25: "9px",
  2.5: "10px",
  2.75: "11px",
  3: "12px",
  3.25: "13px",
  3.5: "14px",
  3.75: "15px",
  4: "16px",
  4.25: "17px",
  4.5: "18px",
  4.75: "19px",
  5: "20px",
  6: "24px",
  7: "28px",
  7.5: "30px",
  8: "32px",
  9: "36px",
  10: "40px",
  12: "48px",
  13: "52px",
  13.5: "54px",
  14: "56px",
  14.5: "58px",
  15: "60px",
  16: "64px",
  20: "80px",
  24: "96px",
  28: "112px",
  30: "120px",
  32: "128px",
  36: "144px",
  40: "160px",
  44: "176px",
  48: "192px",
  52: "208px",
  56: "224px",
  60: "240px",
  64: "256px",
  67.5: "270px",
  68: "272px",
  72: "288px",
  80: "320px",
  96: "384px",
};

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 400,
        backgroundColor: colors.background,
      },
      a: {
        _hover: {
          textDecoration: "none !important",
          outline: "none !important",
          border: "0px !important",
        },
      },
      ".chakra-step__separator": {
        border: `1px dashed ${colors.white}`,
      },
      "div.chakra-modal__content-container": {
        alignItems: "center",
      },
      tr: {
        height: "48px",
      },
      "tr:nth-of-type(even)": {
        background: colors.blue_10,
      },
    },
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px",
    "7xl": "72px",
    "8xl": "96px",
    "9xl": "128px",
  },
  space: {
    ...space,
  },
  sizes: {
    ...space,
    // max: "max-content",
    // min: "min-content",
    // full: "100%",
    // "3xs": "56px",
    // "2xs": "64px",
    // xs: "80px",
    // sm: "96px",
    // md: "112px",
    // lg: "128px",
    // xl: "144px",
    // "2xl": "168px",
    // "3xl": "192px",
    // "4xl": "224px",
    // "5xl": "256px",
    // "6xl": "288px",
    // "7xl": "320px",
    // "8xl": "360px",
    // container: {
    //   sm: "640px",
    //   md: "768px",
    //   lg: "1024px",
    //   xl: "1280px",
    // },
  },
  components: {
    Input: InputTheme,
    Form: {
      variants: {
        floating: {
          container: {
            // _focusWithin: {
            //   label: {
            //     ...activeLabelStyles,
            //   },
            // },

            // "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, .chakra-form-control label, textarea:not(:placeholder-shown) ~ label":
            //   {
            //     ...activeLabelStyles,
            //   },
            label: {
              top: "10px",
              transform: "scale(0.8) translateY(-19px)",
              left: 0,
              zIndex: 1,
              position: "absolute",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
    Button: ButtonTheme,
  },
});
