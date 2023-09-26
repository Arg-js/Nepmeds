import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  ListItem,
  SimpleGrid,
  Spinner,
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
import { useParams, useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useGetDoctorListById } from "@nepMeds/service/nepmeds-patient-doctorList";
import { useGetAvailability } from "@nepMeds/service/nepmeds-patient-doctor-availability";
import { useState } from "react";
import { formatDateToString } from "@nepMeds/utils/TimeConverter/timeConverter";
import { Value } from "react-calendar/dist/cjs/shared/types";
const currentDate = formatDateToString(new Date());

const DoctorDetails = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const [selectedAvailability, setSelectedAvailability] = useState<number[]>(
    []
  );
  const [date, setDate] = useState(new Date());
  const [appointment, setAppointment] = useState(false);

  const handleCalendarChange = (value: Value) => {
    const date = new Date(value as Date);
    setDate(date);
  };

  // REACT QUERIES
  const { data: doctorList } = useGetDoctorListById({
    id: +id,
    target_date: formatDateToString(date) || currentDate,
  });
  const { data: availability, isFetching: isAvailabilityFetching } =
    useGetAvailability({
      id: +id,
      target_date: formatDateToString(date) || currentDate,
    });
  // REACT QUERIES END
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
                            Dr. {doctorList?.name}
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
                            NMC No :{" "}
                            {doctorList?.medical_licence_number || "N/A"}
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
                          {doctorList?.specialization_names.map(({ name }) => {
                            return (
                              <Tag
                                key={name}
                                size={"md"}
                                variant="outline"
                                colorScheme="blue"
                                borderRadius="full"
                                justifyContent={"center"}
                                alignItems={"center"}
                                py={1.5}
                                textTransform={"capitalize"}
                              >
                                <TagLabel>{name}</TagLabel>
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
                          {doctorList?.bio_detail}
                        </Text>
                      </Flex>

                      {/* Experience  */}
                      {!!doctorList?.doctor_experience.length && (
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
                              {doctorList?.doctor_experience?.map(
                                experience => {
                                  return (
                                    <ListItem mb={6} key={experience.id}>
                                      <Text
                                        fontWeight={400}
                                        fontSize={"sm"}
                                        color={colors.black_50}
                                      >
                                        {experience?.hospital}
                                      </Text>
                                      <Text
                                        fontWeight={600}
                                        fontSize={"sm"}
                                        color={colors.black_50}
                                      >
                                        {experience?.from_date} &nbsp;{" "}
                                        {!experience?.currently_working && "to"}{" "}
                                        &nbsp;
                                        {experience?.to_date}
                                      </Text>
                                    </ListItem>
                                  );
                                }
                              )}
                            </UnorderedList>
                          </Box>
                        </Flex>
                      )}
                      {/* Experience Ends */}

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
                        Consultation Fee : Rs {doctorList?.schedule_rate}
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
                    <Calendar
                      onChange={value => handleCalendarChange(value)}
                      value={date}
                    />
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
                  <Box>
                    {isAvailabilityFetching ? (
                      <Box textAlign={"center"}>
                        <Spinner />
                      </Box>
                    ) : (
                      <SimpleGrid
                        gridTemplateColumns={
                          "repeat(auto-fit, minmax(90px, 1fr))"
                        }
                      >
                        {availability?.map(data => (
                          <Button
                            variant={"primaryOutlineFilled"}
                            key={data.id}
                            borderRadius={3}
                            height={"34px"}
                            m={1}
                            sx={{
                              bg: `${
                                selectedAvailability.includes(data.id)
                                  ? colors.sky_blue
                                  : "transparent"
                              }`,
                            }}
                            onClick={() =>
                              setSelectedAvailability(prev =>
                                prev.includes(data.id)
                                  ? prev.filter(item => item !== data.id)
                                  : [...prev, data.id]
                              )
                            }
                          >
                            {data?.from_time?.slice(0, 5)} -
                            {data?.to_time?.slice(0, 5)}
                          </Button>
                        ))}
                      </SimpleGrid>
                    )}
                    {!isAvailabilityFetching && (
                      <FormLabel color={colors.error} fontSize={"xs"} mt={4}>
                        {!availability?.length &&
                          "This doctor is not available on this date, choose another date"}
                      </FormLabel>
                    )}
                    {appointment && selectedAvailability?.length === 0 && (
                      <FormLabel color={colors.error} fontSize={"xs"} mt={4}>
                        Please Choose the availability*
                      </FormLabel>
                    )}
                  </Box>
                  <Flex justifyContent="flex-end">
                    <Button
                      variant={"secondary"}
                      height="40px"
                      borderRadius="4px"
                      onClick={() => setAppointment(!appointment)}
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
