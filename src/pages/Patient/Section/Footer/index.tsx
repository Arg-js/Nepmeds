import { Grid, GridItem, Flex, Divider, Text } from "@chakra-ui/react";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";

const FooterContents = [
  {
    title: "How can we help you?",
    contents: ["Refer & Earn", "FAQ’s", "Track My Order", "Shipping"],
  },
  {
    title: "For Doctor & Nurse",
    contents: ["Consult Online", "Register as a doctor"],
  },
  {
    title: "Know Us",
    contents: [
      "About Us",
      "Contact Us",
      "Press",
      "Careers",
      "Terms and condition",
      "Privacy Policy",
    ],
  },
  {
    title: "Social",
    contents: ["Facebook", "Instagram", "Twitter", "Youtube", "LinkedIn"],
  },
  {
    title: "Don’t miss updates from us !",
    contents: [
      "Get an email subscription and lots of interesting news and other updates on health will be sent to you regularly.",
    ],
  },
];

const PatientFooter = () => {
  return (
    <>
      <WrapperBox
        backgroundColor={colors.white}
        style={{ ...style, height: { base: "auto", md: "517px" } }}
      >
        <>
          <Grid
            templateColumns={{
              base: `1fr`,
              md: `repeat(5,200px) 1fr`,
            }}
            gap={10}
          >
            {FooterContents.map(footerContent => {
              return (
                <GridItem key={footerContent.title}>
                  <Flex direction={"column"}>
                    <Text fontSize={"14px"} fontWeight={700}>
                      {footerContent.title}
                    </Text>
                    {footerContent.contents.map(content => {
                      return (
                        <Text fontSize={"14px"} fontWeight={500} key={content}>
                          {content}
                        </Text>
                      );
                    })}
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>
          <Divider my={10} borderColor={colors.gray_text_header} />
        </>
      </WrapperBox>
    </>
  );
};

export default PatientFooter;
