export interface TokenDetails {
  access_token: string;
  refresh_token: string;
}

export interface TokenInfo {
  contactNo: string;
  email: string;
  id: null | number;
  name: string;
  profilePic: string;
  role: string;
  roleId: null | number;
  schemeBased: boolean;
  username: string;
  exp: number;
  workspacedataid: number;
}

function setToken(token: TokenDetails) {
  localStorage.setItem("token", token.access_token);
  localStorage.setItem("refresh_token", token.refresh_token);
}

function getToken() {
  try {
    return {
      access_token: localStorage.getItem("token") ?? "",
      refresh_token: localStorage.getItem("refresh_token") ?? "",
    } as TokenDetails;
  } catch (e) {
    return null;
  }
}

function getTokenDetails(): TokenInfo | null {
  try {
    const token = getToken();
    return token
      ? (JSON.parse(window.atob(token.access_token.split(".")[1])) as TokenInfo)
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
  return getTokenDetails()?.workspacedataid;
};

const TokenService = {
  setToken,
  getToken,
  getTokenDetails,
  isAuthenticated,
  clearToken,
};

export default TokenService;
