import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TableUser} from "../../types/tableUser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../../core/utils/customValidators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  editForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public user: TableUser,
              public dialogRef: MatDialogRef<EditUserComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.editForm = new FormGroup({
        'id': new FormControl(this.user.id),
        'firstName': new FormControl(this.user.firstName, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'lastName': new FormControl(this.user.lastName, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
        'emailConfirmed': new FormControl(this.user.emailConfirmed, [Validators.required]),
        'role': new FormControl(this.user.role, [Validators.required])
      });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }
}
