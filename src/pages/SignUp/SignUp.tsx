import LayoutContainer from "@nepMeds/components/Container";
import SignupForm from "@nepMeds/components/FormComponents/SignupForm/SignupForm";
import Header from "@nepMeds/components/Header/Header";
import Wrapper from "@nepMeds/components/Wrapper/Wrapper";

const SignUp = () => {
  return (
    <LayoutContainer>
      <Header />
      <Wrapper title="Welcome!" subtitle="Sign Up to your account">
        <SignupForm />
      </Wrapper>
    </LayoutContainer>
  );
};

export default SignUp;
