import { Box } from "@chakra-ui/layout";
import { BoxProps } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

interface IWrapperBox extends BoxProps {
  children?: React.ReactNode;
  style?: Record<string, any>;
}
const WrapperBox: React.FC<IWrapperBox> = ({ children, style, ...rest }) => {
  return (
    <Box
      backgroundColor={colors.white}
      backgroundImage="none"
      height="auto"
      padding="4"
      width="auto"
      border="none"
      boxShadow="none"
      fontFamily="Quicksand"
      px={{ base: "20px", md: "15", xl: "15", "2xl": "60" }}
      sx={style}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default WrapperBox;
