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
import Specializations from "./Specialist";
import Symptoms from "./Symptoms";
import { CustomButton } from "@nepMeds/components/Button/Button";
import { IoAdd } from "react-icons/io5";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { useForm } from "react-hook-form";

const MasterData = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onOpen: onOpenSpecialization,
    onClose: onCloseSpecialization,
    isOpen: isSpecializationOpen,
  } = useDisclosure();
  const [activeTab, setActiveTab] = useState(0);
  const formMethods = useForm();

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
              onClick={() => {
                formMethods.reset();
                onOpen();
              }}
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
          <Symptoms onClose={onClose} isOpen={isOpen} />
        </TabPanel>
        <TabPanel>
          <Specializations
            onCloseSpecialization={onCloseSpecialization}
            isSpecializationOpen={isSpecializationOpen}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MasterData;
