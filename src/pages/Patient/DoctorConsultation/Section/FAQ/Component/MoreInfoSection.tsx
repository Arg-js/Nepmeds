import { Flex, Button, Box, Text } from "@chakra-ui/react";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { colors } from "@nepMeds/theme/colors";
import { scrollToTop } from "@nepMeds/utils/scrollToTop";
import { useNavigate } from "react-router-dom";

const MoreInfoSection = ({
  infoText,
  btnText,
}: {
  infoText: string;
  btnText: string;
}) => {
  const navigate = useNavigate();
  return (
    <Box bgColor={colors.primary} p={4} borderRadius={"12px"}>
      <Flex
        justifyContent={"space-between"}
        direction={{ base: "column", md: "row" }}
        gap={2}
      >
        <Flex direction={"column"} gap={2}>
          <Text fontWeight={600} fontSize={"md"} color={colors.white}>
            Still have questions?
          </Text>
          <Text fontWeight={400} fontSize="sm" color={colors.white}>
            {`Can’t find the answer you’re looking for? You can ${infoText}`}
          </Text>
        </Flex>
        <Button
          variant="primaryOutlineFilled"
          onClick={() => {
            navigate(NAVIGATION_ROUTES.PATIENT.FAQ);
            scrollToTop();
          }}
        >
          {btnText}
        </Button>
      </Flex>
    </Box>
  );
};

export default MoreInfoSection;
