import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reject-request',
  templateUrl: './reject-request.component.html',
  styleUrl: './reject-request.component.css'
})
export class RejectRequestComponent {
  reasonForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<RejectRequestComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.reasonForm = new FormGroup({
        'reason': new FormControl(null, Validators.required)
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.reasonForm.valid) {
      const formValue = this.reasonForm.get('reason').value;
      this.dialogRef.close(formValue);
    }
  }
}
