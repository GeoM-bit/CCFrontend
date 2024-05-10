import {Component, Input, OnInit} from '@angular/core';
import {PostDto} from "../../../../models/postDto";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
  selector: 'app-support-group-post',
  templateUrl: './support-group-post.component.html',
  styleUrl: './support-group-post.component.css'
})
export class SupportGroupPostComponent implements OnInit {
  @Input() postData: PostDto;
  showDiscussion = false;
  currentUsername: string;
  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.currentUsername = this.authenticationService.getUserEmail();
  }

  getDate():String{
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }
}
