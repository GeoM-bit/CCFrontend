import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {PostModel} from "../../../posts/types/postModel";
import {SupportGroupName} from "../../types/supportGroupName";
import {GroupPostsService} from "../../../../core/services/groupPosts.service";
import {CreatePostComponent} from "../../../posts/components/create-post/create-post.component";

@Component({
  selector: 'app-support-group',
  templateUrl: './support-group.component.html',
  styleUrl: './support-group.component.css'
})
export class SupportGroupComponent {
  posts: PostModel[] = [];
  supportGroupName: SupportGroupName = new SupportGroupName();
  description: string;
  members: string;
  noPosts: boolean = false;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private groupPostsService: GroupPostsService,
              private router: Router) {

    this.description = this.router.getCurrentNavigation()?.extras.state.description;
    this.members = this.router.getCurrentNavigation()?.extras.state.members;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['groupName'] != undefined) {
        this.supportGroupName.groupName = params['groupName'];
        this.getPosts(this.supportGroupName);
      }
    });
  }

  getPosts(supportGroupNameDto: SupportGroupName) {
    this.groupPostsService.getPosts(supportGroupNameDto).subscribe((response: PostModel[]) => {
      if(response)
        response.forEach(x=>this.posts.push(x));
      else
        this.noPosts=true;
    });
  }

  onCreatePostClick() {
    const dialogRef: MatDialogRef<CreatePostComponent> = this.dialog.open(CreatePostComponent, {
      data: this.supportGroupName.groupName
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.posts = [];
        this.getPosts(this.supportGroupName);
      }
    });
  }
}
