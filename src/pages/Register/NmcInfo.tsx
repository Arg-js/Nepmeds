import Wrapper from "./Wrapper";
import { NmcForm } from "@nepMeds/components/FormComponents";

const NmcInfo = () => {
  return (
    <Wrapper
      title="NMC Info"
      subtitle="Please enter your NMC Information for registration."
    >
      <NmcForm />
    </Wrapper>
  );
};

export default NmcInfo;
