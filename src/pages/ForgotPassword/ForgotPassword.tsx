import LayoutContainer from "@nepMeds/components/Container";
import ForgotPasswordForm from "@nepMeds/components/FormComponents/ForgotPasswordForm/ForgotPasswordForm";
import Header from "@nepMeds/components/Header/Header";
import Wrapper from "@nepMeds/components/Wrapper/Wrapper";

const ForgotPassword = () => {
  return (
    <LayoutContainer>
      <Header />
      <Wrapper title="Welcome!" subtitle="Recover your password">
        <ForgotPasswordForm />
      </Wrapper>
    </LayoutContainer>
  );
};

export default ForgotPassword;
