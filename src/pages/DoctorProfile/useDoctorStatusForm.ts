import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useApproveDoc } from "@nepMeds/service/nepmeds-approve-doc";
import { useRejectDoc } from "@nepMeds/service/nepmeds-reject-doc";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { useForm } from "react-hook-form";

const useDoctorStatusForm = () => {
  const formMethods = useForm();

  const approvePendingDoc = useApproveDoc();
  const rejectPendingDoc = useRejectDoc();

  const RejectDoctor = async (
    data:
      | {
          id: string;
          title_id: string;
          remarks: string;
        }
      | any
  ) => {
    const isValid = formMethods.trigger();
    if (!isValid) return;
    try {
      await rejectPendingDoc.mutateAsync(data);
      toastSuccess("Doctor Rejected!");
      formMethods.reset();
    } catch (error) {
      toastFail("Doctor cannot be rejected. Try Again!!");
    }
  };

  const ApproveDoctor = async (id: string) => {
    try {
      await approvePendingDoc.mutateAsync(id);
      toastSuccess("Doctor Approved!");
      formMethods.reset();
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
  };

  return {
    RejectDoctor,
    ApproveDoctor,
    approveLoading: approvePendingDoc.isLoading,
    rejectLoading: rejectPendingDoc.isLoading,
    formMethods,
  };
};

export default useDoctorStatusForm;
