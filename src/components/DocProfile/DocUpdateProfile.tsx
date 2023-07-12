import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import EditBasic from "./EditDoctor/EditBasic";
import EditPrimary from "./EditDoctor/EditPrimary";
import EditAcademic from "./EditDoctor/EditAcademic";
import EditCertification from "./EditDoctor/EditCertification";
import EditExperience from "./EditDoctor/EditExperience";
import {
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

// export const DocUpdateProfile = ({
//   doctorProfileData,
// }: {
//   doctorProfileData: IGetDoctorProfile;
// }) => {
//   return (
//     <>
//       <EditBasic doctorProfileData={doctorProfileData} />
//       <EditPrimary doctorProfileData={doctorProfileData} />
//       <EditAcademic doctorProfileData={doctorProfileData} />
//       <EditCertification doctorProfileData={doctorProfileData} />
//       <EditExperience doctorProfileData={doctorProfmergeileData} />
//     </>
//   );
// };

// export default DocUpdateProfile;

export const DocUpdateProfile = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const tabs = [
    "Registration",
    "Primary Info",
    "Academic Info",
    "Certification Info",
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
      component: <EditAcademic doctorProfileData={doctorProfileData} />,
    },
    {
      component: <EditCertification doctorProfileData={doctorProfileData} />,
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
                    px={16}
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
