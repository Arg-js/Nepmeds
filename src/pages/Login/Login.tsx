import { Container } from "@chakra-ui/react";
import LoginCard from "@nepMeds/components/Card/LoginCard";
import Header from "@nepMeds/components/Header/Header";

const Login = () => {
  return (
    <Container
      maxWidth="100%"
      display="flex"
      flexDirection="column"
      maxHeight="100vh"
      gap={12}
    >
      <Header />
      <LoginCard />
    </Container>
  );
};

export default Login;
