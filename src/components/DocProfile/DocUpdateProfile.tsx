import {
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import EditAcademic from "@nepMeds/components/DocProfile/EditDoctor/EditAcademic";
import EditBasic from "@nepMeds/components/DocProfile/EditDoctor/EditBasic";
import EditCertification from "@nepMeds/components/DocProfile/EditDoctor/EditCertification";
import EditExperience from "@nepMeds/components/DocProfile/EditDoctor/EditExperience";
import EditPrimary from "@nepMeds/components/DocProfile/EditDoctor/EditPrimary";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { colors } from "@nepMeds/theme/colors";

export const DocUpdateProfile = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const tabs = [
    "Profile",
    "Primary Info",
    "NMC Info",
    "Academic Info",
    "Experience",
  ];
  const tabPanels = [
    {
      component: <EditBasic doctorProfileData={doctorProfileData} />,
    },
    {
      component: <EditPrimary doctorProfileData={doctorProfileData} />,
    },
    {
      component: <EditCertification doctorProfileData={doctorProfileData} />,
    },
    {
      component: <EditAcademic doctorProfileData={doctorProfileData} />,
    },
    {
      component: <EditExperience doctorProfileData={doctorProfileData} />,
    },
  ];
  return (
    <>
      <Tabs
        position={"relative"}
        orientation="vertical"
        flexDirection={"column"}
      >
        <Grid templateColumns="repeat(11, 1fr)" gap={0}>
          <GridItem colSpan={3}>
            <TabList borderInlineStart={""}>
              {tabs.map((tab, idx) => {
                return (
                  <Tab
                    bg={colors.white}
                    borderRadius="md"
                    key={idx}
                    my={1}
                    py={3}
                    _selected={{ color: "white", bg: colors.main }}
                  >
                    {tab}
                  </Tab>
                );
              })}
            </TabList>
          </GridItem>
          <GridItem colSpan={8}>
            <TabPanels>
              {tabPanels.map((tabPanel, idx) => {
                return (
                  <TabPanel pl={3} py={0} key={idx}>
                    {tabPanel.component}
                  </TabPanel>
                );
              })}
            </TabPanels>
          </GridItem>
        </Grid>
      </Tabs>
    </>
  );
};

export default DocUpdateProfile;
