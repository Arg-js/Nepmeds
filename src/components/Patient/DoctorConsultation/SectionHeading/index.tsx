import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { colors } from "@nepMeds/theme/colors";

interface ISectionHeading {
  heading?: string;
  description?: string;
  btnText?: string;
  onClick?: () => void;
}
const SectionHeading: React.FC<ISectionHeading> = ({
  heading,
  description,
  btnText,
  onClick,
}) => {
  return (
    <Flex
      justifyContent={"space-between"}
      gap={{ base: 4, md: 0 }}
      mb={4}
      direction={{ base: "column", md: "row" }}
    >
      <Box>
        {heading && (
          <Text fontWeight={600} fontSize={"20px"}>
            {heading}
          </Text>
        )}
        {description && (
          <Text
            fontWeight={500}
            fontSize={"14px"}
            color={colors.gray_text_header}
          >
            {description}
          </Text>
        )}
      </Box>
      {btnText && (
        <Button variant={"primaryOutline"} onClick={onClick}>
          {btnText}
        </Button>
      )}
    </Flex>
  );
};

export default SectionHeading;
