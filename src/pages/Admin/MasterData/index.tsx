import {
  Grid,
  GridItem,
  Tab,
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

import BoxWrapper from "@nepMeds/components/Wrapper/BoxWrapper";
import SpecialistRates from "./Specialist Rate";

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
    <BoxWrapper>
      <Tabs onChange={handleTabChange} index={activeTab}>
        <Grid
          display={"flex"}
          // templateColumns="repeat(5, 1fr)"
          justifyContent={"space-between"}
          alignItems={"center"}
          p={4}
        >
          <GridItem>
            <TabList border="none">
              <Tab>Symptoms</Tab>
              <Tab>Specialist</Tab>
              <Tab>Specialist Rate</Tab>
            </TabList>
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
                <IoAdd /> Add Speciazliation
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
    </BoxWrapper>
  );
};

export default MasterData;
