import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { NepMedsResponse, api } from "./service-api";
import TokenService, { TokenDetails, TokenInfo } from "./service-token";

import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { HttpClient } from "@nepMeds/service/service-axios";
import { BroadcastChannel } from "broadcast-channel";
import { logout } from "./nepmeds-patient-login";

const logoutChannel = new BroadcastChannel("logout");
const loginChannel = new BroadcastChannel("login");
const loginBroadcast = "logged_in";

export interface LoginDetails {
  email?: string;
  mobile_number?: string;
  password: string;
}
export const authTokenKey = "authToken";
export const auth = "userInfo";
const authTokenDetails = "authTokenDetails";

const initLogout = async ({ user }: { user?: string }) => {
  try {
    const refreshToken = TokenService.getToken()?.refresh;
    await logout({ refresh: refreshToken });
    TokenService.clearToken();
    console.error(user);
    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
};

const useLogoutMutation = ({
  noToast,
  user,
}: {
  noToast?: boolean;
  user?: string;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(initLogout, {
    onSuccess: () => {
      logoutChannel.postMessage("Logout");
      queryClient.clear();
      queryClient.setQueryData(authTokenKey, () => false);
      localStorage.setItem("doctor", "false");
      localStorage.setItem("admin", "false");
      user !== "PATIENT"
        ? navigate(NAVIGATION_ROUTES.DOCTOR_LOGIN, { replace: true })
        : navigate(NAVIGATION_ROUTES.LOGIN, { replace: true });
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
      navigate(`/${NAVIGATION_ROUTES.DASHBOARD}`, { replace: true });
      toastSuccess("Login Successful!!");
    },
    onError: error => {
      const loginErr = serverErrorResponse(error);
      toastFail(loginErr);
    },
  });
};

// const initRefreshToken = async () => {
//   try {
//     // const response = await HttpClient.get<TokenDetails>(api.refreshToken, {
//     //   params: {
//     //     refreshToken: TokenService.getToken()?.refresh_token,
//     //   },
//     //   headers: {
//     //     Authorization: "",
//     //   },
//     // });
//     // const tokens = {
//     //   access_token: response.data.access_token,
//     //   refresh_token: response.data.refresh_token,
//     // };
//     // TokenService.setToken(tokens);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

const checkAuthentication = async () => {
  // if (TokenService.isAuthenticated()) {
  //   const tokenInfo = TokenService.getTokenDetails();
  //   if (tokenInfo && tokenInfo.exp * 1000 < Date.now() + 5 * 60 * 1000) {
  //     return initRefreshToken();
  //   }
  //   return Promise.resolve(true);
  // } else if (TokenService.getToken()?.refresh) {
  //   return initRefreshToken();
  // }
  // return Promise.resolve(null);
  if (TokenService.getTokenDetails()) {
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
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

const checkUserInfo = async () => {
  return TokenService.getTokenDetails();
};

export const useUserInfoQuery = () => {
  return useQuery<TokenInfo | null>(auth, checkUserInfo);
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
