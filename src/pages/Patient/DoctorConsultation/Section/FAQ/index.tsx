import { Accordion, Grid, GridItem, Text } from "@chakra-ui/react";
import { ICreateFaq, useGetALLFaq } from "@nepMeds/service/nepmeds-faq";
import AccordionItem from "./Component/Accordion";
import MoreInfoSection from "./Component/MoreInfoSection";

const FAQ = () => {
  // React Query
  const { data: faqList } = useGetALLFaq({
    pageIndex: 0,
    pageSize: 10,
  });
  // React Query Ends

  const FaqColFirst = faqList?.slice(faqList.length / 2) ?? [];
  const FaqColSecond = faqList?.slice(0, faqList.length / 2) ?? [];

  const renderAccordionItems = (faqList: ICreateFaq[]) => {
    return faqList?.map(faq => <AccordionItem faq={faq} key={faq.answer} />);
  };

  return (
    <>
      <Text fontWeight={600} fontSize={"xl"} textAlign={"center"} mb={4}>
        Frequently asked questions
      </Text>
      <Accordion allowMultiple>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          gap={12}
          p={{ base: 2, md: 6 }}
          borderRadius={"12px"}
        >
          <GridItem>{renderAccordionItems(FaqColFirst)}</GridItem>
          <GridItem>{renderAccordionItems(FaqColSecond)}</GridItem>
        </Grid>
      </Accordion>

      {/* More Info Section */}
      <MoreInfoSection
        infoText={"search Question in detail"}
        btnText={"Search Question ?"}
      />
    </>
  );
};

export default FAQ;
