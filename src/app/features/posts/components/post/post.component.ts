import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../../types/postModel";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {GroupPostsService} from "../../../../core/services/groupPosts.service";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";

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
  constructor(private authenticationService: AuthenticationService,
              private postService: GroupPostsService,
              private snackBar: SnackBarComponent) {
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

  toggleLiked(){
    if(this.postData.isLiked) {
      this.postService.removeLikeFromPost(this.postData.postId).subscribe((response: boolean) => {
        if (response) {
          this.postData.isLiked = !this.postData.isLiked;
          this.postData.numberOfLikes = this.postData.numberOfLikes - 1;
        } else {
          this.snackBar.openSnackBar('A apărut o problemă! Nu a putut fi ștearsă aprecierea!','');
        }
      });
    }
    else {
      this.postService.likePost(this.postData.postId).subscribe((response: boolean) => {
        if (response) {
          this.postData.isLiked = !this.postData.isLiked;
          this.postData.numberOfLikes = this.postData.numberOfLikes + 1;
        } else {
          this.snackBar.openSnackBar('A apărut o problemă! Postarea nu a putut fi apreciată!','');
        }
      });
    }
  }
}
