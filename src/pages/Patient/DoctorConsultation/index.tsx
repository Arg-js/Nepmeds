import { Box, Image } from "@chakra-ui/react";
import advertisement1 from "@nepMeds/assets/images/advertisement1.png";
import advertisement2 from "@nepMeds/assets/images/advertisement2.png";
import heroSectionBg from "@nepMeds/assets/images/heroSectionBg.png";
import Card from "@nepMeds/components/Patient/DoctorConsultation/Card";
import Heading from "@nepMeds/components/Patient/DoctorConsultation/Heading";
import HeroSection from "@nepMeds/components/Patient/DoctorConsultation/HeroSection";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import DoctorListCard from "@nepMeds/components/Patient/DoctorList";
import Header from "@nepMeds/pages/Patient/Section/Header";
import { useGetDoctorList } from "@nepMeds/service/nepmeds-patient-doctorList";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
import { useGetSymptoms } from "@nepMeds/service/nepmeds-symptoms";
import { colors } from "@nepMeds/theme/colors";
import PatientFooter from "../Section/Footer";
import ChooseUsSection from "./Section/ChooseUs";
import ConsultationStepSection from "./Section/CosultationStep";

const DoctorConsultation = () => {
  const { data: specializaionData = [] } = useSpecializationRegisterData();
  const { data: symptomData = [] } = useGetSymptoms();
  const { data: doctorList } = useGetDoctorList();

  return (
    <>
      <Header />
      <WrapperBox backgroundImage={`url(${heroSectionBg})`}>
        <HeroSection />
      </WrapperBox>
      <WrapperBox backgroundColor={colors.background_blue}>
        <>
          {/* Specialist Doctors SECTION*/}
          <Heading
            heading={"Our Specialist Doctors"}
            description={"Consult with top doctors across specialities"}
            btnText={"View All Doctors"}
          />
          <Card data={specializaionData} type={0} />

          {/* Health Concern / Symptoms SECTION */}
          <Heading
            heading={"Common Health Concern"}
            description="Consult a doctor online for any health issue"
            btnText={"View All Symptoms"}
          />
          <Card data={symptomData} type={1} />

          {/* ADVERTISEMENT SECTION */}
          <Box height={"420px"}>
            <Image
              src={advertisement1}
              alt="advertisement"
              objectFit={"contain"}
            />
          </Box>

          {/* Doctors SECTION */}

          <Heading
            heading={"Our Doctors"}
            description="We hire best specialists to deliver top-notch services for you"
            btnText="View All Doctors"
          />

          {doctorList?.results &&
            doctorList.results.map(doctor => {
              return <DoctorListCard data={doctor} key={doctor.id} />;
            })}

          {/* DOCTOR CONSULTATION WORKING STEPS */}
          <ConsultationStepSection />

          {/* ADVERTISEMENT SECTION */}
          <Box height={"470.86px"} my={10}>
            <Image src={advertisement2} alt="advertisement" />
          </Box>

          {/* WHY CHOOSE US SECTION */}
          <ChooseUsSection />

          {/* FOOTER SECTION */}
          <PatientFooter />
        </>
      </WrapperBox>
    </>
  );
};

export default DoctorConsultation;
