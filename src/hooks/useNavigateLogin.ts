import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useNavigate } from "react-router-dom";

const useNavigateLogin = () => {
  const navigate = useNavigate();
  navigate(NAVIGATION_ROUTES.LOGIN);
};

export default useNavigateLogin;
