import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {NewArticleModel} from "../../features/feed & articles/types/newArticleModel";
import {FeedArticle} from "../../features/feed & articles/types/feedArticle";
import {ArticleModel} from "../../features/feed & articles/types/articleModel";
import {FavoriteArticle} from "../../features/user profile/types/favoriteArticle";

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

  getArticleById(id: String): Observable<ArticleModel>{
    return this.http.get<ArticleModel>(environment.baseUrl + '/api/Article/get-article-by-title/' + id);
  }

  getFavoriteArticles(): Observable<FavoriteArticle[]>{
    return this.http.get<FavoriteArticle[]>(environment.baseUrl + '/api/Article/get-favorite-articles');
  }

  addArticleToFavorites(articleId: String): Observable<boolean>{
    return this.http.get<boolean>(environment.baseUrl + '/api/Article/add-article-to-favorites/' + articleId);
  }

  removeArticleFromFavorites(articleId: String): Observable<boolean>{
    return this.http.delete<boolean>(environment.baseUrl + '/api/Article/remove-article-from-favorites/' + articleId);
  }

  deleteArticle(articleId: String): Observable<boolean>{
    return this.http.delete<boolean>(environment.baseUrl + '/api/Article/delete-article/' + articleId);
  }
}
