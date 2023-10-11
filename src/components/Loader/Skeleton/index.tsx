import { Skeleton as ChakraSkeleton } from "@chakra-ui/react";
import { ISkeleton } from "..";

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
