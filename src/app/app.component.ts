import {Component, OnInit, ViewChild} from '@angular/core';
import {ProfileInfo} from "./features/user profile/types/profileInfo";
import {Roles} from "./core/enums/roles";
import {AuthenticationService} from "./core/services/authentication.service";
import {UserService} from "./core/services/user.service";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'CCFrontend';
  profilePhoto: String = '';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router,
              private observer: BreakpointObserver) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getProfilePhoto();
    }, 500);
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  getProfilePhoto(){
    if(this.getRole())
      this.userService.getProfileInfo().subscribe((response: ProfileInfo) => {
        this.profilePhoto = response.profilePhoto;
      });
  }

  getUserName(){
    let userName = this.authenticationService.getUserName();
    if(userName!=null)
      return userName;
    return false;
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
    if(Roles[role] == Roles.Doctor || Roles[role] == Roles.Psychologist)
      return true;
    return false;
  }

  goToUserTable(){
    this.router.navigate(['user-table']);
  }

  isAdmin(){
    let role = this.authenticationService.getRole();
    if(Roles[role] == Roles.Admin)
      return true;
    return false;
  }

  toggleMenu() {
      this.sidenav.toggle();
  }
}
