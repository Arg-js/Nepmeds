import { EditIcon } from "@chakra-ui/icons";
import { Grid, GridItem, Text, Box, Flex } from "@chakra-ui/layout";
import { Card, CardBody, Image, Icon, VStack, Center } from "@chakra-ui/react";
import { images } from "@nepMeds/assets/images";
import {
  IDoctorAcademicInfo,
  IDoctorCertificationInfo,
  IDoctorExperience,
  IGetDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import { colors } from "@nepMeds/theme/colors";
import { Download } from "react-iconly";

export const DocUpdateProfile = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        variant="outline"
        mb={"18px"}
        p={4}
      >
        <Image
          w={"159px"}
          h={"159px"}
          src={doctorProfileData?.image}
          fallbackSrc="https://via.placeholder.com/159"
          alt="Caffe Latte"
        />

        <CardBody w={"100%"}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"}>
              <Text
                fontWeight={"700"}
                fontSize={"26.8085px"}
                lineHeight={"32px"}
                color={colors?.dark_1}
                mb={"4px"}
              >
                {doctorProfileData?.user?.first_name}&nbsp;
                {doctorProfileData?.user?.middle_name}&nbsp;
                {doctorProfileData?.user?.last_name}&nbsp;
                {doctorProfileData?.specialization?.length
                  ? `(${doctorProfileData?.specialization?.[0]})`
                  : ""}
              </Text>
              {doctorProfileData?.profile_status === "approved" && (
                <Image
                  ml={"9px"}
                  h={6}
                  w={6}
                  src={images?.verified}
                  alt="verified"
                />
              )}
            </Box>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Icon as={EditIcon} boxSize={5} color={colors?.main} mr={"8px"} />
              <Text
                color={colors?.main}
                fontWeight={"400"}
                fontSize={"16px"}
                lineHeight={"19px"}
              >
                Edit
              </Text>
            </Flex>
          </Box>

          <Text
            fontWeight={"400"}
            fontSize={"16px"}
            lineHeight={"28px"}
            color={"#5B5B5B"}
          >
            {/* Dentists are highly trained individuals who work with patients to
              ensure that their teeth, gums, and mouth are healthy. Dentists are
              highly trained individuals who work with patients to ensure that
              their teeth, gums, and mouth are healthy.Dentists are highly
              trained individuals who work with patients to ensure that their
              teeth, gums, and mouth are healthy. */}
            {doctorProfileData?.bio_detail}
          </Text>
        </CardBody>
      </Card>
      <Card mb={"18px"}>
        <Box p={"20px"} display={"flex"} justifyContent={"space-between"}>
          <Text
            fontWeight={"700"}
            fontSize={"18px"}
            lineHeight={"22px"}
            color={colors?.primary_dark1}
          >
            Primary Information
          </Text>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Icon as={EditIcon} boxSize={5} color={colors?.main} mr={"8px"} />
            <Text
              color={colors?.main}
              fontWeight={"400"}
              fontSize={"16px"}
              lineHeight={"19px"}
            >
              Edit
            </Text>
          </Box>
        </Box>
        <CardBody>
          <Grid templateColumns="repeat(3, 1fr)">
            <GridItem w="100%">
              <VStack spacing={4} align="stretch">
                <Box display={"flex"} alignItems={"center"} gap={3}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    letterSpacing={"0.4px"}
                    color={"#4D4D4D"}
                    w={"86px"}
                  >
                    Province
                  </Text>

                  <Text
                    fontWeight={"500"}
                    fontSize={"16px"}
                    lineHeight={"19px"}
                    color={colors?.black}
                  >
                    :&nbsp;{doctorProfileData?.province}
                  </Text>
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={3}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    letterSpacing={"0.4px"}
                    color={"#4D4D4D"}
                    w={"86px"}
                  >
                    Ward
                  </Text>
                  <Text
                    fontWeight={"500"}
                    fontSize={"16px"}
                    lineHeight={"19px"}
                    color={colors?.black}
                  >
                    :&nbsp;{doctorProfileData?.ward}
                  </Text>
                </Box>
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing={4} align="stretch">
                <Box display={"flex"} alignItems={"center"} gap={3}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    letterSpacing={"0.4px"}
                    color={"#4D4D4D"}
                    w={"86px"}
                  >
                    District
                  </Text>

                  <Text
                    fontWeight={"500"}
                    fontSize={"16px"}
                    lineHeight={"19px"}
                    color={colors?.black}
                  >
                    :&nbsp;{doctorProfileData?.district}
                  </Text>
                </Box>
                <Box display={"flex"} gap={3}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    letterSpacing={"0.4px"}
                    color={"#4D4D4D"}
                    w={"86px"}
                  >
                    Tole
                  </Text>
                  <Text
                    fontWeight={"500"}
                    fontSize={"16px"}
                    lineHeight={"19px"}
                    color={colors?.black}
                  >
                    :&nbsp;{doctorProfileData?.tole}
                  </Text>
                </Box>
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing={4} align="stretch">
                <Box display={"flex"} alignItems={"center"} gap={3}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    letterSpacing={"0.4px"}
                    color={"#4D4D4D"}
                    w={"137px"}
                  >
                    Municipality/ VDC
                  </Text>

                  <Text
                    fontWeight={"500"}
                    fontSize={"16px"}
                    lineHeight={"19px"}
                    color={colors?.black}
                  >
                    :&nbsp;{doctorProfileData?.municipality_vdc}
                  </Text>
                </Box>
                <Box display={"flex"} gap={3}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    letterSpacing={"0.4px"}
                    color={"#4D4D4D"}
                    w={"137px"}
                  >
                    Document
                  </Text>
                  <Box display={"flex"}>
                    <Text
                      fontWeight={"400"}
                      fontSize={"14px"}
                      lineHeight={"23px"}
                      color={colors?.gray_700}
                      mr={"8px"}
                    >
                      :&nbsp;12 PDF
                    </Text>
                    <Download
                      set="light"
                      primaryColor={colors?.main}
                      size={20}
                    />
                  </Box>
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
      <Card mb={"18px"}>
        <Box p={"20px"} display={"flex"} justifyContent={"space-between"}>
          <Text
            fontWeight={"700"}
            fontSize={"18px"}
            lineHeight={"22px"}
            color={colors?.primary_dark1}
          >
            Academic Info
          </Text>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Icon as={EditIcon} boxSize={5} color={colors?.main} mr={"8px"} />
            <Text
              color={colors?.main}
              fontWeight={"400"}
              fontSize={"16px"}
              lineHeight={"19px"}
            >
              Edit
            </Text>
          </Box>
        </Box>
        <CardBody>
          <Grid
            templateColumns={
              doctorProfileData?.doctor_academic_info?.length
                ? "repeat(3, 1fr)"
                : ""
            }
          >
            {doctorProfileData?.doctor_academic_info?.length ? (
              doctorProfileData?.doctor_academic_info?.map(
                (singleAcademicInfo: IDoctorAcademicInfo) => {
                  return (
                    <>
                      <GridItem w="100%">
                        <VStack spacing={4} align="stretch">
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"94px"}
                            >
                              Degree
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleAcademicInfo?.degree_program}
                            </Text>
                          </Box>
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"94px"}
                            >
                              Passed Year
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleAcademicInfo?.graduation_year}
                            </Text>
                          </Box>
                        </VStack>
                      </GridItem>
                      <GridItem w="100%">
                        <VStack spacing={4} align="stretch">
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"94px"}
                            >
                              College/ Uni
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleAcademicInfo?.university}
                            </Text>
                          </Box>
                          <Box display={"flex"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"94px"}
                            >
                              Tole
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;Jhapa
                            </Text>
                          </Box>
                        </VStack>
                      </GridItem>
                      <GridItem w="100%">
                        <VStack spacing={4} align="stretch">
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"137px"}
                            >
                              Major
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleAcademicInfo?.major}
                            </Text>
                          </Box>
                          <Box display={"flex"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"137px"}
                            >
                              Document
                            </Text>
                            <Box display={"flex"}>
                              <Text
                                fontWeight={"400"}
                                fontSize={"14px"}
                                lineHeight={"23px"}
                                color={colors?.gray_700}
                                mr={"8px"}
                              >
                                :&nbsp;12 PDF
                              </Text>
                              <Download
                                set="light"
                                primaryColor={colors?.main}
                                size={20}
                              />
                            </Box>
                          </Box>
                        </VStack>
                      </GridItem>
                    </>
                  );
                }
              )
            ) : (
              <Center>
                <Text>No Data Found</Text>
              </Center>
            )}
          </Grid>
        </CardBody>
      </Card>
      <Card mb={"18px"}>
        <Box p={"20px"} display={"flex"} justifyContent={"space-between"}>
          <Text
            fontWeight={"700"}
            fontSize={"18px"}
            lineHeight={"22px"}
            color={colors?.primary_dark1}
          >
            Certification Info
          </Text>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Icon as={EditIcon} boxSize={5} color={colors?.main} mr={"8px"} />
            <Text
              color={colors?.main}
              fontWeight={"400"}
              fontSize={"16px"}
              lineHeight={"19px"}
            >
              Edit
            </Text>
          </Box>
        </Box>
        <CardBody>
          <Grid
            templateColumns={
              doctorProfileData?.doctor_certification_info?.length
                ? "repeat(3, 1fr)"
                : ""
            }
          >
            {doctorProfileData?.doctor_certification_info?.length ? (
              doctorProfileData?.doctor_certification_info?.map(
                (singleCertificationInfo: IDoctorCertificationInfo) => {
                  return (
                    <>
                      <GridItem w="100%">
                        <VStack spacing={4} align="stretch">
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"90px"}
                            >
                              Title
                            </Text>

                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleCertificationInfo?.title}
                            </Text>
                          </Box>
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"90px"}
                            >
                              Issued Date
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;
                              {singleCertificationInfo?.certificate_issued_data}
                            </Text>
                          </Box>
                        </VStack>
                      </GridItem>
                      <GridItem w="100%">
                        <VStack spacing={4} align="stretch">
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"86px"}
                            >
                              Issued By
                            </Text>

                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleCertificationInfo?.issued_by}
                            </Text>
                          </Box>
                          <Box display={"flex"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"86px"}
                            >
                              Document
                            </Text>
                            <Box display={"flex"}>
                              <Text
                                fontWeight={"400"}
                                fontSize={"14px"}
                                lineHeight={"23px"}
                                color={colors?.gray_700}
                                mr={"8px"}
                              >
                                :&nbsp;12 PDF
                              </Text>
                              <Download
                                set="light"
                                primaryColor={colors?.main}
                                size={20}
                              />
                            </Box>
                          </Box>
                        </VStack>
                      </GridItem>
                      <GridItem w="100%">
                        <VStack spacing={4} align="stretch">
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"137px"}
                            >
                              Credential ID
                            </Text>

                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;
                              {singleCertificationInfo?.certificate_number}
                            </Text>
                          </Box>
                        </VStack>
                      </GridItem>
                    </>
                  );
                }
              )
            ) : (
              <Center>
                <Text>No Data Found</Text>
              </Center>
            )}
          </Grid>
        </CardBody>
      </Card>
      <Card>
        <Box p={"20px"} display={"flex"} justifyContent={"space-between"}>
          <Text
            fontWeight={"700"}
            fontSize={"18px"}
            lineHeight={"22px"}
            color={colors?.primary_dark1}
          >
            Experience Info
          </Text>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Icon as={EditIcon} boxSize={5} color={colors?.main} mr={"8px"} />
            <Text
              color={colors?.main}
              fontWeight={"400"}
              fontSize={"16px"}
              lineHeight={"19px"}
            >
              Edit
            </Text>
          </Box>
        </Box>
        <CardBody>
          <Grid
            templateColumns={
              doctorProfileData?.doctor_experience?.length
                ? "repeat(3, 1fr)"
                : ""
            }
          >
            {doctorProfileData?.doctor_experience?.length ? (
              doctorProfileData?.doctor_experience?.map(
                (singleExperience: IDoctorExperience) => {
                  return (
                    <>
                      <GridItem w="100%">
                        <VStack spacing={4} align="stretch">
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"180px"}
                            >
                              Hospital/ Clinic Name
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleExperience?.hospital}
                            </Text>
                          </Box>
                        </VStack>
                      </GridItem>
                      <GridItem w="100%">
                        <VStack spacing={4} align="stretch">
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"86px"}
                            >
                              From
                            </Text>
                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleExperience?.from_date}
                            </Text>
                          </Box>
                        </VStack>
                      </GridItem>
                      <GridItem w="100%">
                        <VStack spacing={4} align="stretch">
                          <Box display={"flex"} alignItems={"center"} gap={3}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              lineHeight={"16px"}
                              letterSpacing={"0.4px"}
                              color={"#4D4D4D"}
                              w={"137px"}
                            >
                              To
                            </Text>

                            <Text
                              fontWeight={"500"}
                              fontSize={"16px"}
                              lineHeight={"19px"}
                              color={colors?.black}
                            >
                              :&nbsp;{singleExperience?.to_date}
                            </Text>
                          </Box>
                        </VStack>
                      </GridItem>
                    </>
                  );
                }
              )
            ) : (
              <Center>
                <Text>No Data Found</Text>
              </Center>
            )}
          </Grid>
        </CardBody>
      </Card>
    </>
  );
};

export default DocUpdateProfile;
