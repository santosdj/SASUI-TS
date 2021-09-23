import { Configuration } from "@azure/msal-browser";
// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID as string,
    redirectUri: process.env.REACT_APP_REDIRECT_URL,
    authority: `https://${process.env.REACT_APP_KNOWNAUTHORITIES}/${process.env.REACT_APP_TENANT_ID}`,
    knownAuthorities: [process.env.REACT_APP_KNOWNAUTHORITIES as string],
    postLogoutRedirectUri: "/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["user.read"],
};
