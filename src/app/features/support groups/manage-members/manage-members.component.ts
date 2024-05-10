import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SupportGroupsService} from "../../../core/services/supportGroups.service";
import {SupportGroupNameDto} from "../../../../models/supportGroupNameDto";
import {SupportGroupMemberModel} from "../../../../models/supportGroupMemberModel";
import {SnackBarComponent} from "../../common/snack-bar/snack-bar.component";
import {UserService} from "../../../core/services/user.service";

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

  constructor(@Inject(MAT_DIALOG_DATA) public groupName: String, private userService: UserService, private supportGroupService: SupportGroupsService, private snackBar: SnackBarComponent) { }

  ngOnInit(): void {
    this.getEmails();
    this.filteredEmails = this.emails;
  }

  getEmails(){
    let groupNameDto =   new SupportGroupNameDto();
    groupNameDto.GroupName=this.groupName;
    this.userService.getUsersEmails().subscribe((response: String[]) => {
      response.forEach(x=>this.emails.push(x));
    });
    this.supportGroupService.getNonMembersEmails(groupNameDto).subscribe((response: String[]) => {
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
    let member = new SupportGroupMemberModel();
    member.email = email;
    member.groupName = this.groupName;
    this.supportGroupService.addMember(member).subscribe((response: boolean) => {
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
    let member = new SupportGroupMemberModel();
    member.email = email;
    member.groupName = this.groupName;
    this.supportGroupService.removeMember(member).subscribe((response: boolean) => {
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
