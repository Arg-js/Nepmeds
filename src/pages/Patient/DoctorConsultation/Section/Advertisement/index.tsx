import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { images } from "@nepMeds/assets/images";
import {
  AppStoreIcon,
  ClockIcon,
  PaymentIcon,
  PriceTagIcon,
  ShieldIcon,
} from "@nepMeds/assets/svgs";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";

const advertisementDetails = [
  {
    logo: <ClockIcon />,
    content: "24 hr service",
  },
  {
    logo: <ShieldIcon />,
    content: "Privacy non disclosure",
  },
  {
    logo: <PriceTagIcon />,
    content: "Affordable Price",
  },
  {
    logo: <PaymentIcon />,
    content: "Secure Payments",
  },
];

const AdvertisementBanner = () => {
  return (
    <WrapperBox
      bgImage={images.advertisementBackground}
      py={{ base: 8, xl: 0 }}
      px={{ base: 8, xl: 2 }}
    >
      <Grid
        templateColumns={"repeat(12, 1fr)"}
        gap={3}
        mx={{ base: 0, "2xl": 30 }}
      >
        <GridItem
          colSpan={{ base: 4, xl: 2 }}
          alignSelf={{ base: "center", lg: "flex-end" }}
        >
          <Image src={images.doctorImage} />
        </GridItem>
        <GridItem colSpan={{ base: 8, xl: 4 }} alignSelf={"center"}>
          <Grid gap={{ base: 14, md: "30px", lg: "62px" }}>
            <GridItem width={"80%"}>
              <Box fontWeight={600} fontSize={"28px"} color={colors.main}>
                Your health is our
                <Text color={colors.primary}>priority</Text>
              </Box>
            </GridItem>
            <GridItem>
              <Grid
                templateColumns={{
                  base: "repeat(1,max-content)",
                  md: "repeat(2,max-content)",
                }}
                alignItems={"center"}
                gap={{ base: 4, md: 8 }}
              >
                {advertisementDetails.map(({ logo, content }) => (
                  <GridItem key={content}>
                    <Flex gap={4}>
                      {logo}
                      <Text
                        fontWeight={500}
                        fontSize={"md"}
                        color={colors.dark}
                      >
                        {content}
                      </Text>
                    </Flex>
                  </GridItem>
                ))}
              </Grid>
            </GridItem>
            <GridItem>
              <Text fontWeight={400} fontSize={"sm"} color={colors.dark}>
                Get faster health services online.
                <br /> Make instant connection or book appointment.
              </Text>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem
          colSpan={{ base: 4, xl: 2 }}
          display={"flex"}
          alignItems={"flex-end"}
          my={"52px"}
        >
          <Image
            src={images.bannerPhoneImage}
            position={"relative"}
            zIndex={1}
          />
          <Image
            src={images.bannerPhoneImageBack}
            position={"absolute"}
            right={{ base: "65%", xl: "33%", "2xl": "37%" }}
          />
        </GridItem>
        <GridItem alignSelf={"center"} colSpan={{ base: 8, xl: 4 }} ml={6}>
          <Flex direction={"column"} gap={12}>
            <Box>
              <Text fontWeight={700} fontSize={"32px"} color={colors.main}>
                Download The NepMeds App
              </Text>
              <Text fontWeight={500} fontSize={"15px"} color={colors.dark}>
                Book appointments and health checkups ; order medicines and
                consult doctor online.
              </Text>
            </Box>
            <AppStoreIcon />
          </Flex>
        </GridItem>
      </Grid>
    </WrapperBox>
  );
};

export default AdvertisementBanner;
