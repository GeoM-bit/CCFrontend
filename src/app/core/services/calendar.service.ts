import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {EventInput} from "@fullcalendar/core";
import {NewEventInput} from "../../features/calendar/types/newEventInput";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventInput[]> {
    return this.http.get<EventInput[]>(environment.baseUrl + '/api/Calendar/get-events');
  }

  createEvent(newEventInput: NewEventInput): Observable<boolean>{
    return this.http.post<boolean>(environment.baseUrl + '/api/Calendar/create-calendar-event', newEventInput);
  }

  deleteEvent(id: String): Observable<boolean>{
    return this.http.delete<boolean>(environment.baseUrl + '/api/Calendar/delete-event/' + id);
  }
}
