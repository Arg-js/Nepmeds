import { extendTheme } from "@chakra-ui/react";
import { inputTheme } from "./Input";
import { colors } from "./colors";
const activeLabelStyles = {
  transform: "scale(0.8) translateY(-19px)",
  marginBottom: "5px",
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
    },
  },
  components: {
    Input: inputTheme,
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },

            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, .chakra-form-control label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: "10px",
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
  },
});
