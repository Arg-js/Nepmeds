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

const MasterData = () => {
  const {
    onOpen: onOpenSymptoms,
    onClose: onCloseSymptoms,
    isOpen: isSymptomsOpen,
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
    <Tabs onChange={handleTabChange} index={activeTab}>
      <Grid
        display={"flex"}
        // templateColumns="repeat(5, 1fr)"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <GridItem>
          <TabList border="none" p={4}>
            <Tab>Symptoms</Tab>
            <Tab>Specialist</Tab>
          </TabList>
        </GridItem>

        <GridItem width={"15%"}>
          {/* <Link to={NAVIGATION_ROUTES.SIGNUP}> */}
          {activeTab === 0 ? (
            <CustomButton
              onClick={onOpenSymptoms}
              backgroundColor={colors.primary}
            >
              {" "}
              <IoAdd /> Add Symptoms
            </CustomButton>
          ) : (
            <CustomButton
              onClick={onOpenSpecialization}
              backgroundColor={colors.primary}
            >
              {" "}
              <IoAdd /> Add Speciazliation
            </CustomButton>
          )}
          {/* </Link> */}
        </GridItem>
      </Grid>

      <TabPanels>
        <TabPanel>
          <Symptoms
            onCloseSymptoms={onCloseSymptoms}
            isSymptomsOpen={isSymptomsOpen}
            activeTab={activeTab}
          />
        </TabPanel>
        <TabPanel>
          <Specializations
            onCloseSpecialization={onCloseSpecialization}
            isSpecializationOpen={isSpecializationOpen}
            activeTab={activeTab}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MasterData;
