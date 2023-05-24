import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { NepMedsResponse, api } from "./service-api";
import TokenService, { TokenDetails, TokenInfo } from "./service-token";

import { BroadcastChannel } from "broadcast-channel";
import { HttpClient } from "./service-axios";

const logoutChannel = new BroadcastChannel("logout");
const loginChannel = new BroadcastChannel("login");
const loginBroadcast = "logged_in";

export interface LoginDetails {
  email: string;
  password: string;
}
type AuthInfo = {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  is_doctor: boolean;
  is_superuser: boolean;
};

export const authTokenKey = "authToken";
export const auth = "authInfo";
const authTokenDetails = "authTokenDetails";

const initLogout = () => {
  try {
    TokenService.clearToken();
    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
};

const useLogoutMutation = (noToast?: boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(initLogout, {
    onSuccess: () => {
      logoutChannel.postMessage("Logout");
      queryClient.clear();
      queryClient.setQueryData(authTokenKey, () => false);
      navigate("/", { replace: true });
      !noToast && toastSuccess("Logged out Succesfully");
    },
  });
};

const initLogin = (loginData: LoginDetails) => {
  return HttpClient.post<NepMedsResponse<TokenDetails>>(api.login, loginData);
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(initLogin, {
    onSuccess: response => {
      loginChannel.postMessage(loginBroadcast);
      const tokens = {
        access: response.data.data.access,
        refresh: response.data.data.refresh,
      };
      TokenService.setToken(tokens);
      queryClient.setQueryData(authTokenKey, () => true);
      queryClient.setQueryData(auth, () => response);
      toastSuccess("Login Successful!!");
      navigate("/dashboard", { replace: true });
    },
    onError: error => {
      const loginErr = error as AxiosError<{ message: string; error: string }>;
      toastFail(
        loginErr.response?.data?.message ??
          loginErr.response?.data?.error ??
          "Login failed !"
      );
    },
  });
};

const initRefreshToken = async () => {
  try {
    // const response = await HttpClient.get<TokenDetails>(api.refreshToken, {
    //   params: {
    //     refreshToken: TokenService.getToken()?.refresh_token,
    //   },
    //   headers: {
    //     Authorization: "",
    //   },
    // });
    // const tokens = {
    //   access_token: response.data.access_token,
    //   refresh_token: response.data.refresh_token,
    // };
    // TokenService.setToken(tokens);
    return true;
  } catch (error) {
    return false;
  }
};

const checkAuthentication = async () => {
  if (TokenService.isAuthenticated()) {
    const tokenInfo = TokenService.getTokenDetails();
    if (tokenInfo && tokenInfo.exp * 1000 < Date.now() + 5 * 60 * 1000) {
      return initRefreshToken();
    }
    return Promise.resolve(true);
  } else if (TokenService.getToken()?.refresh) {
    return initRefreshToken();
  }
  return Promise.resolve(null);
};

/**
 * Check if user is authenticated
 * @returns boolean
 */
const useAuthentication = () => {
  const queryClient = useQueryClient();

  return useQuery(authTokenKey, checkAuthentication, {
    onSuccess: () => {
      const tokenDetails = TokenService.getTokenDetails();
      if (tokenDetails) {
        queryClient.setQueryData<TokenInfo>(authTokenDetails, {
          ...tokenDetails,
        });
      }
    },
  });
};

export const useUserInfoQuery = () => {
  return useQuery<AuthInfo>(auth);
};

const useLoginTokenDetailQuery = () => {
  return useQuery<unknown, unknown, TokenInfo>(authTokenDetails);
};

export {
  useAuthentication,
  useLoginMutation,
  useLoginTokenDetailQuery,
  useLogoutMutation,
};
