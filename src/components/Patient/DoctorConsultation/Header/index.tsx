import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { colors } from "@nepMeds/theme/colors";

interface IHeader {
  heading?: string;
  description?: string;
  btnText?: string;
}
const Header: React.FC<IHeader> = ({ heading, description, btnText }) => {
  return (
    <Flex justifyContent={"space-between"} mb={4}>
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
        <Button
          fontWeight={400}
          fontSize={"14px"}
          bg={"transparent"}
          color={colors.primary}
          // same
          borderRadius={"3px"}
          height={"48px"}
          px={7}
          border={`1px solid ${colors.primary}`}
        >
          {btnText}
        </Button>
      )}
    </Flex>
  );
};

export default Header;
