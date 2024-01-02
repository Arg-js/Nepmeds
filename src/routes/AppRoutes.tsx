import { useRoutes } from "react-router-dom";
import {
  adminRoutes,
  doctorRoutes,
  openRoutes,
  paientRoutes,
} from "./routeConfig";
import {
  useAuthentication,
  useLoginTokenDetailQuery,
} from "@nepMeds/service/nepmeds-auth";
import CenterLoader from "@nepMeds/components/Common/Loader";
import { Suspense } from "react";

const AppRoutes = () => {
  const { data: isAuthenticated, isLoading } = useAuthentication();
  const { data: userInfo } = useLoginTokenDetailQuery();
  const element = useRoutes(
    isAuthenticated
      ? userInfo?.is_superuser
        ? adminRoutes
        : userInfo?.is_patient
        ? paientRoutes
        : doctorRoutes
      : openRoutes
  );

  if (isLoading) {
    return <CenterLoader h="100vh" alignItems={"center"} />;
  }

  return (
    <Suspense fallback={<CenterLoader h={"100vh"} alignItems={"center"} />}>
      {element}
    </Suspense>
  );
};

export default AppRoutes;
