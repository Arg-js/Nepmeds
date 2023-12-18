import {
  Grid,
  GridItem,
  Flex,
  Divider,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";
import esewaImage from "@nepMeds/assets/images/esewaImage.png";
import khaltiImage from "@nepMeds/assets/images/khaltiImage.png";
import { AppStoreIcon, BankTransferIcon } from "@nepMeds/assets/svgs";
import { images } from "@nepMeds/assets/images";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";

const FooterContents = [
  {
    title: "How can we help you?",
    contents: [
      { title: "Return & Cancelation", link: "" },
      { title: "FAQ’s", link: NAVIGATION_ROUTES.PATIENT.FAQ },
    ],
  },
  {
    title: "For Doctor & Nurse",
    contents: [
      { title: "Consult Online", link: "" },
      { title: "Register as a doctor", link: NAVIGATION_ROUTES.SIGNUP },
    ],
  },
  {
    title: "Know Us",
    contents: [
      { title: "About Us", link: "https://www.nepmeds.com.np/page/aboutus" },
      { title: "Contact Us", link: "https://www.nepmeds.com.np/contact-us" },
      { title: "Careers", link: "https://www.nepmeds.com.np/page/career" },
      {
        title: "Terms and Condition",
        link: "https://www.nepmeds.com.np/page/terms-condition",
      },
      {
        title: "Privacy Policy",
        link: "https://www.nepmeds.com.np/page/privacy-policy",
      },
    ],
  },
  // TODO: add valid link to these footer elements
  // {
  //   title: "Social",
  //   contents: ["Facebook", "Instagram", "Twitter", "Youtube", "LinkedIn"],
  // },
  // {
  //   title: "Don’t miss updates from us !",
  //   contents: [
  //     "Get an email subscription and lots of interesting news and other updates on health will be sent to you regularly.",
  //   ],
  // },
];

const PatientFooter: React.FC = () => {
  return (
    <>
      <WrapperBox py={10} height={{ base: "auto", xl: "517px" }}>
        <>
          <Grid
            templateColumns={{
              base: `1fr`,
              md: `repeat(4,1fr)`,
            }}
            gap={10}
          >
            <GridItem
              cursor={"pointer"}
              justifySelf={{ base: "center", md: "start" }}
            >
              <Image alt={"nepmeds logo"} src={images.logo} />
            </GridItem>
            {FooterContents.map(footerContent => {
              return (
                <GridItem key={footerContent.title}>
                  <Flex
                    direction={"column"}
                    alignItems={{ base: "center", md: "start" }}
                    gap={1}
                  >
                    <Text
                      fontSize={"sm"}
                      fontWeight={700}
                      color={colors.main}
                      mb={1}
                    >
                      {footerContent.title}
                    </Text>
                    {footerContent.contents.map(content => {
                      return (
                        <Link
                          fontSize={"sm"}
                          fontWeight={500}
                          key={content.title}
                          textAlign={{ base: "center", md: "left" }}
                          href={content.link}
                        >
                          {content.title}
                        </Link>
                      );
                    })}
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>
          <Divider my={10} borderColor={colors.gray_text_header} />
          <Flex
            justifyContent={"space-between"}
            direction={{ base: "column", md: "row" }}
            gap={3}
          >
            <Flex direction={"column"} gap={3.5} alignItems={"center"}>
              <Text fontWeight={600} fontSize={"sm"} color={colors.primary}>
                Download App
              </Text>
              <Flex gap={2.5} direction={{ base: "column", lg: "row" }}>
                <AppStoreIcon />
              </Flex>
            </Flex>
            <Flex direction={"column"} gap={3.5} alignItems={"center"}>
              <Text fontWeight={600} fontSize={"sm"} color={colors.primary}>
                Payment Method
              </Text>
              <Flex
                gap={4}
                direction={{ base: "column", lg: "row" }}
                width={{ base: "30%", md: "auto" }}
                alignItems={"center"}
              >
                <BankTransferIcon />
                <Image alt="App Store" src={esewaImage} />
                <Image alt="App Store" src={khaltiImage} />
              </Flex>
            </Flex>
          </Flex>
          <Text fontWeight={500} fontSize={"lg"} textAlign={"center"} mt={15}>
            Copyright © NepMeds 2023. All rights reserved
          </Text>
        </>
      </WrapperBox>
    </>
  );
};

export default PatientFooter;
