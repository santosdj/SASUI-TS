import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { PublicClientApplication } from '@azure/msal-browser';
import { Configuration } from '@azure/msal-browser';
import { msalConfig, loginRequest } from '../utils/configAzureAd';
import { getUserDetails, getUserPhoto } from '../utils/graphService';

type accountType = {
  isAuthenticated: boolean;
  user: {
    displayName: string;
    email: string;
    avatar: string;
  };
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

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [accountInfo, setAccountInfo] = useState<accountType>();

  async function signInWithAD() {
    try {
      console.log(msalConfig.auth.redirectUri);
      await msalInstance.loginPopup({
        scopes: loginRequest.scopes,
        prompt: 'select_account',
      });

      await getUserProfile();
      console.log('peguei o perfil');
    } catch (err) {
      setAccountInfo({
        isAuthenticated: false,
        user: { displayName: '', email: '', avatar: '' },
        error: err,
      });
    }
  }

  const signOut = () => {
    localStorage.removeItem('@AzureAd:accessToken');
    msalInstance.logout();
  };

  const getAccessToken = async (scopes: string[]) => {
    try {
      const accounts = msalInstance.getAllAccounts();

      if (accounts.length <= 0) throw new Error('Login required');
      const silentResult = await msalInstance.acquireTokenSilent({
        scopes: scopes,
        account: accounts[0],
      });

      return silentResult.accessToken;
    } catch (err) {
      if (err) {
        const interactiveResult = await msalInstance.acquireTokenPopup({
          scopes: scopes,
        });

        return interactiveResult.accessToken;
      } else {
        throw err;
      }
    }
  };

  const getUserProfile = useCallback(async () => {
    try {
      const accessToken = await getAccessToken(loginRequest.scopes);

      if (accessToken) {
        const user = await getUserDetails(accessToken);
        console.log(user);
        localStorage.setItem('@AzureAd:accessToken', accessToken);

        setAccountInfo({
          isAuthenticated: true,
          user: {
            displayName: user.displayName,
            email: user.mail || user.userPrincipalName,
            avatar: (await getMyPhoto(accessToken)) as string,
          },
          error: null,
        });
      }
    } catch (err) {
      setAccountInfo({
        isAuthenticated: false,
        user: { displayName: '', email: '', avatar: '' },
        error: err,
      });
    }
  }, []);

  async function getMyPhoto(accessToken: string) {
    return await getUserPhoto('me', accessToken)
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
  }

  useEffect(() => {
    const accounts = msalInstance.getAllAccounts();

    if (accounts && accounts.length > 0) {
      getUserProfile();
    }
  }, [getUserProfile]);

  return (
    <AuthContext.Provider value={{ signInWithAD, signOut, accountInfo }}>
      {children}
    </AuthContext.Provider>
  );
}
