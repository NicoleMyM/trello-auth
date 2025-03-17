import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode, JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  tokenName = 'token-trello';

  saveToken(token: string) {
    //localStorage.setItem('token', token);
    setCookie(this.tokenName, token, {expires: 365, path: '/'});
  }

  getToken() {
    const token = getCookie(this.tokenName);//localStorage.getItem('token');
    return token;
  }

  removeToken() {
    //localStorage.removeItem('token');
    removeCookie(this.tokenName);
  }

  isValidToken() {
    const token = this.getToken();
    if(!token){
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if(decodeToken && decodeToken.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
