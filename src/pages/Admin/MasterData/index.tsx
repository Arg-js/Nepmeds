import {
  Grid,
  GridItem,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure
} from "@chakra-ui/react";
import { CustomButton } from "@nepMeds/components/Button/Button";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import Specializations from "./Specialist";
import Symptoms from "./Symptoms";

import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import CollegeTab from "./College";
import HospitalTab from "./Hospital";

const MasterData = () => {
  const {
    onOpen: onOpenSymptoms,
    onClose: onCloseSymptoms,
    isOpen: isSymptomsOpen
  } = useDisclosure();

  const {
    onOpen: onOpenSpecialization,
    onClose: onCloseSpecialization,
    isOpen: isSpecializationOpen
  } = useDisclosure();
  const {
    onOpen: onOpenHospitalModal,
    onClose: onCloseHospitalModal,
    isOpen: isOpenHospitalModal
  } = useDisclosure();
  const {
    onOpen: onOpenCollegeModal,
    onClose: onCloseCollegeModal,
    isOpen: isOpenCollegeModal
  } = useDisclosure();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const masterDataTabConfig = [
    {
      id: 0,
      title: "Symptoms",
      onClickAction: onOpenSymptoms,
      component: (
        <Symptoms
          onCloseSymptoms={onCloseSymptoms}
          isSymptomsOpen={isSymptomsOpen}
          activeTab={activeTab}
        />
      )
    },
    {
      id: 1,
      title: "Specialization",
      onClickAction: onOpenSpecialization,
      component: (
        <Specializations
          onCloseSpecialization={onCloseSpecialization}
          isSpecializationOpen={isSpecializationOpen}
          activeTab={activeTab}
        />
      )
    },
    {
      id: 2,
      title: "College",
      onClickAction: onOpenCollegeModal,
      component: (
        <CollegeTab
          onCloseCollegeModal={onCloseCollegeModal}
          isOpenCollegeModal={isOpenCollegeModal}
        />
      )
    },
    {
      id: 3,
      title: "Hospital",
      onClickAction: onOpenHospitalModal,
      component: (
        <HospitalTab
          onCloseHospitalModal={onCloseHospitalModal}
          isOpenHospitalModal={isOpenHospitalModal}
          onOpenHospitalModal={onOpenHospitalModal}
        />
      )
    }
  ];

  return (
    <WrapperBox margin="5" borderRadius="12px" py="4" px="9">
      <Tabs
        variant="unstyled"
        fontSize="md"
        fontFamily={"Inter"}
        index={activeTab}
        onChange={handleTabChange}
      >
        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          p={4}
        >
          <GridItem>
            <TabList border="none">
              {masterDataTabConfig.map(({ title }) => (
                <Tab
                  key={title}
                  fontWeight="400"
                  _selected={{ color: colors.black }}
                  color={colors.light_gray}
                >
                  {title}
                </Tab>
              ))}
              {/* <Tab
                fontWeight="400"
                _selected={{ color: colors.black }}
                color={colors.light_gray}
              >
                Specialist Rate
              </Tab> */}
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="4px"
              bg={colors.main}
              borderRadius="1px"
            />
          </GridItem>
          <GridItem>
            {masterDataTabConfig.map(
              ({ id, title, onClickAction }) =>
                activeTab === id && (
                  <CustomButton
                    key={id}
                    onClick={() => {
                      onClickAction();
                    }}
                    backgroundColor={colors.primary}
                    leftIcon={<IoAdd />}
                  >
                    Add {title}
                  </CustomButton>
                )
            )}
          </GridItem>
        </Grid>

        <TabPanels>
          {masterDataTabConfig.map(({ id, component }) => {
            return (
              <TabPanel key={id}>{activeTab === id && component}</TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </WrapperBox>
  );
};

export default MasterData;
