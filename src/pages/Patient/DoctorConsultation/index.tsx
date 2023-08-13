import Card from "@nepMeds/components/Patient/DoctorConsultation/Card";
import SectionHeading from "@nepMeds/components/Patient/DoctorConsultation/SectionHeading";
import HeroSection from "@nepMeds/components/Patient/DoctorConsultation/HeroSection";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";
import ConsultationStepSection from "./Section/CosultationStep";
import ChooseUsSection from "./Section/ChooseUs";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
import heroSectionBg from "@nepMeds/assets/images/heroSectionBg.png";
import advertisement1 from "@nepMeds/assets/images/advertisement1.png";
import advertisement2 from "@nepMeds/assets/images/advertisement2.png";
import { Box, Image } from "@chakra-ui/react";
import PatientFooter from "../Section/Footer";
import { useGetSymptoms } from "@nepMeds/service/nepmeds-symptoms";
import Header from "@nepMeds/pages/Patient/Section/Header";
import DoctorListCard, { Size } from "@nepMeds/components/Patient/DoctorList";
import { useGetDoctorList } from "@nepMeds/service/nepmeds-patient-doctorList";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import Carousel from "better-react-carousel";
import { useState } from "react";

const DoctorConsultation = () => {
  // Pagination
  const [pageParams, _setPageParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });
  // Pagination ends

  // REACT QUERIES
  const { data: specializaionData = [] } = useSpecializationRegisterData();
  const { data: symptomData = [] } = useGetSymptoms();
  const { data: doctorList } = useGetDoctorList({
    search: pageParams.search,
    page_size: pageParams.limit,
    page: pageParams.page,
  });
  // REACT QUERIES END

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <WrapperBox backgroundImage={`url(${heroSectionBg})`}>
        <HeroSection />
      </WrapperBox>
      <WrapperBox backgroundColor={colors.background_blue}>
        <>
          {/* Specialist Doctors SECTION*/}
          <SectionHeading
            heading={"Our Specialist Doctors"}
            description={"Consult with top doctors across specialities"}
            // btnText={"View All Doctors"}
          />
          <Box my={10}>
            <Card data={specializaionData} type={0} />
          </Box>

          {/* Health Concern / Symptoms SECTION */}
          <SectionHeading
            heading={"Common Health Concern"}
            description="Consult a doctor online for any health issue"
            // btnText={"View All Symptoms"}
          />

          <Box my={10}>
            <Card data={symptomData} type={1} />
          </Box>

          {/* ADVERTISEMENT SECTION */}
          <Box height={"420px"}>
            <Image
              src={advertisement1}
              alt="advertisement"
              objectFit={"contain"}
            />
          </Box>

          {/* Doctors SECTION */}

          <SectionHeading
            heading={"Our Doctors"}
            description="We hire best specialists to deliver top-notch services for you"
            btnText="View All Doctors"
            onClick={() =>
              navigate(NAVIGATION_ROUTES.DOCTOR_LIST_PATIENT_MODULE)
            }
          />
          <Carousel cols={6} rows={1} gap={20} loop>
            {/* <Flex gap={5} mb={10}> */}
            {doctorList?.results &&
              doctorList.results.map(doctor => {
                return (
                  <Carousel.Item key={doctor.id}>
                    <DoctorListCard
                      data={doctor}
                      size={Size.sm}
                      key={doctor.id}
                    />
                  </Carousel.Item>
                );
              })}
            {/* </Flex> */}
          </Carousel>

          {/* DOCTOR CONSULTATION WORKING STEPS */}
          <Box mt={10}>
            <ConsultationStepSection />
          </Box>

          {/* ADVERTISEMENT SECTION */}
          <Box height={"470.86px"} my={10}>
            <Image src={advertisement2} alt="advertisement" />
          </Box>

          {/* WHY CHOOSE US SECTION */}
          <ChooseUsSection />

          {/* FOOTER SECTION */}
        </>
      </WrapperBox>
      <Box bg={colors.background_blue}>
        <PatientFooter />
      </Box>
    </>
  );
};

export default DoctorConsultation;
