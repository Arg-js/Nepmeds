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
import { IKhaltiPost } from "@nepMeds/service/nepmeds-payment-transaction";
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
    address: true,
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

  const [paymentMethod, setPaymentMethod] = useState<string>("1");
  const { mutateAsync: createPatientAppointment, isLoading } =
    useCreatePatientAppointment();
  const { data: methods, isLoading: methodLoading } = useGetPaymentMethods();

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

  {
    methodLoading && <CenterLoader />;
  }
  return (
    <div>
      <Alert status="info">
        <AlertIcon />
        Please complete payment in 10 Minutes.
      </Alert>
      <>
        <RadioGroup onChange={setPaymentMethod} value={paymentMethod} my={2}>
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

        <Button
          width="full"
          borderRadius="none"
          mt={5}
          isLoading={isLoading || khaltiLoading || esewaLoading || bankLoading}
          onClick={async () => {
            try {
              const res = await createPatientAppointment({
                patientAppointmentDetails: {
                  ...data.appointmentData,
                },
              });

              const idList = res?.data?.data?.map(e => +e?.id) ?? [];

              handlePaymentType(paymentMethod, idList);
            } catch (error) {
              const err = serverErrorResponse(error);
              toastFail(err);
            }
          }}
        >
          Proceed
        </Button>
      </>

      <div id="checkout" hidden></div>
    </div>
  );
};

export default TransactionBox;
