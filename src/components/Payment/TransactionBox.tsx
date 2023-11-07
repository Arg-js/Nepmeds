import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Text
} from "@chakra-ui/react";
import { PAYMENTMODE } from "@nepMeds/config/enum";
import usePaymentTransaction from "@nepMeds/hooks/usePaymentTransaction";
import {
  IPatientAppointmentReqBody,
  useCreatePatientAppointment
} from "@nepMeds/service/nepmeds-patient-appointment";
import { IDoctorListById } from "@nepMeds/service/nepmeds-patient-doctorList";
import { useGetPaymentMethods } from "@nepMeds/service/nepmeds-payment";
import { IKhaltiPost } from "@nepMeds/service/nepmeds-payment-transaction";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { toastFail } from "@nepMeds/service/service-toast";
import { useState } from "react";
import CenterLoader from "../Common/Loader";

type Props = {
  appointmentData: IPatientAppointmentReqBody;
  doctorInfo: IDoctorListById;
  khaltiData?: IKhaltiPost;
  esewaData?: any;
};

const TransactionBox = (data: Props) => {
  const { handleKhaltiClick, khaltiLoading, esewaLoading, handleEsewaClick } =
    usePaymentTransaction();
  const [paymentMethod, setPaymentMethod] = useState<string>("1");
  const { mutateAsync: createPatientAppointment, isLoading } =
    useCreatePatientAppointment();
  const { data: methods, isLoading: methodLoading } = useGetPaymentMethods();

  const handlePaymentType = (type: string, idList: number[]) => {
    if (type === PAYMENTMODE.KHALTI.toString()) {
      handleKhaltiClick({
        product: {
          amount:
            +data?.doctorInfo?.schedule_rate *
            100 *
            data?.appointmentData?.availabilities.length,
          purchase_order_id: data?.doctorInfo?.id?.toString(),
          purchase_order_name: data?.doctorInfo?.name
        },
        appointments: idList
      });
    } else if (type === PAYMENTMODE.ESEWA.toString()) {
      handleEsewaClick({
        amount:
          +data?.doctorInfo?.schedule_rate *
          data?.appointmentData?.availabilities.length,
        appointments: idList,
        purchase_order_id: data?.doctorInfo?.id?.toString()
      });
    }
  };

  return (
    <div>
      {methodLoading && <CenterLoader />}
      <RadioGroup onChange={setPaymentMethod} value={paymentMethod} my={2}>
        {methods &&
          methods.map((e, index) => (
            <Box key={e.id} px={5} display={e.id === 3 ? "none" : "block"}>
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
        isLoading={isLoading || khaltiLoading || esewaLoading}
        onClick={async () => {
          try {
            const res = await createPatientAppointment({
              patientAppointmentDetails: {
                ...data.appointmentData
              }
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
    </div>
  );
};

export default TransactionBox;
