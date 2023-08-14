import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useProfileData } from "@nepMeds/context/index";
import {
  IGetPaymentMethods,
  IPaymentMethod,
  useCreatePaymentMethods,
  useEditPaymentMethods,
} from "@nepMeds/service/nepmeds-payment";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { useForm } from "react-hook-form";

const usePaymentForm = () => {
  const profileData = useProfileData();
  const formMethods = useForm<IPaymentMethod>();
  const addPaymentMethods = useCreatePaymentMethods();
  const editPaymentMethods = useEditPaymentMethods();

  const setPaymentValue = (value: IGetPaymentMethods) => {
    formMethods.reset({
      ...formMethods.getValues(),
      instant_amount: Number(value?.instant_amount),
      schedule_amount: +value?.schedule_amount,
      doctor_amount:
        value?.doctor_amount?.map(x => ({
          payment_mode: x.payment_mode,
          epayment_id: x.epayment_id ?? "",
          bank_account_number: x.account_number ?? "",
          bank_account_name: x.account_holder_name ?? "",
          bank_name: x.bank_name ?? "",
          bank_branch_name: x.branch_name ?? "",
          is_primary_method: x.is_primary_method,
        })) ?? [],
    });
  };

  const handleSubmitPayment = (value: IPaymentMethod) => {
    const val = value.doctor_amount.map((e, index) => {
      return { ...e, payment_mode: index + 1 };
    });
    addPaymentMethods.mutate(
      { ...value, doctor_amount: val },
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

  const handleEditPayment = ({
    value,
    id,
  }: {
    value: IPaymentMethod;
    id: string;
  }) => {
    editPaymentMethods.mutate(
      { id, paymentMethods: value },

      {
        onSuccess: () => {
          toastSuccess("Payment details updated scuccessfully");
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
    setPaymentValue,
    handleSubmitPayment,
    handleEditPayment,
    isLoading: addPaymentMethods.isLoading || editPaymentMethods.isLoading,
  };
};

export default usePaymentForm;
