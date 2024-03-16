import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateArticleComponent} from "../create-article/create-article.component";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{
  onCreateArticleClick()
  {
    this.dialog.open(CreateArticleComponent);
  }

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }
}
