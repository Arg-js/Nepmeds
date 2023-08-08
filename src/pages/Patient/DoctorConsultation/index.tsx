import Card from "@nepMeds/components/Patient/DoctorConsultation/Card";
import Header from "@nepMeds/components/Patient/DoctorConsultation/Header";
import HeroSection from "@nepMeds/components/Patient/DoctorConsultation/HeroSection";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";
import ConsultationStepSection from "./Section/CosultationStep";
import ChooseUsSection from "./Section/ChooseUs";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
import heroSectionBg from "@nepMeds/assets/images/heroSectionBg.png";

const DoctorConsultation = () => {
  const { data: specializaionData = [] } = useSpecializationRegisterData();
  return (
    <>
      <WrapperBox backgroundImage={`url(${heroSectionBg})`}>
        <HeroSection />
      </WrapperBox>
      <WrapperBox backgroundColor={colors.background_blue}>
        <>
          {/* Specialist Doctors SECTION*/}
          <Header
            heading={"Our Specialist Doctors"}
            description={"Consult with top doctors across specialities"}
            btnText={"View All Doctors"}
          />
          <Card data={specializaionData} />

          {/* Health Concern / Symptoms SECTION */}
          <Header
            heading={"Common Health Concern"}
            description="Consult a doctor online for any health issue"
            btnText={"View All Symptoms"}
          />
          <Card data={specializaionData} />

          {/* ADVERTISEMENT SECTION */}
          <WrapperBox height={"420px"} />

          {/* Doctors SECTION */}
          <Header
            heading={"Our Doctors"}
            description="We hire best specialists to deliver top-notch services for you"
            btnText="View All Doctors"
          />
          <Card data={specializaionData} />

          {/* DOCTOR CONSULTATION WORKING STEPS */}
          <ConsultationStepSection />

          {/* ADVERTISEMENT SECTION */}
          <WrapperBox height={"470.86px"} />

          {/* WHY CHOOSE US SECTION */}
          <ChooseUsSection />

          {/* FOOTER SECTION */}
          <WrapperBox height={"517px"} backgroundColor={colors.white} />
        </>
      </WrapperBox>
    </>
  );
};

export default DoctorConsultation;
