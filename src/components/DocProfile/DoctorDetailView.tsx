import {
  Flex,
  Grid,
  GridItem,
  VStack,
  Box,
  Tag,
  TagLabel,
  UnorderedList,
  ListItem,
  Text,
  Image,
} from "@chakra-ui/react";
import { BackArrowIcon, UniversityIcon } from "@nepMeds/assets/svgs";
import { scrollToTop } from "@nepMeds/utils/scrollToTop";
import WrapperBox, {
  boxShadow,
} from "../Patient/DoctorConsultation/WrapperBox";
import ReadMore from "../ReadMore";
import { useNavigate } from "react-router-dom";
import { colors } from "@nepMeds/theme/colors";
import { useGetDoctorListById } from "@nepMeds/service/nepmeds-patient-doctorList";
import userAvatar from "@nepMeds/assets/images/userAvatar.png";

const DoctorDetailView = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) => {
  const navigate = useNavigate();

  const { data: doctorList } = useGetDoctorListById({
    id: +id,
    target_date: "",
    enabled,
  });

  return (
    <WrapperBox
      style={{
        boxShadow,
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
          <Text fontWeight={500} fontSize={"md"} color={colors.black_20}>
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
              <Text fontWeight={600} fontSize={"20px"} color={colors.dark_blue}>
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
                    {doctorList?.title} {doctorList?.name}
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
                    NMC No : {doctorList?.doctor_nmc_info || "N/A"}
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
                <Text fontWeight={600} fontSize={"lg"} color={colors.black_60}>
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
                <Text fontWeight={600} fontSize={"lg"} color={colors.black_60}>
                  Biography
                </Text>
                {/* TODO: if the read more has some issue */}
                <Box
                  color={colors.black_50}
                  fontWeight={500}
                  fontSize={"sm"}
                  bg={colors.blue_10}
                  p={3.5}
                  borderRadius={"6px"}
                >
                  <ReadMore
                    bio_detail={doctorList?.bio_detail ?? ""}
                    maxWords={50}
                  />
                </Box>
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
                      {doctorList?.doctor_experience?.map(experience => {
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
                      })}
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
  );
};

export default DoctorDetailView;
