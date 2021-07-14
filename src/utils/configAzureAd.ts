import { Configuration } from "@azure/msal-browser";
// Config object to be passed to Msal on creation
export const msalConfig : Configuration = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID  as string,
    redirectUri:"http://localhost:3000/signin",
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
    knownAuthorities: ["login.microsoftonline.com"],
    postLogoutRedirectUri: "/",
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
}

export const loginRequest = {
  scopes: ['user.read'],
}
