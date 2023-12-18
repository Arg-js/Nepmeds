import { AmountType } from "@nepMeds/config/enum";
import { IDiscountDetails } from "@nepMeds/service/nepmeds-discount";
import { IDoctorListById } from "@nepMeds/service/nepmeds-patient-doctorList";

interface ICalcBookingFee {
  doctorInfo: IDoctorListById | undefined;
  selectedAvailability: number[];
}

interface ICalcDiscountedAmt extends ICalcBookingFee {
  discountDetails: IDiscountDetails | null;
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
    let discountedAmountWithApplicableNo;
    const remainingApplicableCoupon =
      discountDetails.remaining_applicable_coupon;
    const onetime_coupon = discountDetails.onetime_coupon ? 1 : 0;
    const isConditionApplied = onetime_coupon || remainingApplicableCoupon;

    if (isConditionApplied) {
      if (selectedAvailability.length > isConditionApplied) {
        discountedAmountWithApplicableNo =
          +doctorInfo.schedule_rate * isConditionApplied;
      }
    }

    const baseAmount = +doctorInfo.schedule_rate * selectedAvailability.length;

    return discountDetails.discount_type === AmountType.PERCENTAGE
      ? (discountDetails.value *
          (discountedAmountWithApplicableNo || baseAmount)) /
          100
      : discountDetails.value *
          (discountedAmountWithApplicableNo
            ? isConditionApplied
            : selectedAvailability.length);
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
