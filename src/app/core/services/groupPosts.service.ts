import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {PostModel} from "../../features/posts/types/postModel";
import {SupportGroupName} from "../../features/support groups/types/supportGroupName";
import {NewPostModel} from "../../features/posts/types/newPostModel";

@Injectable({
  providedIn: 'root'
})

export class GroupPostsService {
  constructor(private http: HttpClient) {
  }

  getPosts(groupName: SupportGroupName): Observable<PostModel[]> {
    return this.http.post<PostModel[]>(environment.baseUrl + '/api/Post/get-posts', groupName);
  }

  createPost(newPost: NewPostModel): Observable<boolean> {
    return this.http.post<boolean>(environment.baseUrl + '/api/Post/create-post', newPost);
  }

  likePost(postId: String): Observable<boolean>{
    return this.http.get<boolean>(environment.baseUrl + '/api/Post/like-post/' + postId);
  }

  removeLikeFromPost(postId: String): Observable<boolean>{
    return this.http.get<boolean>(environment.baseUrl + '/api/Post/remove-like/' + postId);
  }
}
