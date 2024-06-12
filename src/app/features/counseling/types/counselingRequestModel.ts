import {CounselingType} from "./counselingType";
import {DayAvailabilityModel} from "./dayAvailabilityModel";

export class CounselingRequestModel{
  counselingType: CounselingType;
  description: String;
  isPersonal: boolean;
  availability: DayAvailabilityModel[];
}
