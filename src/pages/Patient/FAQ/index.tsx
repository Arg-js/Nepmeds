import { Box, Container, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { BreadCrumb } from "@nepMeds/components/Breadcrumb";
import SkeletonControl from "@nepMeds/components/Loader";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import SearchInput from "@nepMeds/components/Search";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useGetALLFaq } from "@nepMeds/service/nepmeds-faq";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import MoreInfoSection from "../DoctorConsultation/Section/FAQ/Component/MoreInfoSection";
import PatientFooter from "../Section/Footer";
import Header from "../Section/Header";

const PatientFAQ = () => {
  // PAGINATION PARAMS
  const [_pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // PAGINATION PARAMS ENDS
  const [searchValue, setSearchValue] = useState("");
  const debouncedInputValue = useDebounce(searchValue, 500);

  // React Query
  const { data: faqList, isLoading } = useGetALLFaq({
    pageIndex: 0,
    pageSize: 10,
    search: debouncedInputValue,
  });
  // React Query Ends

  return (
    <>
      <Header />
      {/* HEADER */}
      <Box bgColor={colors.sky_blue} p={5}>
        <BreadCrumb
          items={[
            {
              name: "Frequently Asked Questions",
              route: `${NAVIGATION_ROUTES.PATIENT.FAQ}`,
            },
          ]}
          title={{
            name: "Home",
            route: `${NAVIGATION_ROUTES.PATIENT.DOCTOR_CONSULTATION}`,
          }}
        />
        <Container textAlign={"center"} py={14}>
          <Text fontSize={"sm"} fontWeight={600} color={colors.black_40}>
            FAQs
          </Text>
          <Text fontSize={"36px"} color={colors.primary_blue} fontWeight={600}>
            Ask us anything
          </Text>
          <Text fontSize={"md"} fontWeight={400} color={colors.black_40}>
            Have any questions? We&apos;re here to assist you.
          </Text>
          {/* TODO: check why why it needed justifyContent to align it to center when no other elements needed this; */}
          <Flex justifyContent={"center"} mt={4}>
            <SearchInput
              setSearchValue={setSearchValue}
              setPageParams={setPageParams}
            />
          </Flex>
        </Container>
      </Box>
      {/* HEADER ENDS */}

      {/* BODY */}
      <WrapperBox bgColor={colors.background_blue}>
        <>
          <SimpleGrid minChildWidth={"300px"}>
            {isLoading ? (
              <SkeletonControl variant={"skeletonText"} length={15} m={8} />
            ) : (
              faqList?.map(faq => (
                <Box key={faq.question} m={8}>
                  <Text
                    fontWeight={600}
                    fontSize={"xl"}
                    color={colors.black_50}
                    mb={4}
                  >
                    {faq.question}
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize={"md"}
                    color={colors.black_40}
                  >
                    {faq.answer}
                  </Text>
                </Box>
              ))
            )}
          </SimpleGrid>
          <MoreInfoSection
            infoText={"contact our Officials Desk"}
            btnText={"Get in Touch"}
          />
        </>
      </WrapperBox>
      {/* BODY ENDS */}
      <PatientFooter />
      {/* TODO: pagination  */}
    </>
  );
};

export default PatientFAQ;
