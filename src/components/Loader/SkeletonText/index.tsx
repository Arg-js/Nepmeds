import { SkeletonText as ChakraSkeletonText } from "@chakra-ui/react";
import { ISkeletonText } from "..";

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
