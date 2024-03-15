import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateArticleComponent} from "../create-article/create-article.component";
import {EditorChangeSelection} from "ngx-quill";
import {EditorChangeContent} from "ngx-quill";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{

  editorText="";
  onCreatePostClick()
  {
    this.dialog.open(CreateArticleComponent);
  }

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection)
  {
    this.editorText=event['editor']['root']['innerHTML'];
  }
}
