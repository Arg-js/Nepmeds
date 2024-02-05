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
    title: "Need help?",
    contents: [
      {
        title: "Reward Points",
        link: "https://www.nepmeds.com.np/page/reward-point",
      },
      { title: "Contact Us", link: "https://www.nepmeds.com.np/contact-us" },
      { title: "FAQ’s", link: NAVIGATION_ROUTES.PATIENT.FAQ },
    ],
  },
  {
    title: "Information",
    contents: [
      { title: "About Us", link: "https://www.nepmeds.com.np/page/aboutus" },
      {
        title: "Health Library",
        link: "https://www.nepmeds.com.np/health-library",
      },
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
  {
    title: "Social Links",
    contents: [
      { title: "Facebook", link: "https://facebook.com/nepmeds" },
      { title: "Instagram", link: "https://www.instagram.com/nepmeds/" },
      { title: "Twitter", link: "https://twitter.com/nepmeds" },
      {
        title: "Youtube",
        link: "https://www.youtube.com/channel/UCANNmxTco0dYxWkl_YPYkQA",
      },
      { title: "LinkedIn", link: "https://www.linkedin.com/" },
    ],
  },
  // {
  //   title: "Don’t miss updates from us !",
  //   contents: [
  //     "Get an email subscription and lots of interesting news and other updates on health will be sent to you regularly.",
  //   ],
  // },
  {
    title: "For Doctor & Nurse",
    contents: [
      { title: "Consult Online", link: "" },
      { title: "Register as a doctor", link: NAVIGATION_ROUTES.SIGNUP },
    ],
  },
];

const PatientFooter: React.FC = () => {
  return (
    <>
      <WrapperBox py={10} height={{ base: "auto", xl: "517px" }}>
        <>
          <Grid
            templateColumns={{
              base: `1fr`,
              md: `repeat(5,1fr)`,
            }}
            gap={10}
          >
            {FooterContents.map(footerContent => {
              return (
                <GridItem key={footerContent.title}>
                  <Flex
                    direction={"column"}
                    alignItems={{ base: "center", md: "start" }}
                    gap={1}
                  >
                    <Text
                      fontSize={"lg"}
                      fontWeight={700}
                      color={colors.black}
                      mb={1}
                    >
                      {footerContent.title}
                    </Text>
                    {footerContent.contents.map(content => {
                      return (
                        <Link
                          fontSize={"md"}
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
            <GridItem
              cursor={"pointer"}
              justifySelf={{ base: "center", md: "start" }}
            >
              <Image alt={"nepmeds logo"} src={images.logo} />
            </GridItem>
          </Grid>
          <Divider my={10} borderColor={colors.gray_text_header} />
          <Flex
            justifyContent={"space-between"}
            direction={{ base: "column", md: "row" }}
            gap={3}
          >
            <Flex
              direction={"column"}
              gap={3.5}
              alignItems={{ base: "center", lg: "flex-start" }}
            >
              <Text fontWeight={900} fontSize={"md"} color={colors.black}>
                Download App
              </Text>
              <Flex gap={2.5} direction={{ base: "column", lg: "row" }}>
                <AppStoreIcon />
              </Flex>
            </Flex>
            <Flex
              direction={"column"}
              gap={3.5}
              alignItems={{ base: "center", lg: "flex-start" }}
            >
              <Text fontWeight={900} fontSize={"md"} color={colors.black}>
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
