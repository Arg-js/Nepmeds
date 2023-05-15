import LayoutContainer from "@nepMeds/components/Container";
import OtpForm from "@nepMeds/components/FormComponents/OTP/OtpForm";
import Header from "@nepMeds/components/Header/Header";
import Wrapper from "@nepMeds/components/Wrapper/Wrapper";

const OtpSignUp = () => {
  return (
    <LayoutContainer>
      <Header />
      <Wrapper title="Welcome back!" subtitle="Sign Up to your account">
        <OtpForm />
      </Wrapper>
    </LayoutContainer>
  );
};

export default OtpSignUp;
