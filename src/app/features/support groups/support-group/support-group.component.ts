import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {SupportGroupNameDto} from "../../../../models/supportGroupNameDto";
import {PostDto} from "../../../../models/postDto";
import {GroupPostsService} from "../../../core/services/groupPosts.service";
import {CreatePostComponent} from "../../posts/create-post/create-post.component";

@Component({
  selector: 'app-support-group',
  templateUrl: './support-group.component.html',
  styleUrl: './support-group.component.css'
})
export class SupportGroupComponent {
  posts: PostDto[] = [];
  supportGroupNameDto: SupportGroupNameDto = new SupportGroupNameDto();

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private groupPostsService: GroupPostsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['groupName'] != undefined) {
        this.supportGroupNameDto.GroupName = params['groupName'];
        this.getPosts(this.supportGroupNameDto);
      }
    });
  }

  getPosts(supportGroupNameDto: SupportGroupNameDto) {
    this.groupPostsService.getPosts(supportGroupNameDto).subscribe((response: PostDto[]) => {
      response.forEach(x=>this.posts.push(x));
    });
  }

  onCreatePostClick() {
    const dialogRef: MatDialogRef<CreatePostComponent> = this.dialog.open(CreatePostComponent, {
      data: this.supportGroupNameDto.GroupName
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.posts = [];
        this.getPosts(this.supportGroupNameDto);
      }
    });
  }
}
