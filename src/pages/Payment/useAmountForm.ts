import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  IAddDoctorAmount,
  useAddDoctorAmount,
} from "@nepMeds/service/nepmeds-payment";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { useForm } from "react-hook-form";

const useAmountForm = () => {
  const formMethods = useForm<IAddDoctorAmount>();
  const addAmount = useAddDoctorAmount();

  const handleSubmitAmount = ({
    value,
    closeModal,
  }: {
    value: IAddDoctorAmount;
    closeModal: () => void;
  }) => {
    addAmount.mutate(
      { ...value },
      {
        onSuccess: () => {
          toastSuccess("Amount added scuccessfully");
          closeModal();
        },
        onError: error => {
          const err = serverErrorResponse(error);
          toastFail(err);
        },
      }
    );
  };
  return {
    formMethods,
    addLoading: addAmount.isLoading,
    handleSubmitAmount,
  };
};

export default useAmountForm;
