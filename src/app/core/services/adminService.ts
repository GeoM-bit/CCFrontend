import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {TableUser} from "../../features/user management/types/tableUser";

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<TableUser[]> {
    return this.http.get<TableUser[]>(environment.baseUrl + '/api/Admin/get-users');
  }

  deleteUser(email: string):Observable<boolean>{
    return this.http.delete<boolean>(environment.baseUrl + '/api/Admin/delete-user/' + email);
  }

  updateUser(user: TableUser):Observable<boolean>{
    return this.http.post<boolean>(environment.baseUrl + '/api/Admin/update-user/', user);
  }
}
