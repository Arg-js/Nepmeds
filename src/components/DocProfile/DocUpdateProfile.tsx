import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import EditBasic from "./EditDoctor/EditBasic";
import EditPrimary from "./EditDoctor/EditPrimary";
import EditAcademic from "./EditDoctor/EditAcademic";
import EditCertification from "./EditDoctor/EditCertification";
import EditExperience from "./EditDoctor/EditExperience";
import {
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { toastFail, toastSuccess } from "../Toast";
import { useApproveDoc } from "@nepMeds/service/nepmeds-approve-doc";
import ModalComponent from "../Form/ModalComponent";
import { colors } from "@nepMeds/theme/colors";
import { FormProvider, useForm } from "react-hook-form";
import { svgs } from "@nepMeds/assets/svgs";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRejectDoc } from "@nepMeds/service/nepmeds-reject-doc";
import { RejectionForm } from "../FormComponents";
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
const schema = yup.object().shape({
  remarks: yup.string().required("Remarks  is required!"),
});

export const DocUpdateProfile = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const approvePendingDoc = useApproveDoc();
  const rejectPendingDoc = useRejectDoc();
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModalOpen,
    onClose: onRejectModalClose,
  } = useDisclosure();
  console.log(doctorProfileData?.status, "vvv");
  const RejectDoctor = () => {
    onRejectModalClose();
  };
  const onSubmitForm = async () => {
    try {
      const isValid = await formMethods.trigger("remarks");
      if (!isValid) return;

      const val = formMethods.getValues("remarks");
      await rejectPendingDoc.mutateAsync({
        id: doctorProfileData?.id?.toString() ?? "",
        remarks: val,
      });
      onRejectModalClose();
      toastSuccess("Doctor Rejected!");
      formMethods.reset();
    } catch (error) {
      toastFail("Doctor cannot be rejected. Try Again!!");
    }
  };
  const formMethods = useForm({ resolver: yupResolver(schema) });
  return (
    <>
      <EditBasic doctorProfileData={doctorProfileData} />
      <EditPrimary doctorProfileData={doctorProfileData} />
      <EditAcademic doctorProfileData={doctorProfileData} />
      <EditCertification doctorProfileData={doctorProfileData} />
      <EditExperience doctorProfileData={doctorProfileData} />
      {doctorProfileData?.status !== "pending" && (
        <Flex dir="row" justifyContent={"flex-end"} mt={"25px"} p={"25px"}>
          <Button
            bg={"#CC5F5F"}
            color={"white"}
            m={"10px"}
            onClick={() => {
              onRejectModalOpen();
            }}
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
                doctorProfileData?.id?.toString() ?? ""
              );
              toastSuccess("Doctor Approved");
            }}
            sx={{ "&:hover": { bg: "#519C66", color: "white" } }}
          >
            VERIFY &nbsp;
            <Icon as={CheckIcon} />
          </Button>
        </Flex>
      )}
      <ModalComponent
        isOpen={isRejectModalOpen}
        onClose={onRejectModalClose}
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
              onClick={RejectDoctor}
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
              onClick={async () => {
                try {
                  const isValid = await formMethods.trigger("remarks");
                  if (!isValid) return;

                  const val = formMethods.getValues("remarks");
                  await rejectPendingDoc.mutateAsync({
                    id: doctorProfileData?.id?.toString() ?? "",
                    remarks: val,
                  });
                  onRejectModalClose();
                  toastSuccess("Doctor Rejected!");
                  formMethods.reset();
                } catch (error) {
                  toastFail("Doctor cannot be rejected. Try Again!!");
                }
              }}
              background={colors.primary}
              color={colors.white}
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
          <RejectionForm onSubmit={formMethods.handleSubmit(onSubmitForm)} />
        </FormProvider>
      </ModalComponent>
    </>
  );
};

export default DocUpdateProfile;
