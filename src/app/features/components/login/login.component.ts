import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {LoginModel} from "../../../../models/loginModel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../core/utils/customValidators";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {Roles} from "../../../core/enums/roles";
import {TokenModel} from "../../../../models/tokenModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel;
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private authenticationService: AuthenticationService, private snackBar: SnackBarComponent, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  togglePasswordVisibility(element: HTMLElement) {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.loginModel = this.loginForm.value;
    this.authenticationService.login(this.loginModel).subscribe((response: TokenModel) => {
      if(response!=null) {
        this.openSuccessfulLoginSnackBar();
        this.router.navigate(['feed']);
      }
      else {
        this.openFailedLoginSnackBar();
      }
    });
  }

  openFailedLoginSnackBar() {
    this.snackBar.openSnackBar('Failed login attempt!','');
  }

  openSuccessfulLoginSnackBar() {
    this.snackBar.openSnackBar('Successful login!','');
  }

  initForm()
  {
    this.loginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required, Validators.email, CustomValidators.WhitespaceInput]),
      'password': new FormControl(null, [Validators.required])
    });
  }

}
