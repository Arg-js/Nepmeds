import { SkeletonProps, SkeletonTextProps } from "@chakra-ui/react";
import Skeleton from "./Skeleton";
import SkeletonText from "./SkeletonText";

interface ISkeletonProps extends SkeletonProps, SkeletonTextProps {
  length?: number;
  variant: string;
}

function SkeletonControl(props: ISkeletonProps) {
  const { variant, ...rest } = props;
  switch (variant) {
    case "skeleton":
      return <Skeleton {...rest} />;
    case "skeletonText":
      return <SkeletonText {...rest} />;
    default:
      return null;
  }
}

export default SkeletonControl;
