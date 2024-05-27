import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../core/services/user.service";
import {
  ConfirmValidDateMatcherCalendarEvent,
  CustomValidators,
  MissingDateMatcherCalendarEvent
} from "../../../../core/utils/customValidators";

@Component({
  selector: 'app-calendar-event-dialog',
  templateUrl: './calendar-event-dialog.component.html',
  styleUrl: './calendar-event-dialog.component.css'
})
export class CalendarEventDialogComponent implements OnInit{
  eventForm: FormGroup;
  selectedEmails: String[] = [];
  filteredEmails: String[] = [];
  emails: String[] = [];
  confirmValidDateMatcherCalendarEvent = new ConfirmValidDateMatcherCalendarEvent();
  missingDateMatcherCalendarEvent = new MissingDateMatcherCalendarEvent();
  dateFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date ? date >= today : false;
  };

  constructor( public dialogRef: MatDialogRef<CalendarEventDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private userService: UserService) {}

  ngOnInit(): void {
    this.getEmails();
    this.filteredEmails = this.emails;
    this.initForm();
  }

  getEmails(){
    this.userService.getUsersEmails().subscribe((response: String[]) => {
      response.forEach(x=>this.emails.push(x));
    });
  }

  initForm(){
    this.eventForm = new FormGroup({
      'title': new FormControl(null,[Validators.required]),
      'details': new FormControl(null),
      'startDateTime': new FormControl(null, [Validators.required]),
      'endDateTime': new FormControl(null, [Validators.required]),
      'userEmails': new FormControl(null)
    },
      [CustomValidators.dateValidator]
    );
  }

  toggleSelectedEmail(email: string, isChecked: boolean) {
    if (isChecked && !this.selectedEmails.includes(email)) {
      this.selectedEmails.push(email);
    } else if (!isChecked && this.selectedEmails.includes(email)) {
      const index = this.selectedEmails.indexOf(email);
      this.selectedEmails.splice(index, 1);
    }
  }

  removeSelectedEmail(email: string) {
    const index = this.selectedEmails.indexOf(email);
    if (index !== -1) {
      this.selectedEmails.splice(index, 1);
    }
    const checkbox = document.querySelector(`[value="${email}"]`) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.filteredEmails = this.emails.filter(email =>
      email.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.eventForm.valid) {
      this.eventForm.get("userEmails").setValue(this.selectedEmails);
      const formValue = this.eventForm.value;
      this.dialogRef.close(formValue);
    }
  }
}
