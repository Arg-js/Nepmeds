import { Box } from "@chakra-ui/layout";
import { BoxProps } from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { colors } from "@nepMeds/theme/colors";

interface IWrapperBox extends BoxProps {
  children?: ReactJSXElement;
  style?: Record<string, any>;
}
const WrapperBox: React.FC<IWrapperBox> = ({ children, style, ...rest }) => {
  const sx = {
    backgroundColor: colors.white,
    backgroundImage: "none",
    height: "auto",
    padding: "4",
    width: "auto",
    border: "none",
    boxShadow: "none",
    fontFamily: "Quicksand",
  };
  return (
    <Box
      px={{ base: "10px", md: "15", xl: "15", "2xl": "20" }}
      sx={{ ...sx, ...style }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default WrapperBox;
