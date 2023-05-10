import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
// import BasicInformation from "@nepMeds/pages/Register/BasicInfo";
import Login from "@nepMeds/pages/Login/Login";

const routes = [
  // {
  //   path: NAVIGATION_ROUTES.REGISTER,
  //   element: <BasicInformation />,
  // },
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <Login />,
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
