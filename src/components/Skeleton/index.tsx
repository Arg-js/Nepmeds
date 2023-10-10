import { Skeleton as ChakraSkeleton, SkeletonProps } from "@chakra-ui/react";

interface ISkeleton extends SkeletonProps {
  length?: number;
}

const Skeleton: React.FC<ISkeleton> = ({ length = 1, ...rest }) => {
  return (
    <>
      {Array.from({ length }, (_, i) => (
        <ChakraSkeleton key={i} {...rest} />
      ))}
    </>
  );
};

export default Skeleton;
