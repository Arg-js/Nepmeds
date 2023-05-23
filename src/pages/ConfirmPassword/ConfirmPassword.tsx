import LayoutContainer from "@nepMeds/components/Container";
import Header from "@nepMeds/components/Header/Header";
import Wrapper from "@nepMeds/components/Wrapper/Wrapper";
import ConfirmPasswordForm from "@nepMeds/components/FormComponents/ConfirmPassword/ConfirmPasswordForm";

const ConfirmPassword = () => {
  return (
    <LayoutContainer>
      <Header />
      <Wrapper title="Welcome!" subtitle="Recover your password">
        <ConfirmPasswordForm />
      </Wrapper>
    </LayoutContainer>
  );
};

export default ConfirmPassword;
