import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserService} from "../../../../core/services/user.service";
import {SupportGroupsService} from "../../../../core/services/supportGroups.service";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";
import {SupportGroupName} from "../../types/supportGroupName";
import {SupportGroupMemberModel} from "../../types/supportGroupMemberModel";

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrl: './manage-members.component.css'
})
export class ManageMembersComponent implements OnInit{
  emails: String[] = [];
  filteredEmails: String[] = [];
  addedMembers: String[] = [];
  nonMembers: String[] = [];
  supportGroupName: SupportGroupName = new SupportGroupName();
  member : SupportGroupMemberModel = new SupportGroupMemberModel();

  constructor(@Inject(MAT_DIALOG_DATA) public groupName: String,
              private userService: UserService,
              private supportGroupService: SupportGroupsService,
              private snackBar: SnackBarComponent) { }

  ngOnInit(): void {
    this.getEmails();
    this.filteredEmails = this.emails;
  }

  getEmails(){
    this.supportGroupName.groupName=this.groupName;
    this.userService.getUsersEmails().subscribe((response: String[]) => {
      response.forEach(x=>this.emails.push(x));
    });
    this.supportGroupService.getNonMembersEmails(this.supportGroupName).subscribe((response: String[]) => {
      response.forEach(x=>this.nonMembers.push(x));
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.filteredEmails = this.emails.filter(email =>
      email.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  clearSearchInput(input: HTMLInputElement) {
    input.value = '';
    const filterValue = '';
    this.filteredEmails = this.emails.filter(email =>
      email.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  addMember(email: string) {
    this.member.email = email;
    this.member.groupName = this.groupName;
    this.supportGroupService.addMember(this.member).subscribe((response: boolean) => {
      if(response) {
        this.addedMembers.push(email);
        this.snackBar.openSnackBar(email + ' a fost adăugat cu succes!','');
      }
      else {
        this.snackBar.openSnackBar(email + ' nu a putut fi adăugat!','');
      }
    });
  }

  removeMember(email: string) {
    this.member.email = email;
    this.member.groupName = this.groupName;
    this.supportGroupService.removeMember(this.member).subscribe((response: boolean) => {
      if(response) {
        this.addedMembers = this.addedMembers.filter(e => e !== email);
        this.nonMembers.push(email);
        this.snackBar.openSnackBar(email + ' a fost șters cu succes!','');
      }
      else {
        this.snackBar.openSnackBar(email + ' nu a putut fi șters!','');
      }
    });
    this.getEmails();
  }

  isMemberAdded(email: string): boolean {
    return this.addedMembers.includes(email) || !this.nonMembers.includes(email);
  }}
