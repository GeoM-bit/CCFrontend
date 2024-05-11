import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../../types/postModel";
import {AuthenticationService} from "../../../../core/services/authentication.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class SupportGroupPostComponent implements OnInit {
  @Input() postData: PostModel;
  @Input() showComments: boolean = true;
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
