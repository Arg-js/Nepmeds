import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  useApprovePayment,
  useRejectPayment,
} from "@nepMeds/service/nepmeds-payment";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { useForm } from "react-hook-form";

const usePaymentStatusForm = () => {
  const formMethods = useForm();

  const approvePayment = useApprovePayment();
  const rejectPayment = useRejectPayment();

  const RejectPayment = async (
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
      await rejectPayment.mutateAsync(data);
      toastSuccess("Payment Rejected!");
      formMethods.reset();
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
  };

  const ApprovePayment = async (id: string) => {
    try {
      await approvePayment.mutateAsync(id);
      toastSuccess("Payment Approved!");
      formMethods.reset();
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
  };

  return {
    RejectPayment,
    ApprovePayment,
    approveLoading: approvePayment.isLoading,
    rejectLoading: rejectPayment.isLoading,
    formMethods,
  };
};

export default usePaymentStatusForm;
