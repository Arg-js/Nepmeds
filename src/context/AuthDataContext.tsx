import {
  IGetDoctorBasicProfile,
  useDoctorBasicProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import { FC, PropsWithChildren, createContext } from "react";

interface IAuthDataContext {
  data: IGetDoctorBasicProfile | undefined;
  isLoading: boolean;
}

export const AuthDataContext = createContext<IAuthDataContext | null>(null);
const AuthDataProvider: FC<PropsWithChildren> = props => {
  const { data, isLoading } = useDoctorBasicProfile();

  return (
    <AuthDataContext.Provider
      value={{
        data,
        isLoading,
      }}
    >
      {props.children}
    </AuthDataContext.Provider>
  );
};

export default AuthDataProvider;
