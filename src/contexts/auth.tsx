/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
import {
  PublicClientApplication,
  Configuration,
  AuthenticationResult,
} from "@azure/msal-browser";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import api from "../services/api";
import TokenService from "../services/token.service";
import {
  msalConfig,
  loginRequest,
  loginRequest2,
} from "../utils/configAzureAd";
import { getUserDetails, getUserPhoto } from "../utils/graphService";
import { IUserRoles } from "../utils/interfaces/user.interfaces";

interface IBackendAuthResult {
  authtoken: string;
  refreshtoken: string;
  message: string;
  success: boolean;
}

type accountType = {
  isAuthenticated: boolean;
  user: {
    displayName: string;
    email: string;
    avatar: string;
    roles: IUserRoles;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
};

type AuthContextType = {
  signInWithAD: () => Promise<void>;
  signOut: () => void;
  accountInfo: accountType | undefined;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

const msalInstance = new PublicClientApplication(msalConfig as Configuration);

export function AuthProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const [accountInfo, setAccountInfo] = useState<accountType>();

  const getAuthResult = async (
    scopes: string[]
  ): Promise<AuthenticationResult> => {
    try {
      const accounts = msalInstance.getAllAccounts();

      if (accounts.length <= 0) throw new Error("Login required");
      const silentResult = await msalInstance.acquireTokenSilent({
        scopes,
        account: accounts[0],
      });

      return silentResult;
    } catch (err) {
      if (err) {
        const interactiveResult = await msalInstance.acquireTokenPopup({
          scopes,
        });

        return interactiveResult;
      }
      throw err;
    }
  };

  const getBackEndAuthResult = async (
    idToken: string,
    email: string
  ): Promise<IBackendAuthResult> => {
    try {
      const response = await api.post("/sessions/azure", {
        idToken,
        email,
      });
      return {
        authtoken: response.data.authtoken,
        refreshtoken: response.data.refreshtoken,
        message: "",
        success: true,
      };
    } catch (err: any) {
      return {
        authtoken: "",
        refreshtoken: "",
        message: err.response ? err.response.data.message : err.message,
        success: false,
      };
    }
  };

  async function getMyPhoto(accessToken: string) {
    const result = await getUserPhoto("me", accessToken)
      .then(function (response) {
        if (response.ok) {
          return response.blob();
        }
      })
      .then(function (photoBlob) {
        if (photoBlob) {
          return URL.createObjectURL(photoBlob);
        }
      });
    return result;
  }

  const getUserProfile = useCallback(async () => {
    try {
      // const accessToken = await getAccessToken(loginRequest2.scopes);
      const authResult = await getAuthResult(loginRequest2.scopes);

      const { accessToken, idToken } = authResult;

      if (accessToken) {
        const user = await getUserDetails(accessToken);
        console.log(user);
        localStorage.setItem("@AzureAd:accessToken", accessToken);
        localStorage.setItem("@AzureAd:idToken", idToken);
        console.log("Setting account...");

        // get api access token.. if fails login fails..
        const backendResult = await getBackEndAuthResult(idToken, user.mail);

        if (backendResult.success) {
          TokenService.setLocalAccessToken(backendResult.authtoken);
          TokenService.setLocalRefreshToken(backendResult.refreshtoken);
          console.log(TokenService.getUserRoles());
          const userRoles = TokenService.getUserRoles();

          setAccountInfo({
            isAuthenticated: true,
            user: {
              displayName: user.displayName,
              email: user.mail || user.userPrincipalName,
              avatar: (await getMyPhoto(accessToken)) as string,
              roles: userRoles,
            },
            error: null,
          });
        } else {
          // eslint-disable-next-line no-alert
          window.alert(`Erro ao autenticar ${backendResult.message}`);
          setAccountInfo({
            isAuthenticated: false,
            user: {
              displayName: "",
              email: "",
              avatar: "",
              roles: {},
            },
            error: backendResult.message,
          });
        }
      }
    } catch (err) {
      setAccountInfo({
        isAuthenticated: false,
        user: { displayName: "", email: "", avatar: "", roles: {} },
        error: err,
      });
    }
  }, []);

  async function signInWithAD() {
    try {
      await msalInstance.loginPopup({
        scopes: loginRequest.scopes,
        prompt: "select_account",
      });

      await getUserProfile();
      console.log("peguei o perfil...retornando...");
    } catch (err) {
      setAccountInfo({
        isAuthenticated: false,
        user: { displayName: "", email: "", avatar: "", roles: {} },
        error: err,
      });
    }
  }

  const signOut = () => {
    localStorage.removeItem("@AzureAd:accessToken");
    localStorage.removeItem("@AzureAd:idToken");
    TokenService.removeTokens();
    msalInstance.logoutRedirect();
  };

  useEffect(() => {
    const accounts = msalInstance.getAllAccounts();
    console.log("No use effect do context");
    if (accounts && accounts.length > 0) {
      getUserProfile();
      console.log("Pegou o user profile no useEffect");
    }
  }, [getUserProfile]);

  return (
    <AuthContext.Provider value={{ signInWithAD, signOut, accountInfo }}>
      {children}
    </AuthContext.Provider>
  );
}
