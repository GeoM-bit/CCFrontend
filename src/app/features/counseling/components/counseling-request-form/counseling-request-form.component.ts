import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../../core/utils/customValidators";
import {CounselingRequestModel} from "../../types/counselingRequestModel";
import {CounselingRequestService} from "../../../../core/services/counselingRequest.service";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";

@Component({
  selector: 'app-counseling-request-form',
  templateUrl: './counseling-request-form.component.html',
  styleUrl: './counseling-request-form.component.css'
})
export class CounselingRequestFormComponent implements OnInit{
  counselingRequestForm: FormGroup;
  daysOfWeek = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri'];
  hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  counselingRequestModel: CounselingRequestModel = new CounselingRequestModel();

  constructor(private counselingService: CounselingRequestService,
              private snackBar: SnackBarComponent) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.counselingRequestForm = new FormGroup({
      counselingType: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      isPersonal: new FormControl(null, Validators.required),
      availability: new FormArray(this.daysOfWeek.map(day => this.createAvailabilityGroup(day)))
    });
  }

  createAvailabilityGroup(day: string): FormGroup {
    return new FormGroup({
      day: new FormControl(day),
      startHour: new FormControl(null),
      endHour: new FormControl(null)
    },CustomValidators.StartOrEndHourValidator);
  }

  get availability() {
    return this.counselingRequestForm.get('availability') as FormArray;
  }

  onSubmit() {
    this.counselingRequestModel = this.counselingRequestForm.value;
    this.counselingRequestModel.isPersonal = this.counselingRequestForm.controls['isPersonal'].value === 'true' ? true : false;
    console.log(this.counselingRequestModel);
    this.counselingService.sendCounselingRequest(this.counselingRequestModel).subscribe((result=>{
      if(result){
        this.snackBar.openSnackBar("Solicitarea a fost trimisă! În curând veți fi contactat de un consilier.", '');
        this.counselingRequestForm.reset();
      }
      else{
        this.snackBar.openSnackBar("Solicitarea nu a putut fi trimisă!", '');
      }
    }));
  }

}
