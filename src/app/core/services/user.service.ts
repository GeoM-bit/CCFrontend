import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {ProfileInfo} from "../../features/user profile/types/profileInfo";
import {ProfilePhoto} from "../../features/user profile/types/profilePhoto";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {
  }

  getUsersEmails(): Observable<String[]> {
    return this.http.get<String[]>(environment.baseUrl + '/api/User/get-users-emails');
  }

  getProfileInfo(): Observable<ProfileInfo> {
    return this.http.get<ProfileInfo>(environment.baseUrl + '/api/User/get-user-info');
  }

  uploadProfilePhoto(profilePhoto: ProfilePhoto): Observable<boolean>{
    return this.http.patch<boolean>(environment.baseUrl + '/api/User/update-profile-photo', profilePhoto);
  }
}
