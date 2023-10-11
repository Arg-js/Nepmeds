import { Skeleton as ChakraSkeleton } from "@chakra-ui/react";
import { ISkeleton } from "..";

const Skeleton = ({ length = 1, ...rest }: ISkeleton) => {
  return (
    <>
      {Array.from({ length }, (_, i) => (
        <ChakraSkeleton key={i} {...rest} />
      ))}
    </>
  );
};

export default Skeleton;
