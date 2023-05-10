import { extendTheme } from "@chakra-ui/react";
import { inputTheme } from "./Input";
import { colors } from "./colors";

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
    },
  },
  components: {
    Input: inputTheme,
  },
});
