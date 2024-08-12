import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { PAYMENTMODE } from "@nepMeds/config/enum";
import usePaymentTransaction from "@nepMeds/hooks/usePaymentTransaction";
import {
  IPatientAppointmentReqBody,
  useCreatePatientAppointment,
} from "@nepMeds/service/nepmeds-patient-appointment";
import { IDoctorListById } from "@nepMeds/service/nepmeds-patient-doctorList";
import { useGetPaymentMethods } from "@nepMeds/service/nepmeds-payment";
import {
  IKhaltiPost,
  useFullDiscountPayment,
} from "@nepMeds/service/nepmeds-payment-transaction";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { toastFail } from "@nepMeds/service/service-toast";
import { useState } from "react";
import CenterLoader from "../Common/Loader";
import { importScript } from "@nepMeds/utils/importScript";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useNavigate, useParams } from "react-router-dom";
const OPRKEY = import.meta.env.VITE_APP_OPR_KEY;
const PAPINFO = import.meta.env.VITE_APP_PAP_INFO;
const INSKEY = import.meta.env.VITE_APP_INS_KEY;
type Props = {
  appointmentData: IPatientAppointmentReqBody;
  doctorInfo: IDoctorListById;
  khaltiData?: IKhaltiPost;
  esewaData?: any;
  discountAmount: number;
};

const options = {
  papInfo: PAPINFO,
  oprKey: OPRKEY,
  insKey: INSKEY,
  websiteDomain: import.meta.env.VITE_APP_NEPMEDS_URL,
  themeColor: "#5662FF",

  prefill: {
    name: true,
    email: true,
    state: true,
    city: true,
    address: true,
    zipcode: true,
    country: true,
  },
  disableFields: {
    name: false,
    email: false,
    state: false,
    city: false,
    address: false,
    zipcode: false,
    country: false,
  },

  onError: () => {
    toastFail("Something went wrong!");
  },
};

const TransactionBox = (data: Props) => {
  const {
    handleKhaltiClick,
    khaltiLoading,
    esewaLoading,
    handleEsewaClick,
    bankLoading,
    handleBankClick,
  } = usePaymentTransaction();
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const discounted_amount = data.discountAmount;

  const [paymentMethod, setPaymentMethod] = useState<string>("1");
  const { mutateAsync: createPatientAppointment, isLoading } =
    useCreatePatientAppointment();
  const { data: methods, isLoading: methodLoading } = useGetPaymentMethods();
  const { mutateAsync: fullDiscountAsync } = useFullDiscountPayment();

  const handlePaymentType = async (type: string, idList: number[]) => {
    if (type === PAYMENTMODE.KHALTI.toString()) {
      handleKhaltiClick({
        product: {
          // Khalti Requires amount in paisa
          amount: data.appointmentData.total_amount_paid * 100,
          purchase_order_id: data?.doctorInfo?.id?.toString(),
          purchase_order_name: data?.doctorInfo?.name,
        },
        appointments: idList,
      });
    } else if (type === PAYMENTMODE.ESEWA.toString()) {
      handleEsewaClick({
        amount: data.appointmentData.total_amount_paid,
        appointments: idList,
        purchase_order_id: data?.doctorInfo?.id?.toString(),
      });
    } else if (type === PAYMENTMODE.BANK.toString()) {
      handleBankClick({
        amount: data.appointmentData.total_amount_paid,
        appointments: idList,
        purchase_order_id: data?.doctorInfo?.id?.toString(),
      }).then(e => {
        handleClick(e?.data?.data);
      });
    }
  };
  importScript({
    resourceUrl: import.meta.env.VITE_APP_VISA_BUNDLE_URL,
    shouldRunCleanUp: true,
    scriptId: "checkout-script",
  });

  const handleClick = (option: any) => {
    const getpay = new (window as any).GetPay({
      ...options,
      ...option,
      onSuccess: () => {
        navigate(`${NAVIGATION_ROUTES.VISA_PAYMENT}?id=${id}`);
      },
    });
    getpay.initialize();
  };

  const handleSubmit = async () => {
    try {
      const res = await createPatientAppointment({
        patientAppointmentDetails: {
          ...data.appointmentData,
        },
      });

      const idList = res?.data?.data?.map(e => +e?.id) ?? [];

      data.appointmentData.total_amount_paid === 0
        ? fullDiscountAsync({
            appointments: idList,
            purchase_order_id: data?.doctorInfo?.id?.toString(),
          }).then(data => {
            const url = new URL(data.data.data.redirect_url ?? ""); // Create a URL object to extract the path
            const path = url.pathname + url.search; // Get the path and query string

            navigate(path, {
              replace: true,
            });
          })
        : handlePaymentType(paymentMethod, idList);
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
  };

  {
    methodLoading && <CenterLoader />;
  }
  return (
    <>
      <div>
        {discounted_amount > 0 && (
          <Alert status="info" mt={4}>
            <AlertIcon />
            Please complete payment in 10 Minutes.
          </Alert>
        )}
        <>
          {discounted_amount > 0 && (
            <RadioGroup
              onChange={setPaymentMethod}
              value={paymentMethod}
              my={2}
            >
              {methods &&
                methods.map((e, index) => (
                  <Box key={e.id} px={5}>
                    {index !== 0 && <Divider my={2} />}
                    <Flex justifyContent={"space-between"}>
                      <Box display={"flex"} alignItems={"center"} gap={2}>
                        <Radio value={e.id.toString()} />
                        <Text>{e.name}</Text>
                      </Box>
                      <Image src={e.image ?? ""} width={12} />
                    </Flex>
                  </Box>
                ))}
            </RadioGroup>
          )}

          <Button
            width="full"
            borderRadius="none"
            mt={5}
            isLoading={
              isLoading || khaltiLoading || esewaLoading || bankLoading
            }
            onClick={handleSubmit}
          >
            Proceed
          </Button>
        </>

        <div id="checkout" hidden></div>
      </div>
    </>
  );
};

export default TransactionBox;
