import { Grid, GridItem, Divider } from "@chakra-ui/react";
import SkeletonControl from "@nepMeds/components/Loader";

const PatientPrescriptionSkeleton = () => {
  return (
    <Grid templateColumns={"repeat(4, 1fr)"} gap={6}>
      <SkeletonControl variant={"skeleton"} length={8} height={2} />
      <GridItem colSpan={4}>
        <Divider />
      </GridItem>
      <GridItem colSpan={4} mt={4}>
        <SkeletonControl variant={"skeleton"} height={2} width={"50%"} />
      </GridItem>

      <SkeletonControl variant={"skeleton"} length={16} height={2} />

      <GridItem colSpan={4} mt={4}>
        <SkeletonControl variant={"skeleton"} height={2} width={"50%"} />
      </GridItem>
      <GridItem colSpan={4}>
        <Divider />
      </GridItem>
      <SkeletonControl variant={"skeleton"} length={8} height={2} />
    </Grid>
  );
};

export default PatientPrescriptionSkeleton;
