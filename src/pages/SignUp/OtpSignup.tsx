import OtpForm from "@nepMeds/components/FormComponents/OTP/OtpForm";

const OtpSignUp = ({ mobile, otp }: { mobile: string; otp: string }) => {
  return <OtpForm mobile={mobile} otp={otp} />;
};

export default OtpSignUp;
