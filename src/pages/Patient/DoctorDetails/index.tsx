import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  ListItem,
  Tag,
  TagLabel,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { BackArrowIcon, UniversityIcon } from "@nepMeds/assets/svgs";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";
import "react-calendar/dist/Calendar.css";
import "@nepMeds/assets/styles/reactCalender.css";
import "@nepMeds/assets/styles/Patient/index.css";
import Header from "@nepMeds/pages/Patient/Section/Header";
import { useParams, useNavigate } from "react-router-dom";
import {
  IDoctorListById,
  useGetDoctorListById,
} from "@nepMeds/service/nepmeds-patient-doctorList";
import { useGetAvailability } from "@nepMeds/service/nepmeds-patient-doctor-availability";
import { useState } from "react";
import { formatDateToString } from "@nepMeds/utils/TimeConverter/timeConverter";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PatientDetail, { defaultValues } from "./components/PatientDetail";
import DoctorAvailability from "./components/DoctorAvailability";
import userAvatar from "@nepMeds/assets/images/userAvatar.png";
import TransactionBox from "@nepMeds/components/Payment/TransactionBox";
import { useForm } from "react-hook-form";
import { scrollToTop } from "@nepMeds/utils/scrollToTop";
import ReadMoreComponent from "@nepMeds/components/ReadMore";
const currentDate = formatDateToString(new Date());

const DoctorDetails = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState(0);
  const [date, setDate] = useState(new Date());
  const [selectedAvailability, setSelectedAvailability] = useState<number[]>(
    []
  );

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
  const phoneRegExp = /^(9\d{9}|4\d{6}|01\d{7})$/;

  const bookedDates = availability?.filter(data => {
    return selectedAvailability.includes(data.id);
  });

  const schema = Yup.object({
    full_name: Yup.string().required("This field is required"),
    contact: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    age: Yup.number()
      .max(115, "age must be at most 115 years")
      .positive("age must be greater than zero")
      .typeError("age must be a number"),
    symptoms: Yup.array()
      .required("This field is required")
      .min(1, "This field is required"),
  });
  const formProps = useForm({ defaultValues, resolver: yupResolver(schema) });

  return (
    <Box bg={colors.white} height={"100vh"}>
      <Header />
      <WrapperBox style={{ px: 5 }}>
        <Grid
          templateColumns={{ lg: "repeat(3,1fr)", xl: "repeat(12,1fr)" }}
          justifyContent={"center"}
          gap={5}
        >
          <GridItem colSpan={{ lg: 2, xl: 7 }}>
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
                  onClick={() => {
                    scrollToTop();
                    navigate(-1);
                  }}
                  sx={{
                    "svg path": {
                      stroke: colors.black_20,
                    },
                  }}
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
                    lg: "repeat(8, 1fr)",
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
                            <Image
                              boxSize="120px"
                              src={doctorList?.profile_picture ?? userAvatar}
                              objectFit={"cover"}
                              objectPosition={"top"}
                              borderRadius={"full"}
                            />
                          </VStack>
                          <Flex
                            mx={2}
                            bg={colors.primary}
                            color={colors.white}
                            fontWeight={600}
                            fontSize={"md"}
                            height={"auto"}
                            py={1}
                            justifyContent={"center"}
                            alignItems={"center"}
                            transform={"skew(-15deg)"}
                            textAlign={"center"}
                            textTransform={"capitalize"}
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
                            textTransform={"capitalize"}
                          >
                            {doctorList?.specialization_names?.[0]?.name}
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
                              N/A
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
                        <Grid
                          templateColumns={{
                            base: "repeat(2, 1fr)",
                            lg: "repeat(1, 1fr)",
                            xl: "repeat(2, 1fr)",
                          }}
                          gap={3}
                        >
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
                                py={{ base: 1.5, lg: 3, xl: 1.5 }}
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

                  <GridItem colSpan={{ md: 1, lg: 5 }}>
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
                          <ReadMoreComponent
                            bio_detail={doctorList?.bio_detail ?? ""}
                            maxWords={50}
                          />
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
                                        {experience?.currently_working
                                          ? "(Currently Working)"
                                          : "to"}{" "}
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
            {formState === 0 && (
              <DoctorAvailability
                setFormState={setFormState}
                setDate={setDate}
                date={date}
                isAvailabilityFetching={isAvailabilityFetching}
                availability={availability}
                selectedAvailability={selectedAvailability}
                setSelectedAvailability={setSelectedAvailability}
              />
            )}
            {bookedDates && formState === 1 && (
              <PatientDetail
                doctorList={doctorList}
                bookedDates={bookedDates}
                setFormState={setFormState}
                formProps={formProps}
              />
            )}
            {formState === 2 && (
              <WrapperBox
                backgroundColor={colors.white}
                border={`2px solid ${colors.gray_border}`}
                style={{
                  px: { base: "0", md: "2", xl: "4" },
                  py: 4,
                  height: "auto",
                  borderTopRadius: 3,
                }}
              >
                <>
                  <Flex gap={4} alignItems={"center"}>
                    <BackArrowIcon
                      cursor={"pointer"}
                      onClick={() => setFormState(1)}
                    />
                    <Text
                      fontWeight={600}
                      fontSize={"md"}
                      color={colors.dark_blue}
                    >
                      Please choose your payment method
                    </Text>
                  </Flex>
                  <TransactionBox
                    appointmentData={{
                      ...formProps.getValues(),
                      availabilities: selectedAvailability,
                      total_amount_paid:
                        (doctorList?.schedule_rate
                          ? +doctorList?.schedule_rate
                          : 0) * selectedAvailability.length,
                      symptoms: formProps
                        .getValues()
                        ?.symptoms.map(({ value }) => +value),
                      old_report_file:
                        formProps.getValues()?.old_report_file?.[0],
                      doctor: doctorList?.id as number,
                    }}
                    doctorInfo={doctorList as IDoctorListById}
                  />
                </>
              </WrapperBox>
            )}
          </GridItem>
        </Grid>
      </WrapperBox>
    </Box>
  );
};

export default DoctorDetails;
