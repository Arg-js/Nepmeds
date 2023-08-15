import {
  IGetDoctorBasicProfile,
  useDoctorBasicProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import { FC, PropsWithChildren, createContext } from "react";

interface IAuthDataContext {
  data: IGetDoctorBasicProfile | undefined;
  isLoading: boolean;
  dataRefetch: () => void;
}

export const AuthDataContext = createContext<IAuthDataContext | null>(null);
const AuthDataProvider: FC<PropsWithChildren> = props => {
  const { data, isLoading, refetch } = useDoctorBasicProfile();

  return (
    <AuthDataContext.Provider
      value={{
        data,
        isLoading,
        dataRefetch: refetch,
      }}
    >
      {props.children}
    </AuthDataContext.Provider>
  );
};

export default AuthDataProvider;
