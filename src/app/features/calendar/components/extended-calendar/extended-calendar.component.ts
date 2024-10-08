import {ChangeDetectorRef, Component, OnInit, signal, ViewChild} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import roLocale from '@fullcalendar/core/locales/ro';
import {CalendarService} from "../../../../core/services/calendar.service";
import {CalendarEventDialogComponent} from "../calendar-event-dialog/calendar-event-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NewEventInput} from "../../types/newEventInput";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";
import {ViewCalendarEventDialogComponent} from "../view-calendar-event-dialog/view-calendar-event-dialog.component";
import {EventInputDto} from "../../types/eventInputDto";
import {FullCalendarComponent} from "@fullcalendar/angular";

@Component({
  selector: 'app-extended-calendar',
  templateUrl: './extended-calendar.component.html',
  styleUrl: './extended-calendar.component.css'
})

export class ExtendedCalendarComponent implements OnInit{
  calendarOptions: CalendarOptions;
  initialEvents: EventInput[] = [];
  clickedCalendarEvent : EventInputDto;
  currentEvents = signal<EventApi[]>([]);
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

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
      this.initialEvents = result.map(dto => ({
        id: dto.id,
        title: dto.title,
        start: dto.start,
        end: dto.end,
        extendedProps: {
          eventId: dto.id,
          isOwner: dto.isOwner,
          details: dto.details,
          counselorContact: dto.counselorContact,
          linkMeeting: dto.linkMeeting,
          participantEmails: dto.participantEmails,
          participantsOption: dto.participantsOption,
          selectedGroup: dto.selectedGroup,
        }
      }));
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
        initialEvents: this.initialEvents,
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
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

  onCreateEventClick() {
    const dialogRef: MatDialogRef<CalendarEventDialogComponent> = this.dialog.open(CalendarEventDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let newEvent = new NewEventInput();
        newEvent.title = result.title;
        newEvent.details = result.details;
        newEvent.start = result.startDateTime;
        newEvent.end = result.endDateTime;
        newEvent.participantsOption = result.participantsOption;
        newEvent.selectedGroup = result.selectedGroup;
        newEvent.participantEmails = result.userEmails;
        newEvent.selectedGroupName = result.selectedGroupName;
        this.calendarService.createEvent(newEvent).subscribe((response => {
          if(response){
            const calendarApi = this.calendarComponent.getApi();
            calendarApi.unselect();
            calendarApi.render();
            calendarApi.addEvent({
              id: null,
              title: response.title,
              start: response.start,
              end: response.end,
              extendedProps: {
                eventId: response.id,
                details: response.details,
                isOwner: response.isOwner,
                participantEmails: newEvent.participantEmails,
                participantsOption: newEvent.participantsOption,
                selectedGroup: newEvent.selectedGroupName
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
    this.clickedCalendarEvent = {
      id: clickInfo.event.extendedProps.eventId,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      details: clickInfo.event.extendedProps.details,
      counselorContact: clickInfo.event.extendedProps.counselorContact,
      linkMeeting: clickInfo.event.extendedProps.linkMeeting,
      isOwner: clickInfo.event.extendedProps.isOwner,
      participantEmails: clickInfo.event.extendedProps.participantEmails,
      participantsOption: clickInfo.event.extendedProps.participantsOption,
      selectedGroup: clickInfo.event.extendedProps.selectedGroup,
      selectedGroupName: null
    };
    const dialogRef: MatDialogRef<ViewCalendarEventDialogComponent> = this.dialog.open(ViewCalendarEventDialogComponent, {
      data : this.clickedCalendarEvent
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.calendarService.deleteEvent(result).subscribe((response =>{
          if(response){
            clickInfo.event.remove();
            this.snackBar.openSnackBar('Evenimentul a fost șters!','');
          }
          else
            this.snackBar.openSnackBar('Evenimentul nu a putut fi șters!','');
        }))
      }
    });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }
}
