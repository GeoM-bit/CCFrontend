import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {PostDto} from "../../../models/postDto";
import {SupportGroupNameDto} from "../../../models/supportGroupNameDto";

@Injectable({
  providedIn: 'root'
})

export class GroupPostsService {
  constructor(private http: HttpClient) {
  }

  getPosts(groupName: SupportGroupNameDto): Observable<PostDto[]> {
    return this.http.post<PostDto[]>(environment.baseUrl + '/api/Post/get-posts', groupName);
  }
}
