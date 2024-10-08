import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ConfirmValidDateMatcherCalendarEvent, CustomValidators} from "../../../../core/utils/customValidators";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-accept-request',
  templateUrl: './accept-request.component.html',
  styleUrl: './accept-request.component.css'
})
export class AcceptRequestComponent implements OnInit{
  dateFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date ? date >= today : false;
  };
  confirmValidDateMatcherCalendarEvent = new ConfirmValidDateMatcherCalendarEvent();
  dateForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AcceptRequestComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.dateForm = new FormGroup({
        'startDateTime': new FormControl(null, [Validators.required])
      },
      [CustomValidators.StartDateValidator]
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.dateForm.valid) {
      const formValue = this.dateForm.get('startDateTime').value;
      this.dialogRef.close(formValue);
    }
  }
}
