import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  ListItem,
  SimpleGrid,
  Tag,
  TagLabel,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { BackArrowIcon, UniversityIcon } from "@nepMeds/assets/svgs";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@nepMeds/assets/styles/reactCalender.css";
import "@nepMeds/assets/styles/Patient/index.css";
import Header from "@nepMeds/pages/Patient/Section/Header";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";

const specializations = ["Cardiologist", "Orthopedics", "Urology", "Neurology"];

const DoctorDetails = () => {
  const navigate = useNavigate();
  return (
    <Box bg={colors.white} height={"100vh"}>
      <Header />
      <WrapperBox style={{ px: 5 }}>
        <Grid
          templateColumns={{ lg: "repeat(2,1fr)", xl: "repeat(12,1fr)" }}
          justifyContent={"center"}
          gap={5}
        >
          <GridItem colSpan={{ lg: 1, xl: 7 }}>
            <WrapperBox
              style={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                borderRadius: "2",
                px: 6,
              }}
            >
              <>
                {/* BACK BUTTON */}
                <Flex
                  alignItems={"center"}
                  gap={2}
                  mb={6}
                  cursor={"pointer"}
                  onClick={() =>
                    navigate(NAVIGATION_ROUTES.DOCTOR_CONSULTATION)
                  }
                >
                  <BackArrowIcon />
                  <Text
                    fontWeight={500}
                    fontSize={"md"}
                    color={colors.black_20}
                  >
                    Back to home
                  </Text>
                </Flex>
                {/* BACK BUTTON ENDS */}

                <Grid
                  templateColumns={{
                    md: "repeat(2, 1fr)",
                    lg: "repeat(7, 1fr)",
                  }}
                  gap={7}
                >
                  <GridItem colSpan={{ md: 1, lg: 3 }}>
                    <Flex direction={"column"} gap={6}>
                      <Text
                        fontWeight={600}
                        fontSize={"20px"}
                        color={colors.dark_blue}
                      >
                        Doctor’s Profile
                      </Text>

                      <Box>
                        <Flex direction={"column"} gap={6} mt={6}>
                          <VStack>
                            <Avatar size={"2xl"} />
                          </VStack>
                          <Flex
                            mx={2}
                            bg={colors.primary}
                            color={colors.white}
                            fontWeight={600}
                            fontSize={"md"}
                            height={"41px"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            transform={"skew(-15deg)"}
                          >
                            Dr. Ramesh Poudel
                          </Flex>
                        </Flex>

                        {/* INFO SECTION */}
                        <Flex direction={"column"} gap={4} mt={4}>
                          <Text
                            fontWeight={500}
                            fontSize={"lg"}
                            color={colors.black_30}
                          >
                            Cardiologist
                          </Text>
                          <Text
                            fontWeight={600}
                            fontSize={"sm"}
                            color={colors.black_30}
                          >
                            NMC No : 98541
                          </Text>
                          <Flex gap={"12px"} alignItems={"center"}>
                            <UniversityIcon />
                            <Text
                              fontWeight={"400"}
                              fontSize={"sm"}
                              color={colors.black_30}
                            >
                              University of Abcdf
                            </Text>
                          </Flex>
                        </Flex>
                        {/* INFO SECTION CLOSES */}
                      </Box>

                      {/* SPECIALIZATION */}
                      <Flex direction={"column"} gap={4}>
                        <Text
                          fontWeight={600}
                          fontSize={"lg"}
                          color={colors.black_60}
                        >
                          Specializations
                        </Text>
                        <Grid templateColumns={"repeat(2, 1fr)"} gap={3}>
                          {specializations.map(specialist => {
                            return (
                              <Tag
                                key={specialist}
                                size={"md"}
                                variant="outline"
                                colorScheme="blue"
                                borderRadius="full"
                                justifyContent={"center"}
                                alignItems={"center"}
                                py={1.5}
                              >
                                <TagLabel>{specialist}</TagLabel>
                              </Tag>
                            );
                          })}
                        </Grid>
                      </Flex>
                      {/* SPECIALIZATION ENDS*/}
                    </Flex>
                  </GridItem>

                  <GridItem colSpan={{ md: 1, lg: 4 }}>
                    <Flex direction={"column"} gap={6}>
                      <Flex direction={"column"} gap={4}>
                        <Text
                          fontWeight={600}
                          fontSize={"lg"}
                          color={colors.black_60}
                        >
                          Biography
                        </Text>
                        <Text
                          color={colors.black_50}
                          fontWeight={500}
                          fontSize={"sm"}
                          bg={colors.blue_10}
                          p={3.5}
                          borderRadius={"6px"}
                        >
                          Dr. Ramesh Poudel completed his post graduation in
                          masters of dental surgery[ mds] in the field of
                          Pedodontics and prove dentistry, I have past work
                          experience of 10+ years on this field.
                        </Text>
                      </Flex>

                      <Flex direction={"column"} gap={4}>
                        <Text
                          fontWeight={600}
                          fontSize={"lg"}
                          color={colors.black_60}
                        >
                          Experience
                        </Text>
                        <Box ml={6}>
                          <UnorderedList color={colors.black_50}>
                            <ListItem mb={6}>
                              <Text
                                fontWeight={400}
                                fontSize={"sm"}
                                color={colors.black_50}
                              >
                                Lorem ipsum dolor sit amet consectetur. Dui et
                                nibh posuere pharetra metus pretium felis sed
                                arcu. Molestie condimentum egestas turpis.
                              </Text>
                            </ListItem>
                            <ListItem mb={6}>
                              <Text
                                fontWeight={400}
                                fontSize={"sm"}
                                color={colors.black_50}
                              >
                                Lorem ipsum dolor sit amet consectetur. Dui et
                                nibh posuere pharetra metus pretium felis sed
                                arcu. Molestie condimentum egestas turpis.
                              </Text>
                            </ListItem>
                            <ListItem mb={6}>
                              <Text
                                fontWeight={400}
                                fontSize={"sm"}
                                color={colors.black_50}
                              >
                                Lorem ipsum dolor sit amet consectetur. Dui et
                                nibh posuere pharetra metus pretium felis sed
                                arcu. Molestie condimentum egestas turpis.
                              </Text>
                            </ListItem>
                          </UnorderedList>
                        </Box>
                      </Flex>
                      <Flex
                        bg={colors.table_header}
                        color={colors.main}
                        fontWeight={600}
                        fontSize={"sm"}
                        py={3.5}
                        px={8}
                        justifyContent={"center"}
                        alignItems={"center"}
                        width={"fit-content"}
                        borderRadius={"8px"}
                        height={"48px"}
                      >
                        Consultation Fee : Rs 500
                      </Flex>
                    </Flex>
                  </GridItem>
                </Grid>
              </>
            </WrapperBox>
          </GridItem>

          <GridItem colSpan={{ lg: 1, xl: 5 }}>
            <WrapperBox
              p={{ base: 5, md: 10, lg: 5, xl: 10 }}
              boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
              borderRadius="2"
            >
              <>
                <Text fontWeight={600} fontSize={"xl"} color={colors.black_60}>
                  Select Date and Time
                </Text>
                <Flex gap={4} direction={"column"}>
                  <Flex alignItems={"center"} justifyContent={"center"}>
                    <Calendar />
                  </Flex>
                  <Text
                    fontWeight={600}
                    fontSize={"lg"}
                    color={colors.black_60}
                  >
                    Available Time
                  </Text>
                  <Text
                    fontWeight={600}
                    fontSize={"md"}
                    color={colors.black_60}
                  >
                    Evening
                  </Text>
                  <SimpleGrid
                    gridTemplateColumns={"repeat(auto-fit, minmax(90px, 1fr))"}
                  >
                    {Array.from({ length: 4 }, (_, index) => (
                      <Button
                        key={index}
                        variant={"primaryOutlineFilled"}
                        borderRadius={3}
                        height={"34px"}
                        m={1}
                      >
                        05:30 - 05:45
                      </Button>
                    ))}
                  </SimpleGrid>
                  <Flex justifyContent="flex-end">
                    <Button
                      variant={"secondary"}
                      height="40px"
                      borderRadius="4px"
                    >
                      Book Appointment
                    </Button>
                  </Flex>
                </Flex>
              </>
            </WrapperBox>
          </GridItem>
        </Grid>
      </WrapperBox>
    </Box>
  );
};

export default DoctorDetails;
