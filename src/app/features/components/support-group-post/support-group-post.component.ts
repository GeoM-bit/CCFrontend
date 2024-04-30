import {Component, Input} from '@angular/core';
import {PostDto} from "../../../../models/postDto";

@Component({
  selector: 'app-support-group-post',
  templateUrl: './support-group-post.component.html',
  styleUrl: './support-group-post.component.css'
})
export class SupportGroupPostComponent {
  @Input() postData: PostDto;
  showDiscussion = false;

  toggleDiscussion() {
    this.showDiscussion  = !this.showDiscussion;
  }


}
