import Wrapper from "./Wrapper";
import { AcademicInfoForm } from "@nepMeds/components/FormComponents";

const AcademicInfo = () => {
  return (
    <Wrapper
      title="Academic Info"
      subtitle="Please enter your Academic Information for registration."
    >
      <AcademicInfoForm />
    </Wrapper>
  );
};

export default AcademicInfo;
