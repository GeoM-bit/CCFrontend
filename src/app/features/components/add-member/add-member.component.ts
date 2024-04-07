import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SupportGroupsService} from "../../../core/services/supportGroups.service";
import {SupportGroupNameDto} from "../../../../models/supportGroupNameDto";
import {SupportGroupMemberModel} from "../../../../models/supportGroupMemberModel";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css'
})
export class AddMemberComponent implements OnInit{
  emails: String[] = [];
  filteredEmails: String[] = [];
  addedMembers: String[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public groupName: String, private supportGroupService: SupportGroupsService, private snackBar: SnackBarComponent) { }

  ngOnInit(): void {
    this.getNonMembers();
    this.filteredEmails = this.emails;
  }

  getNonMembers(){
    let groupNameDto =   new SupportGroupNameDto();
    groupNameDto.GroupName=this.groupName;
    this.supportGroupService.getNonMembersEmails(groupNameDto).subscribe((response: String[]) => {
      response.forEach(x=>this.emails.push(x));
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
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

  isMemberAdded(email: string): boolean {
    return this.addedMembers.includes(email);
  }}
