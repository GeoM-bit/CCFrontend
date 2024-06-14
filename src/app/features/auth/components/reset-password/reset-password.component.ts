import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ResetPasswordModel} from "../../types/resetPasswordModel";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();
  resetPasswordForm: FormGroup;
  hidePassword = true;
  userEmail: string= "";
  userToken: string = "";

  constructor(private authenticationService: AuthenticationService,
              private snackBar: SnackBarComponent,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['userEmail'] != undefined && params['userToken'] !=undefined) {
        this.userEmail = params['userEmail'];
        this.userToken = params['userToken'];
      }
    });
    this.initForm();
  }

  togglePasswordVisibility(element: HTMLElement) {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.resetPasswordModel = this.resetPasswordForm.value;
    this.authenticationService.resetPassword(this.resetPasswordModel, this.userEmail, this.userToken).subscribe((response: boolean) => {
      if(response) {
        this.openSuccessfulLoginSnackBar();
        this.router.navigate(['login']);
      }
      else {
        this.openFailedLoginSnackBar();
      }
    });
  }

  openFailedLoginSnackBar() {
    this.snackBar.openSnackBar('Încercare eșuată de resetare a parolei!','');
  }

  openSuccessfulLoginSnackBar() {
    this.snackBar.openSnackBar('Parola a fost resetată cu succes!','');
  }

  initForm() {
    this.resetPasswordForm = new FormGroup({
      'newPassword': new FormControl(null, [Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#=+';:_,.?!@$%^&*-]).{10,}$")])
    });
  }
}
