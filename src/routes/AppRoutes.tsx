import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import BasicInformation from "@nepMeds/pages/Register/BasicInfo";

const routes = [
  {
    path: NAVIGATION_ROUTES.REGISTER,
    element: <BasicInformation />,
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
