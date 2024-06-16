import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FeedArticle} from "../../types/feedArticle";
import {ArticleService} from "../../../../core/services/article.service";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";
import {
  ConfirmationDialogComponent
} from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-feed-article',
  templateUrl: './feed-article.component.html',
  styleUrl: './feed-article.component.css'
})
export class FeedArticleComponent implements OnInit{
  @Input() articleData: FeedArticle;
  @Output() refreshArticle = new EventEmitter<String>();
  @Output() getAllArticles = new EventEmitter();

  constructor( private router: Router,
               private articleService: ArticleService,
               private snackBar: SnackBarComponent,
               private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onFeedArticleClick(){
    this.router.navigate(['article', this.articleData.id]);
  }

  toggleFavorite() {
    if(this.articleData.isFavorite) {
      this.articleService.removeArticleFromFavorites(this.articleData.id).subscribe((response: boolean) => {
        if (response) {
          this.snackBar.openSnackBar('Articolul a fost șters din favorite!','');
          this.refreshArticle.emit(this.articleData.id);
        } else {
          this.snackBar.openSnackBar('Articolul nu a putut fi șters din favorite!','');
        }
      });
    }
    else {
      this.articleService.addArticleToFavorites(this.articleData.id).subscribe((response: boolean) => {
        if (response) {
          this.snackBar.openSnackBar('Articolul a fost adăugat la favorite!','');
          this.refreshArticle.emit(this.articleData.id);
        } else {
          this.snackBar.openSnackBar('Articolul nu a putut fi adăugat la favorite!','');
        }
      });
    }
  }

  onDeleteArticle(article: FeedArticle){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: "Confirmați ștergerea articolului",
        content: "Sunteți sigur/ă că doriți să ștergeți articolul " + article.title + "?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.articleService.deleteArticle(article.id).subscribe(result=>{
          if(result){
            this.snackBar.openSnackBar('Articolul a fost șters!','');
            this.getAllArticles.emit();
          }
          else
            this.snackBar.openSnackBar('Articolul nu a putut fi șters!','');
        });
      }
    });
  }
}
