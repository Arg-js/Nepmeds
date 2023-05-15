import { Container } from "@chakra-ui/react";
import LoginForm from "@nepMeds/components/FormComponents/LoginForm/LoginForm";
import Header from "@nepMeds/components/Header/Header";
import Wrapper from "@nepMeds/components/Wrapper/Wrapper";

const Login = () => {
  return (
    <Container
      maxWidth="100%"
      display="flex"
      flexDirection="column"
      maxHeight="100vh"
      p={0}
      gap={20}
    >
      <Header />
      <Wrapper title="Welcome back!" subtitle="Login to your account">
        <LoginForm />
      </Wrapper>
    </Container>
  );
};

export default Login;
