import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {ProfileInfo} from "../../types/profileInfo";
import {ProfilePhoto} from "../../types/profilePhoto";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../../core/utils/customValidators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  profileInfo: ProfileInfo = new ProfileInfo();
  profilePhotoModel: ProfilePhoto = new ProfilePhoto();
  profileDetailsForm: FormGroup;
  originalProfileInfo: ProfileInfo = new ProfileInfo();
  formChanged: boolean = false;
  constructor(private userService: UserService,
              private snackBar: SnackBarComponent) {
  }

  ngOnInit(): void {
    this.getProfileData();
    this.initProfileDetailsForm();
  }

  getProfileData(){
    this.userService.getProfileInfo().subscribe((response: ProfileInfo) => {
      this.profileInfo = response;
      this.originalProfileInfo = response;
    });
  }

  handleUploadButtonClick() {
    const profilePhotoInput = document.getElementById('profilePhotoInput') as HTMLInputElement;
    profilePhotoInput.click();
  }

  setFileData(event: Event): void {
    const eventTarget: HTMLInputElement | null = event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      const file: File = eventTarget.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.profilePhotoModel.profilePhoto = reader.result as String;
        this.userService.uploadProfilePhoto(this.profilePhotoModel).subscribe((response: boolean) => {
          if (response) {
            this.snackBar.openSnackBar('Poza de profil a fost încărcată cu succes!','');
            this.getProfileData();
          } else {
            this.snackBar.openSnackBar('Poza de profil nu a putut fi încărcată!','');
          }
        });
      });
      reader.readAsDataURL(file);
    }
  }

  removePhoto() {
    this.profilePhotoModel.profilePhoto = null;
    this.userService.uploadProfilePhoto(this.profilePhotoModel).subscribe((response: boolean) => {
      if (response) {
        this.snackBar.openSnackBar('Poza de profil a fost ștearsă cu succes!','');
        this.getProfileData();
      } else {
        this.snackBar.openSnackBar('Poza de profil nu a putut fi ștearsă!','');
      }
    });
  }

  onProfileDetailsSubmit(){

  }

  initProfileDetailsForm(){
    this.profileDetailsForm = new FormGroup({
        'firstName': new FormControl(this.profileInfo.firstName,[Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'lastName': new FormControl(this.profileInfo.lastName, [Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'email': new FormControl(this.profileInfo.email, [Validators.email, CustomValidators.WhitespaceInput]),
        'role': new FormControl(this.profileInfo.role)
      });
  }

  onInputChange(): void {
    console.log(this.profileDetailsForm);
    this.formChanged = true;
  }

  resetForm(): void {
    this.profileDetailsForm.patchValue(this.originalProfileInfo);
    this.formChanged = false;
  }
}
