import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PostDto} from "../../../../models/postDto";

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.css'
})
export class PostPreviewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public post: PostDto) { }

}
