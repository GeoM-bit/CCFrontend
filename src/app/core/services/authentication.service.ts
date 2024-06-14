import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterModel } from '../../features/auth/types/registerModel';
import { environment } from '../../../environments/environment';
import {LoginModel} from "../../features/auth/types/loginModel";
import {TokenModel} from "../../features/auth/types/tokenModel";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ResetPasswordModel} from "../../features/auth/types/resetPasswordModel";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  register(user: RegisterModel): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/Auth/register', user, {withCredentials: true});
  }

  confirmEmail(userEmail: string, userToken: string){
    return this.http.get(environment.baseUrl + '/api/Auth/confirm-email/'+ userEmail + "/" + userToken,{ withCredentials: true });
  }

  login(user: LoginModel): Observable<TokenModel> {
    let result = this.http.post<TokenModel>(environment.baseUrl + '/api/Auth/login', user);
    result.subscribe((response: TokenModel) => {
      if(response!=null) {
        localStorage.setItem('token', JSON.stringify({token: response.token}));
      }
    });
    return result;
  }

  logout() {
    this.http.post<any>(environment.baseUrl + '/api/Auth/logout', null)
      .subscribe((response: any) => {
        localStorage.removeItem('token');
      });
  }

  forgotPassword(model: ResetPasswordModel){
    return this.http.post(environment.baseUrl + '/api/Auth/forgot-password', model, { withCredentials: true });
  }

  resetPassword(model: ResetPasswordModel, userEmail: string, userToken: string){
    return this.http.post(environment.baseUrl + '/api/Auth/reset-password/'+ userEmail + "/" + userToken, model, { withCredentials: true });
  }

  replaceToken(newToken: String){
    localStorage.removeItem('token');
    localStorage.setItem('token', JSON.stringify({token: newToken}));
  }

  getRole(): string
  {
    let token = localStorage.getItem('token');
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    return decodedJwtData.role;
  }

  getUserEmail(): string {
    let token = localStorage.getItem('token');
    if (token != null) {
      let jwtData = token.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);

      return decodedJwtData.email;
    }
    return null;
  }

  getUserName(): string {
    let token = localStorage.getItem('token');
    if (token != null) {
      let jwtData = token.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);

      return decodedJwtData.name;
    }
    return null;
  }

  checkTokenExpired(): boolean {
    if (this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
      return true;
    }
    return false;
  }
}
