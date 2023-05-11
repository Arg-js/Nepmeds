import Wrapper from "./Wrapper";
import { CertificationInfoForm } from "@nepMeds/components/FormComponents";

const CertificationInfo = () => {
  return (
    <Wrapper
      title="Certification Info"
      subtitle="Please enter your Certification Information for registration."
    >
      <CertificationInfoForm />
    </Wrapper>
  );
};

export default CertificationInfo;
