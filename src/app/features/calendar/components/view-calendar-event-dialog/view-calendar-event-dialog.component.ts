import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EventInputDto} from "../../types/eventInputDto";

@Component({
  selector: 'app-view-calendar-event-dialog',
  templateUrl: './view-calendar-event-dialog.component.html',
  styleUrl: './view-calendar-event-dialog.component.css'
})
export class ViewCalendarEventDialogComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<ViewCalendarEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public calendarEvent: EventInputDto) {
  }

  ngOnInit(): void {
  }

  deleteEvent(){
    this.dialogRef.close(this.calendarEvent.id);
  }
}
