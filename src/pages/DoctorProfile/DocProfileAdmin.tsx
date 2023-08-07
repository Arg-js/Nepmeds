import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Icon,
  Spinner,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import DocUpdateProfile from "@nepMeds/components/DocProfile/DocUpdateProfile";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { RejectionForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useApproveDoc } from "@nepMeds/service/nepmeds-approve-doc";
import { fetchDoctorProfileById } from "@nepMeds/service/nepmeds-doctor-profile";
import { useRejectDoc } from "@nepMeds/service/nepmeds-reject-doc";
import { colors } from "@nepMeds/theme/colors";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const DocProfileAdmin = () => {
  const formMethods = useForm();
  const { id } = useParams();
  const { data: doctorProfileData, isLoading } = fetchDoctorProfileById(
    id ?? "0"
  );

  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModalOpen,
    onClose: onRejectModalClose,
  } = useDisclosure();

  const approvePendingDoc = useApproveDoc();
  const rejectPendingDoc = useRejectDoc();
  const navigate = useNavigate();

  const onSubmitForm = async () => {
    try {
      await rejectPendingDoc.mutateAsync({
        id: doctorProfileData?.data?.id?.toString() ?? "",
        title_id: formMethods.getValues("title_id"),
        remarks: formMethods.getValues("remarks"),
      });
      onRejectModalClose();
      toastSuccess("Doctor Rejected!");
      formMethods.reset();
      navigate(NAVIGATION_ROUTES.DOCTOR_LIST);
    } catch (error) {
      toastFail("Doctor cannot be rejected. Try Again!!");
    }
  };

  const RejectDoctorModal = () => {
    formMethods.reset();
    onRejectModalClose();
  };

  if (isLoading)
    return (
      <Spinner
        style={{
          margin: "0 auto",
          textAlign: "center",
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "25%",
        }}
      />
    );

  return (
    <VStack align={"stretch"} p={4}>
      <Tabs position="relative" variant="unstyled">
        <TabList bg="white" px={6} pt={5} pb={6} borderRadius={"xl"}>
          <Tab>Doctor Profile</Tab>
        </TabList>
        <TabIndicator mt="-20px" height="4px" bg="blue.500" />
        <TabPanels sx={{ "&>div": { px: "0px" } }}>
          <FormProvider {...formMethods}>
            <TabPanel>
              <DocUpdateProfile
                doctorProfileData={doctorProfileData?.data ?? ({} as any)}
              />
            </TabPanel>

            {doctorProfileData?.data?.status ===
              STATUSTYPE.pending.toString() && (
              <Flex dir="row" justifyContent={"flex-end"}>
                <Button
                  bg={"#CC5F5F"}
                  color={"white"}
                  m={"10px"}
                  onClick={onRejectModalOpen}
                  sx={{ "&:hover": { bg: "#CC5F5F", color: "white" } }}
                >
                  ON HOLD &nbsp;
                  <Icon as={WarningIcon} />
                </Button>
                <Button
                  bg={"#519C66"}
                  color={"white"}
                  m={"10px"}
                  onClick={() => {
                    approvePendingDoc.mutateAsync(
                      doctorProfileData?.data?.id?.toString() ?? ""
                    );
                    toastSuccess("Doctor Approved");
                    navigate(NAVIGATION_ROUTES.DOCTOR_LIST);
                  }}
                  sx={{ "&:hover": { bg: "#519C66", color: "white" } }}
                >
                  VERIFY &nbsp;
                  <Icon as={CheckIcon} />
                </Button>
              </Flex>
            )}
          </FormProvider>
        </TabPanels>
      </Tabs>

      <ModalComponent
        isOpen={isRejectModalOpen}
        onClose={RejectDoctorModal}
        approve
        reject
        size="xl"
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Remarks for rejection</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button
              variant="outline"
              onClick={RejectDoctorModal}
              flex={1}
              border="2px solid"
              borderColor={colors.primary}
              color={colors.primary}
              fontWeight={400}
            >
              Cancel
            </Button>
            <Button
              flex={1}
              onClick={formMethods.handleSubmit(onSubmitForm)}
              background={colors.primary}
              color={colors.white}
              isLoading={rejectPendingDoc.isLoading}
            >
              Done
            </Button>
          </HStack>
        }
        primaryText="Done"
        secondaryText="Cancel"
        otherAction={onRejectModalClose}
      >
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmitForm)}>
            <RejectionForm />
          </form>
        </FormProvider>
      </ModalComponent>
    </VStack>
  );
};

export default DocProfileAdmin;
