export interface TokenDetails {
  access: string;
  refresh: string;
}

export interface TokenInfo {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  email: string;
  is_doctor: boolean;
  is_patient: boolean;
  is_superuser: boolean;
}

function setToken(token: TokenDetails) {
  localStorage.setItem("token", token.access);
  localStorage.setItem("refresh_token", token.refresh);
}

function getToken() {
  try {
    return {
      access: localStorage.getItem("token") ?? "",
      refresh: localStorage.getItem("refresh_token") ?? "",
    } as TokenDetails;
  } catch (e) {
    return null;
  }
}

function getTokenDetails(): TokenInfo | null {
  try {
    const token = getToken();
    return token
      ? (JSON.parse(window.atob(token.access.split(".")[1])) as TokenInfo)
      : null;
  } catch (e) {
    return null;
  }
}

function isAuthenticated() {
  const tokenDetails = getTokenDetails();
  if (tokenDetails) {
    return tokenDetails.exp * 1000 > Date.now();
  } else {
    return false;
  }
}

function clearToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
}

export const getRole = () => {
  return getTokenDetails();
};

const TokenService = {
  setToken,
  getToken,
  getTokenDetails,
  isAuthenticated,
  clearToken,
};

export default TokenService;
