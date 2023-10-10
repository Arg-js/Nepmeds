import { Flex, Skeleton as ChakraSkeleton, Divider } from "@chakra-ui/react";
import Skeleton from "@nepMeds/components/Skeleton";
import SkeletonText from "@nepMeds/components/Table/Doctor/ndex";

const ViewModalSkeleton = () => {
  return (
    <Flex gap={4} direction={"column"}>
      <Flex>
        {Array.from({ length: 2 }, (_, i) => (
          <Flex flex={1} gap={4} direction={"column"} key={i}>
            {Array.from({ length: 2 }, (_, i) => (
              <ChakraSkeleton
                height={"8px"}
                width={i ? "80%" : "50%"}
                key={i}
              />
            ))}
          </Flex>
        ))}
      </Flex>
      <Divider />
      <Flex gap={4} direction={"column"}>
        <Skeleton height={"8px"} width={"30%"} />
        <Flex gap={2}>
          <Skeleton height={"8px"} width={"10%"} length={5} />
        </Flex>
      </Flex>
      <Divider />
      <Flex gap={4} direction={"column"}>
        <Skeleton height={"8px"} width={"30%"} />
        <SkeletonText noOfLines={4} />
      </Flex>
    </Flex>
  );
};

export default ViewModalSkeleton;
