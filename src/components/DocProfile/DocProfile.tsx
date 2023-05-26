import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import {
  IGetDoctorProfile,
  useDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import DocUpdateProfile from "./DocUpdateProfile";
import DocAppointments from "./DocAppointments";
import DocPayments from "./DocPayments";
import DocRatingAndFeedbacks from "./DocRatingAndFeedbacks";

const DocProfile = () => {
  const method = useForm();
  const { data: doctorProfileData } = useDoctorProfile();
  return (
    <VStack align={"stretch"} p={4}>
      <Tabs position="relative" variant="unstyled">
        <TabList bg="white" px={6} pt={5} pb={6} borderRadius={"xl"}>
          <Tab>Update Profile</Tab>
          <Tab>Appointments</Tab>
          <Tab>Payments</Tab>
          <Tab>Rating & Feedbacks</Tab>
        </TabList>
        <TabIndicator
          mt="-20px"
          height="4px"
          bg="blue.500"
          transform="scaleX(0.9)"
        />
        <TabPanels sx={{ "&>div": { px: "0px" } }}>
          <FormProvider {...method}>
            <TabPanel>
              <DocUpdateProfile
                doctorProfileData={
                  doctorProfileData ?? ({} as IGetDoctorProfile)
                }
              />
            </TabPanel>
          </FormProvider>
          <FormProvider {...method}>
            <TabPanel>
              <DocAppointments />
            </TabPanel>
          </FormProvider>
          <FormProvider {...method}>
            <TabPanel>
              <DocPayments />
            </TabPanel>
          </FormProvider>
          <FormProvider {...method}>
            <TabPanel>
              <DocRatingAndFeedbacks />
            </TabPanel>
          </FormProvider>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default DocProfile;
