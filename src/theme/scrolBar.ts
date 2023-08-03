import { colors } from "./colors";

export const styleScroll = {
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: `${colors.light_gray}`,
    borderRadius: "24px",
  },
  overflowY: "scroll",
};
