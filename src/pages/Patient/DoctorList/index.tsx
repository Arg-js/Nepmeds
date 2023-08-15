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
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState<string[]>([]);

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
  const {
    data: doctorData,
    isLoading,
    error: DoctorListError,
  } = useGetDoctorList({
    search: pageParams.search,
    page_size: pageParams.limit,
    page: pageParams.page,
    gender: gender && gender,
    specialization: specialization && specialization.join(", "),
  });

  const { data: doctorInfo, isFetching } = useGetDoctorListById({
    id: doctorId,
    target_date: targetDate || formattedDate,
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
          <SectionHeading
            heading="Doctors List"
            description="Book Appointment with top doctors across various speciality"
          />

          <Flex mt={8}>
            {/* FILTER */}
            <DoctorListFilter
              setGender={setGender}
              setSpecialization={setSpecialization}
            />

            {/* DOCTORS LIST */}
            <Box mx={30}>
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
            <DoctorDetailsSection
              doctorInfo={doctorInfo}
              isFetching={isFetching}
              setTargeDate={setTargeDate}
            />
          </Flex>
          <PatientFooter style={{ margin: "30px" }} />
        </>
      </WrapperBox>
    </>
  );
};

export default DoctorList;
