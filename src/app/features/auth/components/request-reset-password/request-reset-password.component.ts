import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";
import {Router} from "@angular/router";
import {CustomValidators} from "../../../../core/utils/customValidators";
import {ResetPasswordModel} from "../../types/resetPasswordModel";

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrl: './request-reset-password.component.css'
})
export class RequestResetPasswordComponent implements OnInit {
  resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();
  resetPasswordForm: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              private snackBar: SnackBarComponent,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.resetPasswordModel = this.resetPasswordForm.value;
    this.authenticationService.forgotPassword(this.resetPasswordModel).subscribe((response: boolean) => {
      if(response) {
        this.snackBar.openSnackBar('Un email de resetare a parolei a fost trimis!','');
        this.router.navigate(['login']);
      }
      else {
        this.snackBar.openSnackBar('Cererea de resetare a parolei nu a putut fi trimisă!','');
      }
    });
  }

  initForm() {
    this.resetPasswordForm = new FormGroup({
      'email': new FormControl(null,[Validators.required, Validators.email, CustomValidators.WhitespaceInput]),
    });
  }
}
