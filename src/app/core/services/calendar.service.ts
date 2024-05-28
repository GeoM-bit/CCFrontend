import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {NewEventInput} from "../../features/calendar/types/newEventInput";
import {EventInputDto} from "../../features/calendar/types/eventInputDto";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventInputDto[]> {
    return this.http.get<EventInputDto[]>(environment.baseUrl + '/api/Calendar/get-events');
  }

  createEvent(newEventInput: NewEventInput): Observable<EventInputDto>{
    return this.http.post<EventInputDto>(environment.baseUrl + '/api/Calendar/create-calendar-event', newEventInput);
  }

  deleteEvent(id: String): Observable<boolean>{
    return this.http.delete<boolean>(environment.baseUrl + '/api/Calendar/delete-event/' + id);
  }
}
