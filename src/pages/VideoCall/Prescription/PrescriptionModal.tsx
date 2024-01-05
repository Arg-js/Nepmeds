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
import {
  useGetAllPrescriptionInfo,
  useGetAppPrescriptionInfo,
} from "@nepMeds/service/nepmeds-prescription";
import { memo, useState } from "react";
import AdditionalInfoForm from "./Form/AdditionalInfoForm";
import { CloseIcon } from "@chakra-ui/icons";

const PrescriptionModal = ({
  onClose,
  isEditable = true,
  appointmentId,
}: {
  onClose?: () => void;
  isEditable?: boolean;
  appointmentId?: string;
}) => {
  // TODO: Remove any type with location type
  const { state }: any = useLocation();
  const [tabIndex, setTabIndex] = useState(0);

  //Check if component is open in Modal
  const isOpenInModal = !!appointmentId;
  const maxW = isOpenInModal ? "100%" : "sm";

  // Either appointment or follow up id is sent from Link State
  const { data, isLoading } = useGetAllPrescriptionInfo({
    appointment_id: state?.appointment_id ?? appointmentId,
    followup_id: state?.follow_up_id ?? "",
    isEditable,
  });

  const { data: prescriptionInfo, isLoading: isLoadingPrescriptionInfo } =
    useGetAppPrescriptionInfo({
      appointment_id: state?.appointmentold_id ?? appointmentId,
    });
  const dataInfo = isEditable ? data : prescriptionInfo;

  return (
    <Card align="center" maxW={maxW}>
      {!isOpenInModal && (
        <Flex
          justifyContent={"space-between"}
          px={5}
          alignItems={"center"}
          w={"100%"}
        >
          <Heading size={maxW}>
            {isEditable ? "Add Prescription" : "View Prescription"}
          </Heading>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<CloseIcon />}
            onClick={onClose}
          />
        </Flex>
      )}
      <Divider w={"94%"} />
      <Tabs maxW={maxW} index={tabIndex} onChange={index => setTabIndex(index)}>
        <CardHeader>
          <TabList pb={0}>
            <Tab fontSize={"sm"}>Patient Information</Tab>
            <Tab fontSize={"sm"}>Drug Referral </Tab>
            <Tab fontSize={"sm"}>Additional Information</Tab>
          </TabList>
        </CardHeader>
        {!isLoading && !isLoadingPrescriptionInfo && (
          <CardBody p={0}>
            <TabPanels>
              <TabPanel>
                <PatientInfoForm
                  appointment_id={state?.appointment_id ?? appointmentId}
                  patient_info={dataInfo?.patient_info}
                  follow_up={state?.follow_up_id ?? ""}
                  setTabIndex={setTabIndex}
                  isEditable={isEditable}
                />
              </TabPanel>
              <TabPanel>
                <DrugReferralForm
                  appointment_id={state?.appointment_id ?? appointmentId}
                  drug_referral={dataInfo?.drug_referral}
                  follow_up={state?.follow_up_id ?? ""}
                  setTabIndex={setTabIndex}
                  isEditable={isEditable}
                />
              </TabPanel>
              <TabPanel>
                <AdditionalInfoForm
                  appointment_id={state?.appointment_id ?? appointmentId}
                  additional_info={dataInfo?.additional_info}
                  follow_up={state?.follow_up_id ?? ""}
                  isEditable={isEditable}
                />
              </TabPanel>
            </TabPanels>
          </CardBody>
        )}
      </Tabs>
    </Card>
  );
};

export default memo(PrescriptionModal);
