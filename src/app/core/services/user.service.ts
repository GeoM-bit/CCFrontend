import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {
  }

  getUsersEmails(): Observable<String[]> {
    return this.http.get<String[]>(environment.baseUrl + '/api/User/get-users-emails');
  }
}
