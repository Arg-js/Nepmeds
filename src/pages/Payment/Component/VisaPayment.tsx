import { Box, Grid, GridItem } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import Header from "@nepMeds/pages/Patient/Section/Header";
import { useSearchParams } from "react-router-dom";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import DoctorDetailView from "@nepMeds/components/DocProfile/DoctorDetailView";
import { importScript } from "@nepMeds/utils/importScript";

const VisaPayment = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  importScript({
    resourceUrl: import.meta.env.VITE_APP_VISA_BUNDLE_URL,
    shouldRunCleanUp: true,
    scriptId: "checkout-script",
  });

  return (
    <Box bg={colors.white} height={"100vh"}>
      <Header />
      <WrapperBox>
        <Grid
          templateColumns={{ lg: "repeat(3,1fr)", xl: "repeat(12,1fr)" }}
          justifyContent={"center"}
          gap={5}
        >
          <GridItem colSpan={{ lg: 2, xl: 7 }}>
            <DoctorDetailView id={id ?? ""} />
          </GridItem>

          <GridItem colSpan={{ lg: 1, xl: 5 }}>
            <div id="checkout"></div>
          </GridItem>
        </Grid>
      </WrapperBox>
    </Box>
  );
};

export default VisaPayment;
