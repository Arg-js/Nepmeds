import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useProfileData } from "@nepMeds/context/index";
import {
  IGetPaymentMethods,
  IPaymentMethod,
  IPaymentMethodDoctorAmount,
  useCreatePaymentMethods,
  useDeletePaymentMethods,
  useEditPaymentMethods,
} from "@nepMeds/service/nepmeds-payment";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { useForm } from "react-hook-form";

const usePaymentForm = () => {
  const profileData = useProfileData();
  const formMethods = useForm<IPaymentMethod>();
  const addPaymentMethods = useCreatePaymentMethods();
  const editPaymentMethods = useEditPaymentMethods();
  const detelePaymentMethods = useDeletePaymentMethods();

  const setPaymentValue = (value: IGetPaymentMethods) => {
    const deepCopyValue = structuredClone(value);
    const newSorted = {
      ...deepCopyValue,
      doctor_amount: deepCopyValue?.doctor_amount?.sort(
        (a: IPaymentMethodDoctorAmount, b: IPaymentMethodDoctorAmount) => {
          return a.payment_mode - b.payment_mode;
        }
      ),
    };

    formMethods.reset({
      ...formMethods.getValues(),
      instant_amount: Number(newSorted?.instant_amount),
      schedule_amount: +newSorted?.schedule_amount,
      doctor_amount:
        newSorted?.doctor_amount?.map((x: IPaymentMethodDoctorAmount) => ({
          id: x.id,
          payment_mode: x.payment_mode,
          epayment_id: x.epayment_id ?? "",
          account_number: x.account_number ?? "",
          account_holder_name: x.account_holder_name ?? "",
          bank_name: x.bank_name ?? "",
          branch_name: x.branch_name ?? "",
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

  const handleEditPayment = async ({
    value,
    id,
    onSuccess,
  }: {
    value: IPaymentMethod;
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
