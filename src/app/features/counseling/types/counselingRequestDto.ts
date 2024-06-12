import {DayAvailabilityModel} from "./dayAvailabilityModel";
import {RequestStatus} from "./requestStatus";

export class CounselingRequestDto{
  id: String;
  description: String;
  isPersonal: boolean;
  availability: DayAvailabilityModel[];
  requesterEmail: String;
  requesterName: String;
  status: RequestStatus;
}
