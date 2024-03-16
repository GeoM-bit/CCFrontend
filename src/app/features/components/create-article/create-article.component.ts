import {Component, OnInit} from '@angular/core';
import {EditorChangeContent, EditorChangeSelection} from "ngx-quill";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent implements OnInit{
  editorText="";
  articleTitle: string = '';
  ngOnInit(): void {
    }
  changedEditor(event: EditorChangeContent | EditorChangeSelection)
  {
    this.editorText=event['editor']['root']['innerHTML'];
  }

  onSubmitArticleClick(){
console.log(this.articleTitle);
  }
}
