import { Box } from "@chakra-ui/layout";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface IWrapperBox {
  children?: ReactJSXElement;
  backgroundColor?: string;
  backgroundImage?: string;
  height?: string;
  padding?: string;
  width?: string;
  borderColor?: string;
  border?: string;
  borderRadius?: string;
  boxShadow?: string;
  style?: Record<string, any>;
}
const WrapperBox: React.FC<IWrapperBox> = ({
  children,
  backgroundColor = "none",
  backgroundImage = "none",
  height = "auto",
  padding = "10",
  width = "auto",
  border = "none",
}) => {
  return (
    <Box
      height={height}
      bg={backgroundColor}
      fontFamily={"Quicksand"}
      backgroundImage={backgroundImage}
      p={padding}
      px={{ base: "10px", md: "30" }}
      width={width}
      border={border}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      sx={style}
    >
      {children}
    </Box>
  );
};

export default WrapperBox;
