import { Box, Button, Text } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import React from "react";

function countWords(inputString: string) {
  // Remove extra spaces and split the string into words
  const wordsArray = inputString.trim().split(/\s+/);

  // Return the count of words
  return wordsArray.length;
}

// Function that trims 1st 20words from string and returns the length of the 1st 20 words
function calMaxLen(inputString: string, maxWords: number) {
  const wordsArray = inputString.trim().split(/\s+/);
  const truncatedWordsLen = wordsArray.slice(0, maxWords).join(" ").length;

  return truncatedWordsLen;
}
const ReadMoreComponent = ({ bio_detail }: { bio_detail: string }) => {
  const [isReadMore, setIsReadMore] = React.useState(true);

  const displayedText = isReadMore
    ? bio_detail.slice(0, calMaxLen(bio_detail, 20))
    : bio_detail;
  const buttonText = isReadMore ? "Read More" : "Show Less";

  return (
    <Box>
      <Text fontWeight={400} fontSize={"12px"}>
        {displayedText}
        {countWords(bio_detail) > 20 && (
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
