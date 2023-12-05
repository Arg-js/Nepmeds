import {
  AccordionItem as ChakraAccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Divider,
  Box,
} from "@chakra-ui/react";
import { ICreateFaq } from "@nepMeds/service/nepmeds-faq";
import { colors } from "@nepMeds/theme/colors";

const AccordionItem = ({ faq }: { faq: ICreateFaq }) => {
  return (
    <>
      <ChakraAccordionItem border={"none"} bgColor={colors.white} py={2} px={6}>
        <AccordionButton
          sx={{
            textAlign: "center",
            "&:hover": {
              bg: colors.blue_10,
            },
          }}
        >
          <Box
            as="span"
            flex="1"
            textAlign="left"
            fontWeight={600}
            fontSize={"md"}
            color={colors.primary}
          >
            {faq.question}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          pb={4}
          color={colors.black_40}
          fontWeight={400}
          fontSize={"md"}
        >
          {faq.answer}
        </AccordionPanel>
        <Divider color={colors.light_gray_border} />
      </ChakraAccordionItem>
    </>
  );
};

export default AccordionItem;
