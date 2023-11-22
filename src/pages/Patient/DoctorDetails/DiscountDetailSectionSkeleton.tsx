import { Grid, GridItem, Divider } from "@chakra-ui/react";
import SkeletonControl from "@nepMeds/components/Loader";

const DiscountDetailSkeleton = () => {
  return (
    <>
      <SkeletonControl variant={"skeleton"} height={"30px"} mb={5} />
      <Grid templateColumns={"repeat(2, 1fr)"} gap={3}>
        <GridItem>
          <SkeletonControl
            variant={"skeleton"}
            length={3}
            height={"10px"}
            width={"75%"}
            mb={5}
          />
        </GridItem>
        <GridItem>
          <SkeletonControl
            variant={"skeleton"}
            length={3}
            height={"10px"}
            mb={5}
          />
        </GridItem>
        <Divider />
      </Grid>
    </>
  );
};

export default DiscountDetailSkeleton;
