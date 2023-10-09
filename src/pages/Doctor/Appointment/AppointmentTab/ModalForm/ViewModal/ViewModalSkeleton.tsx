import { Flex, Skeleton, Divider, SkeletonText } from "@chakra-ui/react";

const ViewModalSkeleton = () => {
  return (
    <Flex gap={4} direction={"column"}>
      <Flex>
        {Array.from({ length: 2 }, (_, i) => (
          <Flex flex={1} gap={4} direction={"column"} key={i}>
            {Array.from({ length: 2 }, (_, i) => (
              <Skeleton height={"8px"} width={i ? "80%" : "50%"} key={i} />
            ))}
          </Flex>
        ))}
      </Flex>
      <Divider />
      <Flex gap={4} direction={"column"}>
        <Skeleton height={"8px"} width={"30%"} />
        <Flex gap={2}>
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton height={"8px"} width={"10%"} key={i} />
          ))}
        </Flex>
      </Flex>
      <Divider />
      <Flex gap={4} direction={"column"}>
        <Skeleton height={"8px"} width={"30%"} />
        <SkeletonText noOfLines={4} spacing="4" skeletonHeight="2" />
      </Flex>
    </Flex>
  );
};

export default ViewModalSkeleton;
