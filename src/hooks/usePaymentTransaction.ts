import { toastFail } from "@nepMeds/components/Toast";
import {
  IEsewaToBackendPost,
  IEsewaToBackendRes,
  IKhaltiPost,
  useCreateBankPaymentMethods,
  useCreateEsewaPaymentMethods,
  useCreateKhaltiPaymentMethods,
} from "@nepMeds/service/nepmeds-payment-transaction";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { api } from "@nepMeds/service/service-api";
import { ESEWA_URL, FRONT_URL, baseURL } from "@nepMeds/service/service-axios";

interface KhaltiProps {
  product: IKhaltiPost;
  appointments: number[];
}

function usePaymentTransaction() {
  const khaltiPay = useCreateKhaltiPaymentMethods();
  const esewaPay = useCreateEsewaPaymentMethods();
  const bankPay = useCreateBankPaymentMethods();

  const handleKhaltiClick = async ({ appointments, product }: KhaltiProps) => {
    const payload = {
      ...product,
      return_url: baseURL + api.transaction.khalti + "/",
      website_url: FRONT_URL,

      appointments,
    };

    try {
      const res = await khaltiPay.mutateAsync({
        ...payload,
      });
      if (res?.data?.data?.payment_url)
        window.location.href = `${res?.data?.data?.payment_url}`;
    } catch (e) {
      const error = serverErrorResponse(e);
      toastFail(error);
    }
  };

  // Send Data to esewa and redirect to esewa payment page
  const handleEsewaPost = (params: IEsewaToBackendRes) => {
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", ESEWA_URL + "/epay/main");

    for (const key in params) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute(
        "value",
        params[key as keyof IEsewaToBackendRes]
      );
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  // Send Data to backend and get response from backend with esewa params
  const handleEsewaClick = async (data: IEsewaToBackendPost) => {
    try {
      const res = await esewaPay.mutateAsync(data);
      handleEsewaPost(res?.data?.data);
    } catch (e) {
      const error = serverErrorResponse(e);
      toastFail(error);
    }
  };

  const handleBankClick = async (data: IEsewaToBackendPost) => {
    try {
      const res = await bankPay.mutateAsync(data);
      return res;
    } catch (e) {
      const error = serverErrorResponse(e);
      toastFail(error);
    }
  };

  return {
    handleKhaltiClick,
    khaltiLoading: khaltiPay.isLoading,
    handleEsewaClick,
    esewaLoading: esewaPay.isLoading,
    handleBankClick,
    bankLoading: bankPay.isLoading,
  };
}

export default usePaymentTransaction;
