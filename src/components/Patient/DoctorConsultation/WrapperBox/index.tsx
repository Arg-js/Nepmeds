import { Box } from "@chakra-ui/layout";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { colors } from "@nepMeds/theme/colors";

interface IWrapperBox {
  children?: ReactJSXElement;
  backgroundColor?: string;
  height?: string;
}
const WrapperBox: React.FC<IWrapperBox> = ({
  children,
  backgroundColor = colors.background_blue,
  height = "auto",
}) => {
  return (
    <Box
      height={height}
      bg={backgroundColor}
      fontFamily={"Quicksand"}
      p={15}
      px={30}
    >
      {children}
    </Box>
  );
};

export default WrapperBox;
