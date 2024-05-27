import {ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import roLocale from '@fullcalendar/core/locales/ro';
import {CalendarService} from "../../../../core/services/calendar.service";
import {CalendarEventDialogComponent} from "../calendar-event-dialog/calendar-event-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NewEventInput} from "../../types/newEventInput";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";

@Component({
  selector: 'app-extended-calendar',
  templateUrl: './extended-calendar.component.html',
  styleUrl: './extended-calendar.component.css'
})

export class ExtendedCalendarComponent implements OnInit{
  initialEvents: EventInput[] = [];
  calendarOptions: CalendarOptions;
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef,
              private calendarService: CalendarService,
              private dialog: MatDialog,
              private snackBar: SnackBarComponent) {
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.calendarService.getEvents().subscribe(result => {
      // Update initialEvents with fetched events
      this.initialEvents = result;

      // Update calendarOptions with new events
      this.calendarOptions = {
        plugins: [
          interactionPlugin,
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        initialView: 'dayGridMonth',
        initialEvents: this.initialEvents, // Update initialEvents here
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this),
        locales: [roLocale],
        locale: 'ro',
        validRange: {
          start: new Date().toISOString().split('T')[0]
        },
        eventContent: function (arg) {
          return {
            html: '<span>' + arg.event.extendedProps.details + '</span>'
          };
        }
      };
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const dialogRef = this.dialog.open(CalendarEventDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let newEvent = new NewEventInput();
        newEvent.title = result.title;
        newEvent.details = result.details;
        newEvent.start = result.startDateTime;
        newEvent.end = result.endDateTime;
        newEvent.participantEmails = result.userEmails;
        this.calendarService.createEvent(newEvent).subscribe((response => {
          if(response){
            const calendarApi = selectInfo.view.calendar;
            calendarApi.unselect();
            calendarApi.addEvent({
              id: null,
              title: result.title,
              start: result.startDateTime,
              end: result.endDateTime,
              extendedProps: {
                details: result.details
              }
            });
            this.snackBar.openSnackBar('Evenimentul a fost adăugat!','');
          }
          else
            this.snackBar.openSnackBar('Evenimentul nu a putut fi adăugat!','');
        }))
      }
    });
  }


  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }
}
