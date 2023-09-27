import Card from "@nepMeds/components/Patient/DoctorConsultation/Card";
import SectionHeading from "@nepMeds/components/Patient/DoctorConsultation/SectionHeading";
import HeroSection from "@nepMeds/components/Patient/DoctorConsultation/HeroSection";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
import heroSectionBg from "@nepMeds/assets/images/heroSectionBg.png";
import advertisement1 from "@nepMeds/assets/images/advertisement1.png";
import advertisement2 from "@nepMeds/assets/images/advertisement2.png";
import { Box, Flex, Image } from "@chakra-ui/react";
import PatientFooter from "../Section/Footer";
import { useGetSymptoms } from "@nepMeds/service/nepmeds-symptoms";
import Header from "@nepMeds/pages/Patient/Section/Header";
import DoctorListCard, {
  Size,
} from "@nepMeds/components/Patient/DoctorList/DoctorListCard";
import { useGetDoctorList } from "@nepMeds/service/nepmeds-patient-doctorList";
import { useLocation, useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useState } from "react";
import { AxiosError } from "axios";
import { colors } from "@nepMeds/theme/colors";
import ChooseUsSection from "./Section/ChooseUs";
import ConsultationStepSection from "./Section/CosultationStep";
import Carousel from "react-multi-carousel";
import { useAuthenticatePatient } from "@nepMeds/service/nepmeds-patient-login";
import { useEffect } from "react";
import TokenService from "@nepMeds/service/service-token";

export enum Type {
  SPECIALIST,
  SYMPTOM,
  DOCTOR,
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1440 },
    slidesToSlide: 3,
    items: 7.5,
  },
  laptopLarge: { breakpoint: { max: 1440, min: 1024 }, items: 5.5 },
  laptop: { breakpoint: { max: 1024, min: 768 }, items: 3.5 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};
const responsiveDoctorCard = {
  ...responsive,
  desktop: { ...responsive.desktop, items: 6.5 },
  laptopLarge: { ...responsive.laptopLarge, items: 5 },
  laptop: { ...responsive.laptop, items: 3.2 },
  tablet: { breakpoint: { max: 768, min: 464 }, slidesToSlide: 1, items: 2 },
};
const DoctorConsultation = () => {
  // Pagination
  const [pageParams, _setPageParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });
  // Pagination ends

  // REACT QUERIES
  const {
    data: specializationData = [],
    isLoading: SpecializationDataLoading,
    error: specializationDataError,
  } = useSpecializationRegisterData();

  const {
    data: symptomData = [],
    isLoading: symptomDataLoading,
    error: symptomDataError,
  } = useGetSymptoms();

  const { data: doctorList, error: doctorListError } = useGetDoctorList({
    search: pageParams.search,
    page_size: pageParams.limit,
    page: pageParams.page,
  });

  const { mutateAsync: authenticatePatient } = useAuthenticatePatient();
  // REACT QUERIES END

  const location = useLocation();
  const authenticate = async () => {
    try {
      if (location.search) {
        const response = await authenticatePatient({
          patientToken: location.search.replace("?key=", ""),
        });
        TokenService.setToken({
          access: response?.data?.data?.[0]?.access,
          refresh: TokenService?.getToken()?.refresh || "",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  const navigate = useNavigate();

  const handleViewSpecialists = (specialization: string) => {
    navigate(NAVIGATION_ROUTES.DOCTOR_LIST_PATIENT_MODULE, {
      state: {
        specialization,
      },
    });
  };

  const handleViewSymptom = (symptom: string) => {
    navigate(NAVIGATION_ROUTES.DOCTOR_LIST_PATIENT_MODULE, {
      state: {
        symptom,
      },
    });
  };

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
            description={"Consult with top doctors across specialties"}
            btnText={"View All Specialists"}
            onClick={() =>
              navigate(NAVIGATION_ROUTES.DOCTOR_LIST_PATIENT_MODULE)
            }
          />

          <Box my={7.5}>
            <Carousel responsive={responsive}>
              {specializationData?.map(specialization => {
                return (
                  <Box
                    key={specialization.id}
                    onClick={() => handleViewSpecialists(specialization.name)}
                  >
                    <Card
                      name={specialization.name}
                      image={specialization.image}
                      description={
                        specialization?.symptom_list?.slice(0, 5) ?? []
                      }
                      isLoading={SpecializationDataLoading}
                      error={specializationDataError as AxiosError}
                    />
                  </Box>
                );
              })}
            </Carousel>
          </Box>

          {/* Health Concern / Symptoms SECTION */}
          <SectionHeading
            heading={"Common Health Concern"}
            description="Consult a doctor online for any health issue"
            btnText={"View All Symptoms"}
            onClick={() =>
              navigate(NAVIGATION_ROUTES.DOCTOR_LIST_PATIENT_MODULE)
            }
          />

          <Box my={7.5}>
            <Carousel responsive={responsive}>
              {symptomData?.map(symptom => {
                return (
                  <Box
                    key={symptom.id}
                    onClick={() => handleViewSymptom(symptom.name)}
                  >
                    <Card
                      name={symptom.name}
                      image={symptom.image}
                      description={symptom.description}
                      isLoading={symptomDataLoading}
                      error={symptomDataError as AxiosError}
                    />
                  </Box>
                );
              })}
            </Carousel>
          </Box>

          {/* ADVERTISEMENT SECTION */}
          <Box my={{ base: 5, md: 10 }}>
            <Image
              width="100%"
              src={advertisement1}
              alt="advertisement"
              objectFit="contain"
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

          {(doctorListError as AxiosError)?.response?.status === 500 ? (
            <Flex width={"255px"} height={"282px"} alignItems={"center"}>
              Oops something went wrong!!
            </Flex>
          ) : (
            doctorList?.results && (
              <Carousel responsive={responsiveDoctorCard}>
                {doctorList.results.map(doctor => {
                  return (
                    <Box
                      key={doctor.id}
                      mr={4}
                      onClick={() =>
                        navigate(
                          `${NAVIGATION_ROUTES.DOCTOR_DETAILS}/${doctor.id}`,{state:{formState:0}}
                        )
                      }
                    >
                      <DoctorListCard
                        data={doctor}
                        error={doctorListError as AxiosError}
                        size={Size.sm}
                      />
                    </Box>
                  );
                })}
              </Carousel>
            )
          )}

          {/* DOCTOR CONSULTATION WORKING STEPS */}
          <Box mt={10}>
            <ConsultationStepSection />
          </Box>

          {/* ADVERTISEMENT SECTION */}
          <Box my={{ base: 5, md: 10 }}>
            <Image width={"100%"} src={advertisement2} alt="advertisement" />
          </Box>

          {/* WHY CHOOSE US SECTION */}
          <ChooseUsSection />
        </>
      </WrapperBox>
      {/* FOOTER SECTION */}
      <Box bg={colors.background_blue}>
        <PatientFooter />
      </Box>
    </>
  );
};

export default DoctorConsultation;
