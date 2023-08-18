import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useProfileData } from "@nepMeds/context/index";
import {
  IPaymentFormType,
  IPaymentMethodDoctorAmount,
  useCreatePaymentMethods,
  useDeletePaymentMethods,
  useEditSinglePaymentMethods,
} from "@nepMeds/service/nepmeds-payment";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { useForm } from "react-hook-form";

const usePaymentForm = () => {
  const profileData = useProfileData();
  const formMethods = useForm<IPaymentFormType>();
  const addPaymentMethods = useCreatePaymentMethods();
  const editPaymentMethods = useEditSinglePaymentMethods();
  const detelePaymentMethods = useDeletePaymentMethods();

  const setPaymentValue = (value: IPaymentMethodDoctorAmount) => {
    formMethods.reset({
      ...formMethods.getValues(),

      payment_mode: value.payment_mode,
      epayment_id: value.epayment_id ?? "",
      account_number: value.account_number ?? "",
      account_holder_name: value.account_holder_name ?? "",
      bank_name: value.bank_name ?? "",
      branch_name: value.branch_name ?? "",
      is_primary_method: value.is_primary_method,
    });
  };

  const handleSubmitPayment = ({
    value,
    id,
  }: {
    value: IPaymentFormType;
    id: string;
  }) => {
    addPaymentMethods.mutate(
      { ...value, payment_mode: id },
      {
        onSuccess: () => {
          toastSuccess("Payment details added scuccessfully");
          profileData?.dataRefetch();
        },
        onError: error => {
          const err = serverErrorResponse(error);
          toastFail(err);
        },
      }
    );
  };

  const handleEditPayment = async ({
    value,
    id,
    onSuccess,
  }: {
    value: IPaymentFormType;
    id: string;
    onSuccess?: () => void;
  }) => {
    try {
      await editPaymentMethods.mutateAsync({ id, paymentMethods: value });
      toastSuccess("Payment details updated scuccessfully");
      onSuccess && onSuccess();
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
  };

  const handleDeteltePayment = (id: string) => {
    detelePaymentMethods.mutate(id, {
      onSuccess: () => {
        toastSuccess("Payment details deleted scuccessfully");
      },
      onError: error => {
        const err = serverErrorResponse(error);
        toastFail(err);
      },
    });
  };

  return {
    formMethods,
    setPaymentValue,
    handleSubmitPayment,
    handleEditPayment,
    isLoading: addPaymentMethods.isLoading || editPaymentMethods.isLoading,
    handleDeteltePayment,
  };
};

export default usePaymentForm;
