export const createStyles = (
  width?: string | number,
  height?: string | number,
  color?: string,
  type?: "fill" | "stroke"
) => {
  return {
    wrapper: {
      svg: {
        height,
        width,
        path: {
          fill: type === "fill" && color,
          stroke: type === "stroke" && color,
          color,
        },
      },
    },
  };
};
