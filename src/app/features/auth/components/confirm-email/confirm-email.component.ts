import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnInit{
  userEmail: string = "";
  userToken: string = "";
  confirmed= false;
  loading = true;

  constructor(private authService: AuthenticationService,
              private route: ActivatedRoute,
              private snackBar: SnackBarComponent,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['userEmail'] !== undefined && params['userToken'] !== undefined) {
        this.userEmail = params['userEmail'];
        this.userToken = params['userToken'];
      }
      this.confirmEmail();
    });
  }

  confirmEmail(): void {
    this.authService.confirmEmail(this.userEmail, this.userToken).subscribe(result=>{
      this.loading=false;
      if(result){
        this.confirmed=true;
        document.cookie = "confirmEmailToken=; Max-Age=-99999999; path=/;Secure;SameSite=None";
      }
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 5000);
    })
  }
}
