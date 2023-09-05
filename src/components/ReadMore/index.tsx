import { Box, Button, Text } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { calMaxLen, getArray } from "@nepMeds/utils/index";
import React from "react";

const ReadMoreComponent = ({ bio_detail }: { bio_detail: string }) => {
  const [isReadMore, setIsReadMore] = React.useState(true);

  const displayedText = isReadMore
    ? bio_detail.slice(0, calMaxLen(bio_detail, 20))
    : bio_detail;
  const buttonText = isReadMore ? "Read More ..." : "Show Less";

  return (
    <Box>
      <Text fontWeight={400} fontSize={"12px"}>
        {displayedText}
        {getArray(bio_detail).length > 20 && (
          <Button
            variant={"link"}
            onClick={() => setIsReadMore(!isReadMore)}
            fontWeight={400}
            fontSize={"12px"}
            color={colors.primary}
            mx={1}
          >
            {buttonText}
          </Button>
        )}
      </Text>
    </Box>
  );
};

export default ReadMoreComponent;
