import { SkeletonProps, SkeletonTextProps } from "@chakra-ui/react";
import Skeleton from "./Skeleton";
import SkeletonText from "./SkeletonText";
export interface LengthProp {
  length?: number;
}

export interface ISkeleton extends SkeletonProps, LengthProp {}
export interface ISkeletonText extends SkeletonTextProps, LengthProp {}

interface ISkeletonProps extends ISkeleton {
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
