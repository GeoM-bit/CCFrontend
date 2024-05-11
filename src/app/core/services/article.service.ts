import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {NewArticleModel} from "../../features/feed & articles/types/newArticleModel";
import {FeedArticle} from "../../features/feed & articles/types/feedArticle";
import {ArticleModel} from "../../features/feed & articles/types/articleModel";
import {Title} from "../../features/feed & articles/types/title";

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  constructor(private http: HttpClient) { }

  createArticle(article: NewArticleModel): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/Article/create-article', article);
  }

  getArticles(): Observable<FeedArticle[]>{
    return this.http.get<FeedArticle[]>(environment.baseUrl + '/api/Article/get-feed-articles');
  }

  getArticleByTitle(title: Title): Observable<ArticleModel>{
    return this.http.post<ArticleModel>(environment.baseUrl + '/api/Article/get-article-by-title', title);
  }

}
