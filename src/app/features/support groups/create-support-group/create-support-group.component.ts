import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../core/utils/customValidators";
import {UserService} from "../../../core/services/user.service";
import {NewSupportGroupModel} from "../../../../models/newSupportGroupModel";
import {SupportGroupsService} from "../../../core/services/supportGroups.service";
import {MatDialog} from "@angular/material/dialog";
import {SnackBarComponent} from "../../common/snack-bar/snack-bar.component";

@Component({
  selector: 'app-create-support-group',
  templateUrl: './create-support-group.component.html',
  styleUrl: './create-support-group.component.css'
})
export class CreateSupportGroupComponent implements OnInit{
  createGroupForm: FormGroup;
  selectedEmails: String[] = [];
  filteredEmails: String[] = [];
  emails: String[] = [];
  supportGroupModel = new NewSupportGroupModel();

  constructor(private userService: UserService, private supportGroupsService: SupportGroupsService, private dialog: MatDialog, private snackBar: SnackBarComponent) {
  }

  ngOnInit(): void {
    this.getEmails();
    this.filteredEmails = this.emails;
    this.initForm();
  }

  getEmails(){
    this.userService.getUsersEmails().subscribe((response: String[]) => {
      response.forEach(x=>this.emails.push(x));
    });
  }

  initForm() {
    this.createGroupForm = new FormGroup({
      'groupName': new FormControl(null,[Validators.required, CustomValidators.WhitespaceInput]),
      'description': new FormControl(null, [Validators.required, CustomValidators.SummaryLengthValidator, CustomValidators.WhitespaceInput]),
      'userEmails': new FormControl(null)
    });
  }

  toggleSelectedEmail(email: string, isChecked: boolean) {
    if (isChecked && !this.selectedEmails.includes(email)) {
      this.selectedEmails.push(email);
    } else if (!isChecked && this.selectedEmails.includes(email)) {
      const index = this.selectedEmails.indexOf(email);
      this.selectedEmails.splice(index, 1);
    }
  }

  removeSelectedEmail(email: string) {
    const index = this.selectedEmails.indexOf(email);
    if (index !== -1) {
      this.selectedEmails.splice(index, 1);
    }
    const checkbox = document.querySelector(`[value="${email}"]`) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.filteredEmails = this.emails.filter(email =>
      email.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  onSubmit(){
    if(!this.createGroupForm.invalid) {
      this.supportGroupModel = this.createGroupForm.value;
      this.supportGroupModel.userEmails = this.selectedEmails;
      this.supportGroupsService.createGroup(this.supportGroupModel).subscribe((response: boolean) => {
        if (response) {
          this.dialog.closeAll();
          this.snackBar.openSnackBar('Grupul ' + this.supportGroupModel.groupName + ' a fost creat!','');
        } else {
          this.snackBar.openSnackBar('Grupul ' + this.supportGroupModel.groupName + ' nu a putut fi creat!','');
        }
      });
    }
  }
}
