import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Comment} from "../../features/comments/types/comment";
import {CreateCommentModel} from "../../features/comments/types/createCommentModel";
import {PostId} from "../../features/posts/types/postId";
import {UpdateComment} from "../../features/comments/types/updateComment";

@Injectable({
  providedIn: 'root'
})

export class CommentsService {
  constructor(private http: HttpClient) {
  }

  getComments(postId: PostId): Observable<Comment[]> {
    return this.http.post<Comment[]>(
      environment.baseUrl + '/api/Comments/get-comments', postId);
  }

  createComment(createCommentDto: CreateCommentModel): Observable<Comment>{
    return this.http.post<Comment>(
      environment.baseUrl + '/api/Comments/create-comment', createCommentDto);
  }

  updateComment(id: string, updateCommentDto: UpdateComment): Observable<Comment>{
    return this.http.patch<Comment>(
      environment.baseUrl + `/api/Comments/update-comment/${id}`, updateCommentDto);
  }

  deleteComment(id: string): Observable<{}>{
    return this.http.delete(environment.baseUrl + `/api/Comments/delete-comment/${id}`);
  }
}
