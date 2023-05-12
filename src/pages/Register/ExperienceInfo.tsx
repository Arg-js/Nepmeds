import Wrapper from "./Wrapper";
import { ExperienceForm } from "@nepMeds/components/FormComponents";

const ExperienceInfo = () => {
  return (
    <Wrapper
      title="Experience Info"
      subtitle="Please enter your experience info for registration."
    >
      <ExperienceForm />
    </Wrapper>
  );
};

export default ExperienceInfo;
