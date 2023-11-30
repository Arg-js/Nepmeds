import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import PatientInfoForm from "./PatientInfoForm";
import { useLocation } from "react-router-dom";
import AdditionalInfoForm from "./AdditionalInfoForm";
import DrugReferralForm from "./DrugReferralForm";
import { useGetAllPrescriptionInfo } from "@nepMeds/service/nepmeds-prescription";
import { svgs } from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";

const AddPrescriptionModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { state }: any = useLocation();

  // Either appointment or follow up id is sent from Link State
  const { data } = useGetAllPrescriptionInfo({
    appointment_id: state?.appointment_id ?? "",
    followup_id: state?.follow_up_id ?? "",
  });

  return (
    <div>
      <ModalComponent
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Add Prescription</Text>
          </HStack>
        }
        isOpen={isOpen}
        onClose={onClose}
        maxW={"65%"}
        footer={
          <Flex gap={3} justifyContent={"end"}>
            <Button flex={1} onClick={onClose}>
              Done
            </Button>
          </Flex>
        }
      >
        <Box>
          <Accordion allowToggle>
            <AccordionItem borderRadius="xl" my={2}>
              <AccordionButton
                borderRadius="xl"
                backgroundColor={colors.gray_border}
              >
                <Box as="span" flex="1" textAlign="left">
                  Information Of Patient
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <PatientInfoForm
                  appointment_id={state?.appointment_id ?? ""}
                  patient_info={data?.patient_info}
                  follow_up={state?.follow_up_id ?? ""}
                />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem borderRadius="xl" my={2}>
              <AccordionButton
                backgroundColor={colors.gray_border}
                borderRadius="xl"
              >
                <Box as="span" flex="1" textAlign="left">
                  Drug Referral
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <DrugReferralForm
                  appointment_id={state?.appointment_id ?? ""}
                  drug_referral={data?.drug_referral}
                  follow_up={state?.follow_up_id ?? ""}
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem borderRadius="xl" my={2}>
              <AccordionButton
                borderRadius="xl"
                backgroundColor={colors.gray_border}
              >
                <Box as="span" flex="1" textAlign="left">
                  Additional Information
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <AdditionalInfoForm
                  appointment_id={state?.appointment_id ?? ""}
                  additional_info={data?.additional_info}
                  follow_up={state?.follow_up_id ?? ""}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </ModalComponent>

      <Button onClick={onOpen}>Add Prescription</Button>
    </div>
  );
};

export default AddPrescriptionModal;
