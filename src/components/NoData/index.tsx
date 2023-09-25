import { Flex, Text } from "@chakra-ui/react";
import { NoDataBoxIcon } from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";

const NoData = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
      pt={4}
    >
      <NoDataBoxIcon />
      <Text fontSize={"sm"} color={colors.grey_50} pl={1}>
        No Data
      </Text>
    </Flex>
  );
};

export default NoData;
