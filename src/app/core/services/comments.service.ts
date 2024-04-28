import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {CommentInterface} from "../../features/comments/types/comment.interface";

@Injectable({
  providedIn: 'root'
})

export class CommentsService {
  constructor(private http: HttpClient) {
  }

  getComments(postId: string): Observable<CommentInterface[]> {
    return this.http.post<CommentInterface[]>(
      environment.baseUrl + '/api/Comments/get-comments', postId);
  }

  createComment(text: string, parentId: null | string, postId: string): Observable<CommentInterface>{
    return this.http.post<CommentInterface>(
      environment.baseUrl + '/api/Comments/create-comment', {text, parentId});
  }

  updateComment(id: string, text: string): Observable<CommentInterface>{
    return this.http.patch<CommentInterface>(
      environment.baseUrl + `/api/Comments/create-comment/${id}`, {text});
  }

  deleteComment(id: string): Observable<{}>{
    return this.http.delete(environment.baseUrl + `/api/Comments/delete-comment/${id}`);
  }
}
