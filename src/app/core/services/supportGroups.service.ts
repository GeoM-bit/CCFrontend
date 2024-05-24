import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {SupportGroupModel} from "../../features/support groups/types/supportGroupModel";
import {SupportGroupMemberModel} from "../../features/support groups/types/supportGroupMemberModel";
import {SupportGroupName} from "../../features/support groups/types/supportGroupName";
import {NewSupportGroupModel} from "../../features/support groups/types/newSupportGroupModel";
import {UserProfileSupportGroup} from "../../features/user profile/types/userProfileSupportGroup";

@Injectable({
  providedIn: 'root'
})

export class SupportGroupsService {
  constructor(private http: HttpClient) {
  }

  getGroups(): Observable<SupportGroupModel[]> {
    return this.http.get<SupportGroupModel[]>(environment.baseUrl + '/api/SupportGroup/get-support-groups');
  }

  addMember(member: SupportGroupMemberModel): Observable<any> {
    return this.http.post<SupportGroupMemberModel>(environment.baseUrl + '/api/SupportGroup/add-member', member);
  }

  removeMember(member: SupportGroupMemberModel): Observable<any> {
    return this.http.post<SupportGroupMemberModel>(environment.baseUrl + '/api/SupportGroup/remove-member', member);
  }

  deleteGroup(groupName: SupportGroupName): Observable<Boolean> {
    return this.http.post<Boolean>(environment.baseUrl + '/api/SupportGroup/delete-group', groupName);
  }

  getNonMembersEmails(groupName: SupportGroupName): Observable<String[]> {
    return this.http.post<String[]>(environment.baseUrl + '/api/SupportGroup/get-non-members', groupName);
  }

  createGroup(supportGroupModel: NewSupportGroupModel): Observable<any> {
    return this.http.post<NewSupportGroupModel>(environment.baseUrl + '/api/SupportGroup/create-group', supportGroupModel);
  }

  getGroupsForProfile():Observable<UserProfileSupportGroup[]>{
    return this.http.get<UserProfileSupportGroup[]>(environment.baseUrl + '/api/SupportGroup/get-groups-for-profile');
  }
}
