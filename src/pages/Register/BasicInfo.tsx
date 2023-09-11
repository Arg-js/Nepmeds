import { BasicInfoForm } from "@nepMeds/components/FormComponents";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";

const BasicInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state) navigate(NAVIGATION_ROUTES.DOCTOR_LOGIN);
  }, [location.state]);
  return (
    <Wrapper
      title="Registration"
      subtitle="Please enter your details for registration."
    >
      <BasicInfoForm hidePasswordField={true} />
    </Wrapper>
  );
};

export default BasicInfo;
