import { Box, Button, Text } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import React from "react";

const ReadMoreComponent = ({ bio_detail }: { bio_detail: string }) => {
  const [isReadMore, setIsReadMore] = React.useState(true);

  const displayedText = isReadMore ? bio_detail.slice(0, 200) : bio_detail;
  const buttonText = isReadMore ? "Read More" : "Show Less";

  return (
    <Box>
      <Text fontWeight={400} fontSize={"12px"}>
        {displayedText}
        {bio_detail.length >= 200 && (
          <Button
            variant={"link"}
            onClick={() => setIsReadMore(!isReadMore)}
            fontWeight={400}
            fontSize={"12px"}
            color={colors.primary}
            mx={2}
          >
            {buttonText}
          </Button>
        )}
      </Text>
    </Box>
  );
};

export default ReadMoreComponent;
