import { ReactSVG } from "react-svg";
import { svgs } from "@nepMeds/assets/svgs";
import { createStyles } from "./icon.styles";
import { Box } from "@chakra-ui/react";

/**
 * Component to render Icon
 * @param size (optional) : {width:number, height:number};
 * @param color (optional) : {color:string,type:string};
 * @param name : string;
 * @param {string} url
 * @param customStyles (optional) : styles to override the svg style
 * @returns JSX Element
 */
const Icon = ({
  name,
  color: { color, type } = {},
  onClick,
  size: { width, height } = {},
  ...rest
}: IIcon) => {
  const styles = createStyles(width, height, color, type);

  return (
    <Box sx={styles.wrapper}>
      <ReactSVG
        onClick={onClick}
        src={svgs[name].toString() ?? ""}
        loading={() => <p>loading</p>}
        fallback={() => <p>loading</p>}
        {...rest}
      />
    </Box>
  );
};

type COLORTYPE = "fill" | "stroke";

interface IIcon {
  size?: {
    height?: number | string;
    width?: number | string;
  };
  color?: {
    color?: string;
    type?: COLORTYPE;
  };
  name: keyof typeof svgs;
  customStyles?: any;
  onClick?: () => void;
}

export default Icon;
