import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ProfileInfo} from "../../../features/user profile/types/profileInfo";
import {Roles} from "../../enums/roles";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  profilePhoto: String = '';
  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.getProfilePhoto();
  }

  getProfilePhoto(){
    if(this.getRole())
      this.userService.getProfileInfo().subscribe((response: ProfileInfo) => {
        this.profilePhoto = response.profilePhoto;
    });
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  getRole(){
    let role = this.authenticationService.getRole();
    if(role!=null)
      return role;
    return false;
  }

  getUserName(){
    let userName = this.authenticationService.getUserEmail();
    if(userName!=null)
      return userName;
    return false;
  }

  checkTokenValidity(): boolean{
    return this.authenticationService.checkTokenExpired();
  }

  getLoginPage(){
    if(this.router.url.includes("login"))
      return true;
    return false;
  }

  goToSupportGroups(){
    this.router.navigate(['support-groups']);
  }
  goToFeed(){
    this.router.navigate(['feed']);
  }

  goToRegisterAccount(){
    this.router.navigate(['register']);
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  goToProfile(){
    this.router.navigate(['profile']);
  }

  goToCalendar(){
    this.router.navigate(['calendar']);
  }

  goToCounselingRequest(){
    this.router.navigate(['counseling-request']);
  }

  goToCounselingRequestTable(){
    this.router.navigate(['counseling-requests']);
  }

  isHealthStaff(){
    let role = this.authenticationService.getRole();
    if(role == Roles[4] || role == Roles[5])
      return true;
    return false;
  }
}
