import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {ProfileInfo} from "../../types/profileInfo";
import {ProfilePhoto} from "../../types/profilePhoto";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmValidParentMatcher, CustomValidators} from "../../../../core/utils/customValidators";
import {ChangePasswordDto} from "../../types/changePasswordDto";
import {UpdateProfileDto} from "../../types/updateProfileDto";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {ConfirmationDialogComponent} from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FavoriteArticle} from "../../types/favoriteArticle";
import {ArticleService} from "../../../../core/services/article.service";
import {UserProfileSupportGroup} from "../../types/userProfileSupportGroup";
import {SupportGroupsService} from "../../../../core/services/supportGroups.service";
import {SupportGroupMemberModel} from "../../../support groups/types/supportGroupMemberModel";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  profileInfo: ProfileInfo = new ProfileInfo();
  profilePhotoModel: ProfilePhoto = new ProfilePhoto();
  profileDetailsForm: FormGroup;
  changePasswordForm: FormGroup;
  originalProfileInfo: ProfileInfo = new ProfileInfo();
  profileDetailsFormChanged: boolean = false;
  hideConfirmationPassword = true;
  hidePassword = true;
  hideOldPassword = true;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  updateProfileDetails: ProfileInfo = new ProfileInfo();
  favoriteArticles: FavoriteArticle[] = [];
  supportGroups: UserProfileSupportGroup[] = [];

  constructor(private userService: UserService,
              private snackBar: SnackBarComponent,
              private router: Router,
              private authService: AuthenticationService,
              private articleService: ArticleService,
              private supportGroupsService: SupportGroupsService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getProfileData();
    this.initChangePasswordForm();
    this.initProfileDetailsForm();
  }

  getProfileData(){
    this.userService.getProfileInfo().subscribe((response: ProfileInfo) => {
      this.profileInfo = response;
      this.originalProfileInfo = response;
    });

    this.articleService.getFavoriteArticles().subscribe((response: FavoriteArticle[]) =>{
      this.favoriteArticles = response;
    });

    this.supportGroupsService.getGroupsForProfile().subscribe((response: UserProfileSupportGroup[]) =>{
      this.supportGroups = response;
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

  initProfileDetailsForm(){
    this.profileDetailsForm = new FormGroup({
        'firstName': new FormControl(null,[Validators.pattern("^[a-zA-Z ]*$")]),
        'lastName': new FormControl(null, [Validators.pattern("^[a-zA-Z ]*$")]),
        'email': new FormControl(null, [Validators.email]),
        'role': new FormControl(null)
      });
  }

  onProfileDetailsInputChange(): void {
    this.profileDetailsFormChanged = true;
  }

  resetForm(): void {
    this.profileDetailsForm.patchValue(this.originalProfileInfo);
    this.profileDetailsFormChanged = false;
  }

  initChangePasswordForm(){
    this.changePasswordForm = new FormGroup({
        'oldPassword': new FormControl(null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#=+';:_,.?!@$%^&*-]).{10,}$")]),
        'password': new FormControl(null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#=+';:_,.?!@$%^&*-]).{10,}$")]),
        'confirmationPassword': new FormControl(null, [Validators.required])
      },
      [CustomValidators.PasswordMatchValidator]);
  }

  onChangePasswordSubmit(){
    let changePasswordDto = new ChangePasswordDto();
    changePasswordDto.newPassword = this.changePasswordForm.get("password").value;
    changePasswordDto.oldPassword = this.changePasswordForm.get("oldPassword").value;
    this.userService.changePassword(changePasswordDto).subscribe((response: boolean) => {
      if(response)
        this.snackBar.openSnackBar('Parola a fost modificată cu succes!','');
      else
        this.snackBar.openSnackBar('Parola nu a putut fi modificată!','');
    });
  }

  onProfileDetailsSubmit(){
    this.updateProfileDetails.firstName = this.profileDetailsForm.get("firstName").value;
    this.updateProfileDetails.lastName = this.profileDetailsForm.get("lastName").value;
    this.updateProfileDetails.email = this.profileDetailsForm.get("email").value;

    if(this.updateProfileDetails.email != null &&
       this.updateProfileDetails.email != undefined) {
      this.openChangeEmailConfirmationDialog();
    }
    else
      this.submitProfileUpdate();
  }

  submitProfileUpdate(){
    this.userService.changeProfileInfo(this.updateProfileDetails).subscribe((response: UpdateProfileDto) => {
      if(response.result && !response.logoutNeeded) {
        this.authService.replaceToken(response.newToken);
        this.snackBar.openSnackBar('Detaliile profilului au fost actualizate!', '');
        this.getProfileData();
      }
      else if(response.result && response.logoutNeeded){
        this.authService.logout();
        this.router.navigate(['login']);
        this.snackBar.openSnackBar('Un mail de confirmare a fost trimis către ' + this.updateProfileDetails.email + '!', '');
      }
      else
        this.snackBar.openSnackBar('Detaliile profilului nu au putut fi actualizate!','');
    });
  }

  openChangeEmailConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: "Confirmați schimbarea adresei de email",
        content: "Sunteți sigur/ă că doriți să modificați adresa de email? <br> " +
          "După confirmare veți fi delogat automat și va trebui să confirmați noua adresă de email pentru a vă autentifica."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitProfileUpdate();
      }
    });
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirmationPassword') {
      this.hideConfirmationPassword = !this.hideConfirmationPassword;
    }
    else if (field === 'oldPassword') {
      this.hideOldPassword = !this.hideOldPassword;
    }
  }

  removeFromFavorites(articleId: String){
    this.articleService.removeArticleFromFavorites(articleId).subscribe( response => {
      if (response) {
        this.snackBar.openSnackBar('Articolul a fost șters din favorite!','');
        this.favoriteArticles = this.favoriteArticles.filter(article => article.id !== articleId);
      } else {
        this.snackBar.openSnackBar('Articolul nu a putut fi șters din favorite!','');
      }
    });
  }

  goToArticle(articleId: String){
    this.router.navigate(['article', articleId]);
  }

  removeSupportGroup(groupName: String){
    this.openLeaveSupportGroupConfirmationDialog(groupName);
  }

  openLeaveSupportGroupConfirmationDialog(groupName: String): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: "Confirmați părăsirea grupului de suport",
        content: "Sunteți sigur/ă că doriți să părăsiți grupul '" + groupName +
          "'?<br>Ulterior părăsirii grupului nu veți mai avea acces la activitatea din cadrul său."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.leaveSupportGroup(groupName);
      }
    });
  }

  leaveSupportGroup(groupName: String){
    let supportGroupMemberModel = new SupportGroupMemberModel();
    supportGroupMemberModel.groupName = groupName;
    supportGroupMemberModel.email = this.profileInfo.email;

    this.supportGroupsService.removeMember(supportGroupMemberModel).subscribe((result => {
      if(result){
        this.supportGroups = this.supportGroups.filter(group => group.groupName !== groupName);
      }
      else
        this.snackBar.openSnackBar('Grupul nu a putut fi părăsit!','');
    }))
  }

  goToGroup(groupName: String){
    this.router.navigate(['support-group', groupName]);
  }
}
