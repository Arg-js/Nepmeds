import {
  Button,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import BoxWrapper from "@nepMeds/components/Wrapper/BoxWrapper";
import {
  IAdminSingleDetail,
  useAddAdminUser,
} from "@nepMeds/service/nepmeds-admin-userrole";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import AdminModal from "./AdminModal";
import RoleAdmin from "./roleAdmin";
import RoleDoctor from "./roleDoctor";
import RolePatient from "./rolePatient";

const UserRole = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const addAdmin = useAddAdminUser();
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();

  const onSubmitHandler = (data: IAdminSingleDetail) => {
    addAdmin.mutate(data, {
      onSuccess: () => {
        onAddModalClose();
      },
    });
  };

  return (
    <BoxWrapper>
      <AdminModal
        isLoading={addAdmin.isLoading}
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        onSubmitHandler={onSubmitHandler}
      />
      <Tabs onChange={index => setTabIndex(index)} index={tabIndex}>
        <Grid
          display={"flex"}
          // templateColumns="repeat(5, 1fr)"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <GridItem>
            <TabList border="none" p={4}>
              <Tab>Doctor</Tab>
              <Tab>Patient</Tab>
              <Tab>Admin</Tab>
            </TabList>
          </GridItem>

          {tabIndex === 2 && (
            <GridItem width={"15%"}>
              <Button
                h={10}
                backgroundColor={colors.primary}
                onClick={onAddModalOpen}
              >
                <IoAdd /> Create Admin
              </Button>
            </GridItem>
          )}
        </Grid>

        <TabPanels>
          <TabPanel>{tabIndex === 0 && <RoleDoctor />}</TabPanel>
          <TabPanel>{tabIndex === 1 && <RolePatient />}</TabPanel>
          <TabPanel>{tabIndex === 2 && <RoleAdmin />}</TabPanel>
        </TabPanels>
      </Tabs>
    </BoxWrapper>
  );
};

export default UserRole;
