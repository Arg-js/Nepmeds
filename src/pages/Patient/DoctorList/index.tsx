import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Skeleton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Heading from "@nepMeds/components/Patient/DoctorConsultation/Heading";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import DoctorListCard, { Size } from "@nepMeds/components/Patient/DoctorList";
import { colors } from "@nepMeds/theme/colors";
import DoctorListFilter from "./Section/Filter";
import PatientFooter from "../Section/Footer";
import Header from "@nepMeds/pages/Patient/Section/Header";
import {
  useGetDoctorList,
  useGetDoctorListById,
} from "@nepMeds/service/nepmeds-patient-doctorList";
import Pagination from "@nepMeds/components/Pagination";
import { useState } from "react";
import { BreadCrumb } from "@nepMeds/components/Breadcrumb";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { NoDataIcon } from "@nepMeds/assets/svgs";

const DoctorList = () => {
  const [doctorId, setDoctorId] = useState(0);

  // PAGINATION
  const [pageParams, setPageParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });

  const pageChange = (page: number) => {
    setPageParams({ ...pageParams, page });
  };
  // PAGINATION ENDS

  // REACT QUERIES
  const { data: doctorData, isLoading } = useGetDoctorList({
    search: pageParams.search,
    page_size: pageParams.limit,
    page: pageParams.page,
  });
  const { data: doctorInfo, isFetching } = useGetDoctorListById({
    id: doctorId,
    target_date: "2023-08-13",
  });
  // REACT QUERIES END

  return (
    <>
      <Header />
      <WrapperBox backgroundColor={colors.background_blue} paddingTop={"4"}>
        <>
          <BreadCrumb
            items={[
              {
                name: "Doctor Consultation",
                route: `${NAVIGATION_ROUTES.DOCTOR_CONSULTATION}`,
              },
              {
                name: "Doctor Lists",
                route: `${NAVIGATION_ROUTES.DOCTOR_LIST_PATIENT_MODULE}`,
              },
            ]}
            title={{
              name: "Home",
              route: `${NAVIGATION_ROUTES.DOCTOR_CONSULTATION}`,
            }}
          />
          <Heading
            heading="Doctors List"
            description="Book Appointment with top doctors across various speciality"
          />

          <Flex mt={8}>
            {/* FILTER */}
            <DoctorListFilter />

            {/* DOCTORS LIST */}
            <Box mx={30}>
              <>
                {isLoading && (
                  <Skeleton height={"215px"} width={"673px"}></Skeleton>
                )}
                {doctorData &&
                  doctorData?.results.map(doctorData => {
                    return (
                      <DoctorListCard
                        data={doctorData}
                        size={Size.lg}
                        setDoctorId={setDoctorId}
                        key={doctorData.id}
                      />
                    );
                  })}
                {doctorData && doctorData.count > 5 && (
                  <Pagination
                    enabled={true}
                    queryPageSize={pageParams.limit}
                    queryPageIndex={pageParams.page}
                    pageChange={pageChange}
                    totalCount={doctorData?.count ?? 0}
                  />
                )}
              </>
            </Box>

            {/* TODO: <> </> inside wrapperBox */}
            <WrapperBox
              width={"560px"}
              height={"797px"}
              backgroundColor={colors.white}
              border={`2px solid ${colors.primary}`}
              paddingX={"4"}
              borderRadius={"3px"}
            >
              {doctorInfo ? (
                <Flex direction={"column"} gap={5}>
                  <Flex direction={"column"} alignItems={"center"} gap={4}>
                    <Text
                      fontWeight={600}
                      fontSize={"14px"}
                      color={colors.dark_blue}
                    >
                      Doctor’s Profile
                    </Text>
                    <Avatar size={"lg"} />
                    <Text fontWeight={600} fontSize={"16px"}>
                      {doctorInfo?.name}
                    </Text>
                    <Box textAlign={"center"}>
                      <Text fontWeight={400} fontSize={"12px"}>
                        {/* MBBS, MD - General Medicine - Cardiology */}
                        {doctorInfo?.specialization_names &&
                          doctorInfo?.specialization_names.map(
                            (specializaion_name, index) => {
                              return `${
                                index ===
                                  doctorInfo.specialization_names.length - 1 ||
                                doctorInfo.specialization_names.length === 1
                                  ? specializaion_name.name
                                  : `${specializaion_name.name} - `
                              }`;
                            }
                          )}
                      </Text>
                      <Text fontWeight={400} fontSize={"12px"}>
                        NMC No: 95671
                      </Text>
                    </Box>
                    <Divider borderWidth={"0.5px"} />
                  </Flex>
                  <Flex
                    direction={"column"}
                    justifyContent={"flex-start"}
                    gap={1}
                    px={4}
                  >
                    {/* TODO: same component */}
                    <Text fontWeight={700} fontSize={"13px"}>
                      About
                    </Text>
                    <Text fontWeight={400} fontSize={"12px"}>
                      {doctorInfo?.bio_detail}
                    </Text>
                  </Flex>
                  <Flex
                    bg={colors.sky_blue}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    p={2}
                    px={3.5}
                    borderRadius={"8px"}
                  >
                    <Text
                      fontWeight={590}
                      fontSize={"13px"}
                      color={colors.primary}
                    >
                      Consultation Fee
                    </Text>
                    <Text
                      fontWeight={500}
                      fontSize={"16px"}
                      color={colors.forest_green}
                    >
                      NRs. {doctorInfo.schedule_rate}
                    </Text>
                  </Flex>
                  <Divider borderWidth={"0.5px"} />
                  {/* TODO: same component */}
                  <Text fontWeight={700} fontSize={"13px"}>
                    Available time
                  </Text>
                  <Flex gap={3}>
                    <Button
                      color={colors.primary}
                      px={3}
                      py={2}
                      variant={"ghost"}
                      border={`1px solid ${colors.primary}`}
                      // width={"min-content"}
                      width={"126px"}
                      fontSize={"14px"}
                    >
                      11:30 AM
                    </Button>
                    <Button
                      color={colors.primary}
                      px={3}
                      py={2}
                      variant={"ghost"}
                      border={`1px solid ${colors.primary}`}
                      // width={"min-content"}
                      width={"126px"}
                      fontSize={"14px"}
                    >
                      11:30 AM
                    </Button>
                    <Button
                      color={colors.primary}
                      px={3}
                      py={2}
                      variant={"ghost"}
                      border={`1px solid ${colors.primary}`}
                      // width={"min-content"}
                      width={"126px"}
                      fontSize={"14px"}
                    >
                      11:30 AM
                    </Button>
                  </Flex>
                </Flex>
              ) : (
                <VStack
                  justifyContent={"center"}
                  alignContent={"center"}
                  // width={"544px"}
                  // height={"700px"}
                  mt={30}
                >
                  {isFetching ? (
                    <Spinner />
                  ) : (
                    <>
                      <NoDataIcon />
                      <Text
                        fontWeight={700}
                        fontSize={"16px"}
                        color={colors.red_700}
                      >
                        There are no details here.
                      </Text>
                      <Text fontWeight={400} fontSize={"12px"}>
                        Please Click on the doctor list to view detail doctor’s
                        profile.
                      </Text>
                    </>
                  )}
                </VStack>
              )}
            </WrapperBox>
          </Flex>
          <PatientFooter />
        </>
      </WrapperBox>
    </>
  );
};

export default DoctorList;
