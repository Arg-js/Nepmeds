import {
  Grid,
  GridItem,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { CustomButton } from "@nepMeds/components/Button/Button";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import Specializations from "./Specialist";
import Symptoms from "./Symptoms";

import SpecialistRates from "./Specialist Rate";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";

const MasterData = () => {
  const {
    onOpen: onOpenSymptoms,
    onClose: onCloseSymptoms,
    isOpen: isSymptomsOpen,
  } = useDisclosure();
  const {
    onOpen: onOpenSpecialistRate,
    onClose: onCloseSpecialistRate,
    isOpen: isOpenSpecialistRate,
  } = useDisclosure();

  const {
    onOpen: onOpenSpecialization,
    onClose: onCloseSpecialization,
    isOpen: isSpecializationOpen,
  } = useDisclosure();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };
  return (
    <WrapperBox style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}>
      <Tabs
        variant="unstyled"
        fontSize="md"
        fontFamily={"Inter"}
        index={activeTab}
        onChange={handleTabChange}
      >
        <Grid
          display={"flex"}
          // templateColumns="repeat(5, 1fr)"
          justifyContent={"space-between"}
          alignItems={"center"}
          p={4}
        >
          <GridItem>
            <TabList border="none">
              <Tab
                fontWeight="400"
                _selected={{ color: colors.black }}
                color={colors.light_gray}
              >
                Symptoms
              </Tab>
              <Tab
                fontWeight="400"
                _selected={{ color: colors.black }}
                color={colors.light_gray}
              >
                Specialization
              </Tab>
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
            {/* <Link to={NAVIGATION_ROUTES.SIGNUP}> */}
            {activeTab === 0 && (
              <CustomButton
                onClick={() => {
                  onOpenSymptoms();
                }}
                backgroundColor={colors.primary}
              >
                {" "}
                <IoAdd /> Add Symptoms
              </CustomButton>
            )}{" "}
            {activeTab === 1 && (
              <CustomButton
                onClick={() => {
                  onOpenSpecialization();
                }}
                backgroundColor={colors.primary}
              >
                {" "}
                <IoAdd /> Add Specialization
              </CustomButton>
            )}
            {activeTab === 2 && (
              <CustomButton
                onClick={() => {
                  onOpenSpecialistRate();
                }}
                backgroundColor={colors.primary}
              >
                <IoAdd />
                Specialist Rate
              </CustomButton>
            )}
            {/* </Link> */}
          </GridItem>
        </Grid>

        <TabPanels>
          <TabPanel>
            {activeTab === 0 && (
              <Symptoms
                onCloseSymptoms={onCloseSymptoms}
                isSymptomsOpen={isSymptomsOpen}
                activeTab={activeTab}
              />
            )}
          </TabPanel>
          <TabPanel>
            {activeTab === 1 && (
              <Specializations
                onCloseSpecialization={onCloseSpecialization}
                isSpecializationOpen={isSpecializationOpen}
                activeTab={activeTab}
              />
            )}
          </TabPanel>
          <TabPanel>
            {activeTab === 2 && (
              <SpecialistRates
                onCloseSpecialistRate={onCloseSpecialistRate}
                isOpenSpecialistRate={isOpenSpecialistRate}
                activeTab={activeTab}
              />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </WrapperBox>
  );
};

export default MasterData;
