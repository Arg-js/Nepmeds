import {
  Grid,
  GridItem,
  Flex,
  Divider,
  Text,
  Image,
  VStack,
} from "@chakra-ui/react";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";
import googlePlay from "@nepMeds/assets/images/googlePlay.png";
import appStore from "@nepMeds/assets/images/appStore.png";
import visaImage from "@nepMeds/assets/images/visa.png";
import esewaImage from "@nepMeds/assets/images/esewaImage.png";
import khaltiImage from "@nepMeds/assets/images/khaltiImage.png";
import imePayImage from "@nepMeds/assets/images/IMEpay.png";

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

const PatientFooter: React.FC<{ style?: Record<string, string> }> = ({
  style,
}) => {
  return (
    <>
      <WrapperBox
        style={{ ...style, height: { base: "auto", xl: "517px" } }}
      >
        <>
          <Grid
            templateColumns={{
              base: `1fr`,
              md: `repeat(5,1fr)`,
              xl: `repeat(5,200px) 1fr`,
            }}
            gap={10}
          >
            {FooterContents.map(footerContent => {
              return (
                <GridItem key={footerContent.title}>
                  <Flex
                    direction={"column"}
                    alignItems={{ base: "center", md: "start" }}
                  >
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
          <Flex
            justifyContent={"space-between"}
            direction={{ base: "column", md: "row" }}
            gap={3}
          >
            <VStack gap={3.5}>
              <Text fontWeight={600} fontSize={"14px"}>
                Download App
              </Text>
              <Flex gap={2.5} direction={{ base: "column", lg: "row" }}>
                <Image alt="Google Play" src={googlePlay} />
                <Image alt="App Store" src={appStore} />
              </Flex>
            </VStack>
            <VStack gap={3.5}>
              <Text fontWeight={600} fontSize={"14px"}>
                Payment Method
              </Text>
              <Flex gap={2.5} direction={{ base: "column", lg: "row" }}>
                <Image alt="Google Play" src={imePayImage} />
                <Image alt="App Store" src={esewaImage} />
                <Image alt="Google Play" src={visaImage} />
                <Image alt="App Store" src={khaltiImage} />
              </Flex>
            </VStack>
          </Flex>
          <Text fontWeight={500} fontSize={"18px"} textAlign={"center"} mt={15}>
            Copyright © NepMeds 2023. All rights reserved
          </Text>
        </>
      </WrapperBox>
    </>
  );
};

export default PatientFooter;
