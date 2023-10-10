import {
  SkeletonText as ChakraSkeletonText,
  SkeletonTextProps,
} from "@chakra-ui/react";
interface ISkeletonText extends SkeletonTextProps {
  length?: number;
}
const SkeletonText: React.FC<ISkeletonText> = ({ length = 1, ...rest }) => {
  return (
    <>
      {Array.from({ length }, (_, i) => (
        <ChakraSkeletonText
          key={i}
          skeletonHeight="2"
          noOfLines={2}
          spacing="4"
          {...rest}
        />
      ))}
    </>
  );
};

export default SkeletonText;
