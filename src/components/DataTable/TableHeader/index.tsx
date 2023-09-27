import { Text } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

const TableHeader: React.FC<{ heading: string }> = ({ heading }) => {
  return (
    <Text
      fontSize="md"
      fontWeight="500"
      color={colors.black_60}
      fontFamily={"Inter"}
    >
      {heading}
    </Text>
  );
};

export default TableHeader;
