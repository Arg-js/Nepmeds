import Wrapper from "./Wrapper";
import { NmcForm } from "@nepMeds/components/FormComponents";

const NmcInfo = () => {
  return (
    <Wrapper
      title="NMC/ NHPC/ NAMC Info"
      subtitle="Please enter your NMC/ NHPC/ NAMC Information for registration."
    >
      <NmcForm />
    </Wrapper>
  );
};

export default NmcInfo;
