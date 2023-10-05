import { Box, Button, Text } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { calMaxLen, getArray } from "@nepMeds/utils/index";
import React from "react";

const ReadMoreComponent = ({
  bio_detail,
  maxWords,
}: {
  bio_detail: string;
  maxWords: number;
}) => {
  const [isReadMore, setIsReadMore] = React.useState(true);

  const displayedText = isReadMore
    ? bio_detail.slice(0, calMaxLen({ inputString: bio_detail, maxWords }))
    : bio_detail;
  const buttonText = isReadMore ? "Read More..." : "Show Less";

  return (
    <Box>
      <Text fontWeight={400} fontSize={"xs"}>
        {displayedText}
        {getArray(bio_detail).length > maxWords && (
          <Button
            variant={"link"}
            onClick={() => setIsReadMore(!isReadMore)}
            fontWeight={400}
            fontSize={"xs"}
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
