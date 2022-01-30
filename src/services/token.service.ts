import { IUserRoles } from "../utils/interfaces/user.interfaces";

class TokenService {
  private refreshtokenname = "@SAS:refreshToken";
  private accesstokenname = "@SAS:accessToken";

  parseJwt(token: string) {
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64");
    return JSON.parse(payload.toString());
  }

  getLocalRefreshToken() {
    return localStorage.getItem(this.refreshtokenname);
  }
  getLocalAccessToken() {
    return localStorage.getItem(this.accesstokenname);
  }

  getUserRoles(): IUserRoles {
    const token = this.getLocalAccessToken();
    if (token) {
      const payload = this.parseJwt(token);
      const roles = {
        isManager: payload?.isManager ? payload.isManager : false,
        isCIOilseeds: payload?.isCIOilseeds ? payload.isCIOilseeds : false,
        isLicense: payload?.isLicense ? payload.isLicense : false,
        isCI: payload?.isCI ? payload.isCI : false,
        isLider: payload?.isLider ? payload.isLider : false,
        isExecutor: payload?.isExecutor ? payload.isExecutor : false,
        isAS400Admin: payload?.isAS400Admin ? payload.isAS400Admin : false,
        isSAPAdmin: payload?.isSAPAdmin ? payload.isSAPAdmin : false,
        isAdmin: payload?.isAdmin ? payload.isAdmin : false,
      };
      return roles;
    }
    return {
      isManager: false,
      isCIOilseeds: false,
      isLicense: false,
      isCI: false,
      isLider: false,
      isExecutor: false,
      isAS400Admin: false,
      isSAPAdmin: false,
      isAdmin: false,
    };
  }

  setLocalRefreshToken(token: string) {
    return localStorage.setItem(this.refreshtokenname, token);
  }
  setLocalAccessToken(token: string) {
    console.log("setting access tokens =", token);
    return localStorage.setItem(this.accesstokenname, token);
  }
  removeTokens() {
    localStorage.removeItem(this.accesstokenname);
    localStorage.removeItem(this.refreshtokenname);
  }
}

export default new TokenService();
