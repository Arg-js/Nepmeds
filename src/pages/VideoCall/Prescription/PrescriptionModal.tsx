import DrugReferralForm from "./Form/DrugReferralForm";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import PatientInfoForm from "./Form/PatientInfoForm";
import { useLocation } from "react-router-dom";
import { useGetAllPrescriptionInfo } from "@nepMeds/service/nepmeds-prescription";
import { useState } from "react";
import AdditionalInfoForm from "./Form/AdditionalInfoForm";
import { CloseIcon } from "@chakra-ui/icons";

const PrescriptionModal = ({ onClose }: { onClose: () => void }) => {
  // TODO: Remove any type with location type
  const { state }: any = useLocation();
  const [tabIndex, setTabIndex] = useState(0);

  // Either appointment or follow up id is sent from Link State
  const { data } = useGetAllPrescriptionInfo({
    appointment_id: state?.appointment_id ?? "",
    followup_id: state?.follow_up_id ?? "",
  });

  return (
    <Card align="center" maxW="sm">
      <Flex
        justifyContent={"space-between"}
        px={5}
        alignItems={"center"}
        w={"100%"}
      >
        <Heading size="sm">Add Prescription</Heading>
        <IconButton
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          icon={<CloseIcon />}
          onClick={onClose}
        />
      </Flex>
      <Divider w={"94%"} />
      <Tabs maxW={"sm"} index={tabIndex} onChange={index => setTabIndex(index)}>
        <CardHeader>
          <TabList pb={0}>
            <Tab fontSize={"sm"}>Patient Information</Tab>
            <Tab fontSize={"sm"}>Drug Referral </Tab>
            <Tab fontSize={"sm"}>Additional Information</Tab>
          </TabList>
        </CardHeader>
        <CardBody p={0}>
          <TabPanels>
            <TabPanel>
              <PatientInfoForm
                appointment_id={state?.appointment_id ?? ""}
                patient_info={data?.patient_info}
                follow_up={state?.follow_up_id ?? ""}
                setTabIndex={setTabIndex}
              />
            </TabPanel>
            <TabPanel>
              <DrugReferralForm
                appointment_id={state?.appointment_id ?? ""}
                drug_referral={data?.drug_referral}
                follow_up={state?.follow_up_id ?? ""}
                setTabIndex={setTabIndex}
              />
            </TabPanel>
            <TabPanel>
              <AdditionalInfoForm
                appointment_id={state?.appointment_id ?? ""}
                additional_info={data?.additional_info}
                follow_up={state?.follow_up_id ?? ""}
              />
            </TabPanel>
          </TabPanels>
        </CardBody>
      </Tabs>
    </Card>
  );
};

export default PrescriptionModal;
