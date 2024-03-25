import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {NewArticleModel} from "../../../models/newArticleModel";
import {FeedArticleDto} from "../../../models/feedArticleDto";
import {ArticleDto} from "../../../models/articleDto";
import {TitleDto} from "../../../models/titleDto";

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  constructor(private http: HttpClient) { }

  createArticle(article: NewArticleModel): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/Article/create-article', article);
  }

  getArticles(): Observable<FeedArticleDto[]>{
    return this.http.get<FeedArticleDto[]>(environment.baseUrl + '/api/Article/get-feed-articles');
  }

  getArticleByTitle(title: TitleDto): Observable<ArticleDto>{
    return this.http.post<ArticleDto>(environment.baseUrl + '/api/Article/get-article-by-title', title);
  }

}
