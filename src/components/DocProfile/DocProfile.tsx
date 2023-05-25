import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  PrimaryInfoForm,
  BasicInfoForm,
  ExperienceForm,
  AcademicInfoForm,
  CertificationInfoForm,
} from "../FormComponents";
import { FormProvider, useForm } from "react-hook-form";
import { useDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";

const DocProfile = () => {
  const method = useForm();
  const { data } = useDoctorProfile();
  return (
    <Tabs position="relative" variant="unstyled">
      <TabList>
        <Tab>Profile</Tab>
        <Tab>Primary Info</Tab>
        <Tab>Academic Info</Tab>
        <Tab>Certification Info</Tab>
        <Tab>Experience</Tab>
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
      <TabPanels>
        <FormProvider {...method}>
          <TabPanel>
            <BasicInfoForm hidePasswordField={false} />
          </TabPanel>
        </FormProvider>
        <FormProvider {...method}>
          <TabPanel>
            <PrimaryInfoForm />
          </TabPanel>
        </FormProvider>
        <FormProvider {...method}>
          <TabPanel>
            <AcademicInfoForm />
          </TabPanel>
        </FormProvider>
        <FormProvider {...method}>
          <TabPanel>
            <CertificationInfoForm />
          </TabPanel>
        </FormProvider>
        <FormProvider {...method}>
          <TabPanel>
            <ExperienceForm />
          </TabPanel>
        </FormProvider>
      </TabPanels>
    </Tabs>
  );
};

export default DocProfile;
