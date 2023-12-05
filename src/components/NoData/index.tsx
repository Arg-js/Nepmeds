import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { NoDataBoxIcon } from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";

const NoData = ({ ...props }: FlexProps) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
      pt={4}
      {...props}
    >
      <NoDataBoxIcon />
      <Text fontSize={"sm"} color={colors.grey_50} pl={1}>
        No Data
      </Text>
    </Flex>
  );
};

export default NoData;
