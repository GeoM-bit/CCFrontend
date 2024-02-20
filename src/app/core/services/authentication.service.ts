import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterModel } from '../../../models/registerModel';
import { environment } from '../../../environments/environment';
import {LoginModel} from "../../../models/loginModel";
import {TokenModel} from "../../../models/tokenModel";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor(private http: HttpClient) { }

  register(user: RegisterModel): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/Auth/register', user);
  }

  login(user: LoginModel): Observable<TokenModel> {
    let result = this.http.post<TokenModel>(environment.baseUrl + '/api/user/login', user);
    result.subscribe((response: TokenModel) => {
      if(response!=null) {
        localStorage.setItem('token', JSON.stringify({token: response.token}));
        localStorage.setItem('refreshToken', JSON.stringify({refreshToken: response.refreshToken}));
      }
    });
    return result;
  }

  getRole(): string
  {
    let token = localStorage.getItem('token');
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    return decodedJwtData.role;
  }

  refreshToken(token: TokenModel): Observable<any>{
    let result =  this.http.post<TokenModel>(environment.baseUrl + '/api/user/refresh-token', token);
    result.subscribe((response: TokenModel) => {
      localStorage.setItem('token', JSON.stringify({token: response.token}));
      localStorage.setItem('refreshToken', JSON.stringify({refreshToken: response.refreshToken}));
    });

    return result;
  }

}
