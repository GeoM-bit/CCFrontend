import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {CounselingRequestModel} from "../../features/counseling/types/counselingRequestModel";
import {CounselingRequestDto} from "../../features/counseling/types/counselingRequestDto";
import {CounselingDate} from "../../features/counseling/types/CounselingDate";
import {RejectReason} from "../../features/counseling/types/rejectReason";

@Injectable({
  providedIn: 'root'
})
export class CounselingRequestService {
  constructor(private http: HttpClient) { }

  sendCounselingRequest(counselingRequest: CounselingRequestModel): Observable<boolean>{
    return this.http.post<boolean>(environment.baseUrl + '/api/Counseling/request-counseling', counselingRequest);
  }

  getCounselingRequests(): Observable<CounselingRequestDto[]>{
    return this.http.get<CounselingRequestDto[]>(environment.baseUrl + '/api/Counseling/get-counseling-requests');
  }

  acceptCounselingRequest(requestId: string, counselingDate: CounselingDate): Observable<boolean>{
    return this.http.post<boolean>(environment.baseUrl + '/api/Counseling/accept-counseling-request/' + requestId, counselingDate);
  }
  rejectCounselingRequest(requestId: string, reason: RejectReason): Observable<boolean>{
    return this.http.post<boolean>(environment.baseUrl + '/api/Counseling/reject-counseling-request/' + requestId, reason);
  }
}
