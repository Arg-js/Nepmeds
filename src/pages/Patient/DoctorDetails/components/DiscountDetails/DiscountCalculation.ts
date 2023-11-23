import { AmountType } from "@nepMeds/config/enum";
import { IDiscountBasicDetails } from "@nepMeds/service/nepmeds-discount";
import { IDoctorListById } from "@nepMeds/service/nepmeds-patient-doctorList";

interface ICalcBookingFee {
  doctorInfo: IDoctorListById | undefined;
  selectedAvailability: number[];
}

interface ICalcDiscountedAmt extends ICalcBookingFee {
  discountDetails: IDiscountBasicDetails | null;
}

export const calcDiscountedAmount = ({
  doctorInfo,
  discountDetails,
  selectedAvailability,
}: ICalcDiscountedAmt) => {
  const calculateBookingFee = ({
    doctorInfo,
    selectedAvailability,
  }: ICalcBookingFee) => {
    if (!doctorInfo) return 0;
    return +doctorInfo.schedule_rate * selectedAvailability.length;
  };

  const calculateDiscountAmount = ({
    doctorInfo,
    discountDetails,
    selectedAvailability,
  }: ICalcDiscountedAmt) => {
    if (!doctorInfo || !discountDetails) return 0;

    const baseAmount = +doctorInfo.schedule_rate * selectedAvailability.length;

    return discountDetails.discount_type === AmountType.PERCENTAGE
      ? (discountDetails.value * baseAmount) / 100
      : discountDetails.value * selectedAvailability.length;
  };

  const bookingFee = calculateBookingFee({ doctorInfo, selectedAvailability });
  const discountAmount = calculateDiscountAmount({
    doctorInfo,
    discountDetails,
    selectedAvailability,
  });
  const discountedAmount = bookingFee - discountAmount;

  return { bookingFee, discountAmount, discountedAmount };
};
