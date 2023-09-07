import {
  Box,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import SectionHeading from "@nepMeds/components/Patient/DoctorConsultation/SectionHeading";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import DoctorListCard, {
  Size,
} from "@nepMeds/components/Patient/DoctorList/DoctorListCard";
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
import DoctorDetailsSection from "@nepMeds/pages/Patient/DoctorList/Section/DoctorDetails";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { useGetAvailability } from "@nepMeds/service/nepmeds-patient-doctor-availability";
import { useLocation } from "react-router-dom";

const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 10);

const DoctorList = () => {
  const { state }: { state: any } = useLocation();

  const [doctorId, setDoctorId] = useState(0);
  const [targetDate, setTargeDate] = useState(formattedDate);
  const [gender, setGender] = useState<string[]>([]);
  const [specialization, setSpecialization] = useState<string[]>(
    state?.specialization ? [state.specialization] : []
  );
  const [symptom, setSymptom] = useState<string[]>(
    state?.symptom ? [state.symptom] : []
  );
  const [search, setSearchValue] = useState("");
  const [dateParams, setDateParams] = useState({
    from_date: "",
    to_date: "",
  });

  // PAGINATION
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 5,
  });

  const pageChange = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This adds smooth scrolling animation
    });
    setPageParams({ ...pageParams, page });
  };
  // PAGINATION ENDS

  const debouncedInputValue = useDebounce(search, 500);

  // REACT QUERIES
  const {
    data: doctorData,
    isLoading,
    error: DoctorListError,
  } = useGetDoctorList({
    page_size: pageParams.limit,
    page: pageParams.page,
    gender: gender?.join(","),
    specialization: specialization?.join(","),
    symptom: symptom?.join(","),
    search: debouncedInputValue,
    from_date: dateParams.from_date,
    to_date: dateParams.to_date,
  });

  const { data: doctorInfo, isFetching } = useGetDoctorListById({
    id: doctorId,
    target_date: targetDate || formattedDate,
  });
  const { data: availability, isFetching: isAvailabilityFetching } =
    useGetAvailability({
      id: doctorId,
      target_date: targetDate || formattedDate,
    });
  // REACT QUERIES END

  return (
    <>
      <Header />
      <WrapperBox backgroundColor={colors.background_blue}>
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
          <SectionHeading
            heading="Doctors List"
            description="Book Appointment with top doctors across various specialty"
          />

          <Grid
            templateColumns={{
              base: "repeat(3, 1fr)",
              md: "repeat(11, 1fr)",
              "2xl": "repeat(10, 1fr)",
            }}
            columnGap={{ base: 2, lg: 4, xl: 10 }}
          >
            {/* FILTER */}
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <DoctorListFilter
                setGender={setGender}
                setSpecialization={setSpecialization}
                setSymptom={setSymptom}
                setSearchValue={setSearchValue}
                setDateParams={setDateParams}
                dateParams={dateParams}
                setPageParams={setPageParams}
                pageParams={pageParams}
              />
            </GridItem>

            <GridItem colSpan={{ base: 1, lg: 5, "2xl": 4 }}>
              <Box>
                <>
                  {isLoading && (
                    <Grid templateColumns={"repeat(5,1fr)"}>
                      <GridItem colSpan={2}>
                        <Skeleton height="176px" />
                      </GridItem>
                      <GridItem colSpan={3} m={4}>
                        <Grid templateColumns={"repeat(2, 1fr)"} gap={5}>
                          <GridItem colSpan={2}>
                            <SkeletonText
                              noOfLines={2}
                              spacing="4"
                              skeletonHeight="2"
                            />
                          </GridItem>
                          <GridItem colStart={1}>
                            <Flex direction={"column"} gap={3}>
                              <SkeletonText
                                noOfLines={2}
                                spacing="4"
                                skeletonHeight="2"
                              />
                              <SkeletonText
                                noOfLines={2}
                                spacing="4"
                                skeletonHeight="2"
                              />
                            </Flex>
                          </GridItem>
                        </Grid>
                      </GridItem>
                    </Grid>
                  )}

                  {doctorData && !doctorData?.results.length && (
                    <Box width="673px" height="215px">
                      No Data to be shown!
                    </Box>
                  )}
                  {DoctorListError && (
                    <Box width="673px" height="215px">
                      Oops something went wrong!!
                    </Box>
                  )}
                  {doctorData &&
                    doctorData?.results.map(doctorData => {
                      return (
                        <Box key={doctorData.id} mb={6}>
                          <DoctorListCard
                            data={doctorData}
                            size={Size.lg}
                            setDoctorId={setDoctorId}
                            doctorId={doctorId}
                          />
                        </Box>
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
            </GridItem>

            <GridItem colSpan={{ base: 1, lg: 4, "2xl": 4 }}>
              <Box>
                <DoctorDetailsSection
                  doctorInfo={doctorInfo}
                  availability={availability}
                  isAvailabilityFetching={isAvailabilityFetching}
                  isFetching={isFetching}
                  setTargeDate={setTargeDate}
                />
              </Box>
            </GridItem>
          </Grid>
        </>
      </WrapperBox>
      <PatientFooter />
    </>
  );
};

export default DoctorList;
