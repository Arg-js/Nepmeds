import { Grid, GridItem, Flex } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@nepMeds/components/Loader";

const DoctorCardSkeleton = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" mt={4}>
      <GridItem colSpan={2}>
        <Skeleton height="176px" />
      </GridItem>
      <GridItem colSpan={3} m={4}>
        <Grid templateColumns="repeat(2, 1fr)" gap={5}>
          <GridItem colSpan={2}>
            <SkeletonText />
          </GridItem>
          <GridItem colStart={1}>
            <Flex direction="column" gap={3}>
              <SkeletonText length={2} />
            </Flex>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default DoctorCardSkeleton;
