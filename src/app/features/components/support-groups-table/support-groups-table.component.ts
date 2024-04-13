import {Component, OnInit, ViewChild} from '@angular/core';
import {SupportGroupsService} from "../../../core/services/supportGroups.service";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {SupportGroupDto} from "../../../../models/supportGroupDto";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SupportGroupMemberModel} from "../../../../models/supportGroupMemberModel";
import {Roles} from "../../../core/enums/roles";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddMemberComponent} from "../add-member/add-member.component";
import {CreateSupportGroupComponent} from "../create-support-group/create-support-group.component";

@Component({
  selector: 'app-support-groups-table',
  templateUrl: './support-groups-table.component.html',
  styleUrl: './support-groups-table.component.css'
})
export class SupportGroupsTableComponent implements OnInit{
  displayedColumns: string[] = ['groupName', 'description', 'memberCount', 'action'];
  dataSource= new MatTableDataSource<SupportGroupDto>;
  noGroups=false;
  supportGroupMemberModel = new SupportGroupMemberModel();
  constructor(private supportGroupService: SupportGroupsService, private authService: AuthenticationService, private snackBar: SnackBarComponent, private dialog: MatDialog){
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getData();
  }
  getData(){
      this.supportGroupService.getGroups().subscribe((response: SupportGroupDto[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
        if(this.dataSource.data.length==0) {
          this.noGroups = true;
        }
      })
    this.noGroups = this.dataSource.data.length==0 ? true:false;
  }

  joinGroup(groupName: String) {
    this.supportGroupMemberModel.groupName = groupName;
    this.supportGroupMemberModel.email = this.authService.getUserEmail();
    this.supportGroupService.addMember(this.supportGroupMemberModel).subscribe((response: Boolean) => {
      if(response!=null) {
        this.getData();
        this.openSuccessfullyJoinedGroupSnackBar();
      }
      else {
        this.openFailedToJoinGroupSnackBar();
      }
    });
  }

  checkRole(): boolean {
    let role = this.authService.getRole();
    return Roles[role] != Roles.User && Roles[role] != Roles.Member;
  }

  openSuccessfullyJoinedGroupSnackBar() {
    this.snackBar.openSnackBar('V-ați alăturat cu succes grupului!','');
  }
  openFailedToJoinGroupSnackBar(){
    this.snackBar.openSnackBar('Nu ați putut fi adăugat grupului!','');
  }

  onAddMembersClick(groupName: String) {
    const dialogRef: MatDialogRef<AddMemberComponent> = this.dialog.open(AddMemberComponent, {
      width: '60%',
      data: groupName
    });
    dialogRef.afterClosed().subscribe(result => {
        this.getData();
    });
  }

  onCreateGroupClick(){
    this.dialog.open(CreateSupportGroupComponent);
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearSearchInput(input: HTMLInputElement) {
    input.value = '';
    this.dataSource.filter = '';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
