import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {SupportGroupDto} from "../../../models/supportGroupDto";
import {TokenModel} from "../../../models/tokenModel";
import {SupportGroupMemberModel} from "../../../models/supportGroupMemberModel";

@Injectable({
  providedIn: 'root'
})

export class SupportGroupsService {
  constructor(private http: HttpClient) {
  }

  getGroups(): Observable<SupportGroupDto[]> {
    return this.http.get<SupportGroupDto[]>(environment.baseUrl + '/api/SupportGroup/get-support-groups');
  }

  addMember(member: SupportGroupMemberModel): Observable<any> {
    return this.http.post<SupportGroupMemberModel>(environment.baseUrl + '/api/SupportGroup/add-member', member);
  }
}
