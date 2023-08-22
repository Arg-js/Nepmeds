import OtpForm from "@nepMeds/components/FormComponents/OTP/OtpForm";

const OtpSignUp = ({
  mobile,
  isResetPassword,
}: {
  mobile: string;
  isResetPassword: boolean;
}) => {
  return <OtpForm mobile={mobile} isResetPassword={isResetPassword} />;
};

export default OtpSignUp;
