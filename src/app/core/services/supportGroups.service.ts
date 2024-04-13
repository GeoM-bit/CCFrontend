import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {SupportGroupDto} from "../../../models/supportGroupDto";
import {SupportGroupMemberModel} from "../../../models/supportGroupMemberModel";
import {SupportGroupNameDto} from "../../../models/supportGroupNameDto";
import {NewSupportGroupModel} from "../../../models/newSupportGroupModel";

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

  removeMember(member: SupportGroupMemberModel): Observable<any> {
    return this.http.post<SupportGroupMemberModel>(environment.baseUrl + '/api/SupportGroup/remove-member', member);
  }

  deleteGroup(groupName: SupportGroupNameDto): Observable<Boolean> {
    return this.http.post<Boolean>(environment.baseUrl + '/api/SupportGroup/delete-group', groupName);
  }

  getNonMembersEmails(groupName: SupportGroupNameDto): Observable<String[]> {
    return this.http.post<String[]>(environment.baseUrl + '/api/SupportGroup/get-non-members', groupName);
  }

  createGroup(supportGroupModel: NewSupportGroupModel): Observable<any> {
    return this.http.post<NewSupportGroupModel>(environment.baseUrl + '/api/SupportGroup/create-group', supportGroupModel);
  }
}
