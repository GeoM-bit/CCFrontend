import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {ProfileInfo} from "../../types/profileInfo";
import {ProfilePhoto} from "../../types/profilePhoto";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  profileInfo: ProfileInfo = new ProfileInfo();
  profilePhotoModel: ProfilePhoto = new ProfilePhoto();
  constructor(private userService: UserService,
              private snackBar: SnackBarComponent) {
  }

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData(){
    this.userService.getProfileInfo().subscribe((response: ProfileInfo) => {
      this.profileInfo = response;
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
}
