import { Container } from "@chakra-ui/react";
import SignupForm from "@nepMeds/components/FormComponents/SignupForm/SignupForm";
import Header from "@nepMeds/components/Header/Header";
import Wrapper from "@nepMeds/components/Wrapper/Wrapper";

const SignUp = () => {
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
        <SignupForm />
      </Wrapper>
    </Container>
  );
};

export default SignUp;
