import { extendTheme } from "@chakra-ui/react";
import { inputTheme } from "./Input";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "'Inter', sans-serif",
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
