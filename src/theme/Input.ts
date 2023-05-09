import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const Input = {};
const lg = defineStyle({
  fontSize: "14px",
  height: 51,
});

const sizes = {
  lg: definePartsStyle({ field: lg, addon: lg }),
};

export const inputTheme = defineMultiStyleConfig({ sizes });
