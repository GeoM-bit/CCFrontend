import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FavoriteArticle} from "../../types/favoriteArticle";

@Component({
  selector: 'app-favorite-article',
  templateUrl: './favorite-article.component.html',
  styleUrl: './favorite-article.component.css'
})
export class FavoriteArticleComponent {
  @Input() favoriteArticle: FavoriteArticle = new FavoriteArticle();
  @Output() removeArticle = new EventEmitter<string>();
}
