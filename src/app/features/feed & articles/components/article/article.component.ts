import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleModel} from "../../types/articleModel";
import {ArticleService} from "../../../../core/services/article.service";
import {FeedArticle} from "../../types/feedArticle";
import {
  ConfirmationDialogComponent
} from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit{
  @Input() article: ArticleModel = new ArticleModel();
  constructor(private route: ActivatedRoute,
              private articleService: ArticleService,
              private router: Router,
              private snackBar: SnackBarComponent,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id'] != undefined) {
        this.article.id = params['id'];
        this.getArticle();
      }
    });
  }

  getArticle() {
    this.articleService.getArticleById(this.article.id).subscribe((response: ArticleModel) => {
      this.article = response;
    });
  }

  getDate():String{
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

     return yyyy + '-' + mm + '-' + dd;
  }

  toggleFavorite() {
    if(this.article.isFavorite) {
      this.articleService.removeArticleFromFavorites(this.article.id).subscribe((response: boolean) => {
        if (response) {
          this.snackBar.openSnackBar('Articolul a fost șters din favorite!','');
          this.article.isFavorite = false;
        } else {
          this.snackBar.openSnackBar('Articolul nu a putut fi șters din favorite!','');
        }
      });
    }
    else {
      this.articleService.addArticleToFavorites(this.article.id).subscribe((response: boolean) => {
        if (response) {
          this.snackBar.openSnackBar('Articolul a fost adăugat la favorite!','');
          this.article.isFavorite = true;
        } else {
          this.snackBar.openSnackBar('Articolul nu a putut fi adăugat la favorite!','');
        }
      });
    }
  }

  onDeleteArticle(article: ArticleModel){
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
            this.router.navigate(['feed']);
          }
          else
            this.snackBar.openSnackBar('Articolul nu a putut fi șters!','');
        });
      }
    });
  }
}
