import { Box, Flex, Skeleton } from "@chakra-ui/react";
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

const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 10);

const DoctorList = () => {
  const [doctorId, setDoctorId] = useState(0);
  const [targetDate, setTargeDate] = useState(formattedDate);
  const [gender, setGender] = useState<string[]>([]);
  const [specialization, setSpecialization] = useState<string[]>([]);
  const [symptom, setSymptom] = useState<string[]>([]);
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
    search,
    from_date: dateParams.from_date,
    to_date: dateParams.to_date,
  });

  const { data: doctorInfo, isFetching } = useGetDoctorListById({
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
            description="Book Appointment with top doctors across various speciality"
          />

          <Flex mt={8} direction={{ base: "column", md: "row" }}>
            {/* FILTER */}
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

            <Flex
              direction={{ base: "column", "2xl": "row" }}
              alignItems={{ base: "center", "2xl": "flex-start" }}
            >
              {/* DOCTORS LIST */}
              <Box mx={{ base: "0", md: "30" }}>
                <>
                  {isLoading && <Skeleton height={"215px"} width={"673px"} />}
                  {DoctorListError && (
                    <Box width={"673px"} height={"215px"}>
                      Oops something went wrong!!
                    </Box>
                  )}
                  {doctorData &&
                    doctorData?.results.map(doctorData => {
                      return (
                        <Box key={doctorData.id}>
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

              <DoctorDetailsSection
                doctorInfo={doctorInfo}
                isFetching={isFetching}
                setTargeDate={setTargeDate}
              />
            </Flex>
          </Flex>
        </>
      </WrapperBox>
      <PatientFooter />
    </>
  );
};

export default DoctorList;
