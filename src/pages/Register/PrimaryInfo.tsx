import { PrimaryInfoForm } from "@nepMeds/components/FormComponents";
import Wrapper from "./Wrapper";

const PrimaryInfo = () => {
  return (
    <Wrapper
      title="Primary Information"
      subtitle="Please enter your Primary Information for registration."
    >
      <PrimaryInfoForm />
    </Wrapper>
  );
};

export default PrimaryInfo;
