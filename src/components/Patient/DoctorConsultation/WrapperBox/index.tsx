import { Box } from "@chakra-ui/layout";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface IWrapperBox {
  children?: ReactJSXElement;
  backgroundColor?: string;
  backgroundImage?: string;
  height?: string;
  paddingX?: string;
  padding?: string;
  width?: string;
  borderColor?: string;
  border?: string;
}
const WrapperBox: React.FC<IWrapperBox> = ({
  children,
  backgroundColor = "none",
  backgroundImage = "none",
  height = "auto",
  padding = "10",
  paddingX = "30",
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
      px={paddingX}
      width={width}
      border={border}
    >
      {children}
    </Box>
  );
};

export default WrapperBox;
