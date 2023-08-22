import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  IAddDoctorAmount,
  useAddDoctorAmount,
  useEditAmount,
} from "@nepMeds/service/nepmeds-payment";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { useForm } from "react-hook-form";

const useAmountForm = () => {
  const formMethods = useForm<IAddDoctorAmount>();
  const addAmount = useAddDoctorAmount();
  const editAmount = useEditAmount();

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

  const handleEditPayment = (
    value: IAddDoctorAmount,
    id: string,
    closeModal: () => void
  ) => {
    editAmount.mutate(
      { data: value, id },
      {
        onSuccess: () => {
          toastSuccess("Amount updated scuccessfully");
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
    loading: addAmount.isLoading || editAmount.isLoading,
    handleSubmitAmount,
    handleEditPayment,
  };
};

export default useAmountForm;
