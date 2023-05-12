import { Container } from "@chakra-ui/react";
import OtpForm from "@nepMeds/components/FormComponents/OTP/OtpForm";
import Header from "@nepMeds/components/Header/Header";
import Wrapper from "@nepMeds/components/Wrapper/Wrapper";

const OtpSignUp = () => {
  return (
    <Container
      maxWidth="100%"
      display="flex"
      flexDirection="column"
      maxHeight="100vh"
      gap={12}
    >
      <Header />
      <Wrapper title="Welcome back!" subtitle="Sign Up to your account">
        <OtpForm />
      </Wrapper>
    </Container>
  );
};

export default OtpSignUp;
