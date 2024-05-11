import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {FeedArticle} from "../../../feed & articles/types/feedArticle";
import {ProfileInfo} from "../../types/profileInfo";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  profileInfo: ProfileInfo = new ProfileInfo();

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData(){
    this.userService.getProfileInfo().subscribe((response: ProfileInfo) => {
      this.profileInfo = response;
    });
  }

}
