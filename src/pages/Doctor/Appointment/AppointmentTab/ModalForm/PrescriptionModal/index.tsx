import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Text,
} from "@chakra-ui/react";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { svgs } from "@nepMeds/assets/svgs";
import PrescriptionModal from "@nepMeds/pages/VideoCall/Prescription/PrescriptionModal";
import PrescriptionImageModal from "@nepMeds/pages/VideoCall/Prescription/PrescriptionImageModal";

interface Props {
  isPrescriptionOpen: boolean;
  onPrescriptionClose: () => void;
  appointmentId: string;
}

const AppointmentPrescriptionModal = ({
  isPrescriptionOpen,
  onPrescriptionClose,
  appointmentId,
}: Props) => {
  return (
    <ModalComponent
      size={"xl"}
      heading={
        <HStack>
          <svgs.logo_small />
          <Text>Prescription</Text>
        </HStack>
      }
      isOpen={isPrescriptionOpen}
      onClose={onPrescriptionClose}
      footer={<></>}
    >
      <Tabs>
        <TabList>
          <Tab>Prescription Form</Tab>
          <Tab>Prescription Image</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PrescriptionModal appointmentId={appointmentId} />
          </TabPanel>
          <TabPanel>
            <PrescriptionImageModal appointmentId={appointmentId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ModalComponent>
  );
};

export default AppointmentPrescriptionModal;
