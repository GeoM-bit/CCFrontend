import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../core/services/user.service";
import {
  ConfirmValidDateMatcherCalendarEvent,
  CustomValidators,
  MissingDateMatcherCalendarEvent
} from "../../../../core/utils/customValidators";
import {SupportGroupName} from "../../../support groups/types/supportGroupName";
import {SupportGroupsService} from "../../../../core/services/supportGroups.service";

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
  groups: SupportGroupName[] = [];
  dateFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date ? date >= today : false;
  };

  constructor( public dialogRef: MatDialogRef<CalendarEventDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private userService: UserService,
               private supportGroupService: SupportGroupsService) {}

  ngOnInit(): void {
    this.getEmails();
    this.getGroups();
    this.initForm();
  }

  getEmails(){
    this.userService.getUsersEmails().subscribe((response: String[]) => {
      this.emails = response;
      this.filteredEmails = this.emails;
    });
  }

  getGroups(){
    this.supportGroupService.getGroupNames().subscribe(response => {
      this.groups = response;
    });
  }

  initForm(){
    this.eventForm = new FormGroup({
      'title': new FormControl(null,[Validators.required]),
      'details': new FormControl(null),
      'startDateTime': new FormControl(null, [Validators.required]),
      'endDateTime': new FormControl(null, [Validators.required]),
      'userEmails': new FormControl(null),
      'participantsOption': new FormControl('emails'),
      'selectedGroup': new FormControl(null),
      'selectedGroupName': new FormControl(null),
      },
      [CustomValidators.DateValidator]
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
      if(this.eventForm.get("participantsOption").value === 'emails')
        this.eventForm.get("userEmails").setValue(this.selectedEmails);
      if(this.eventForm.get("participantsOption").value === 'groups'){
        let groupId= this.eventForm.get("selectedGroup").value;
        let groupName =  this.groups.find(g => g.id === groupId).groupName;
        this.eventForm.get("selectedGroupName").setValue(groupName);
      }

      const formValue = this.eventForm.value;
      this.dialogRef.close(formValue);
    }
  }
}
