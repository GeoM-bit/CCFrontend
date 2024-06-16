import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ManageMembersComponent} from "../manage-members/manage-members.component";
import {CreateSupportGroupComponent} from "../create-support-group/create-support-group.component";
import {NavigationExtras, Router} from "@angular/router";
import {SupportGroupModel} from "../../types/supportGroupModel";
import { ConfirmationDialogComponent } from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";
import {SupportGroupsService} from "../../../../core/services/supportGroups.service";
import {SupportGroupMemberModel} from "../../types/supportGroupMemberModel";
import {Roles} from "../../../../core/enums/roles";
import {SupportGroupName} from "../../types/supportGroupName";

@Component({
  selector: 'app-support-groups-table',
  templateUrl: './support-groups-table.component.html',
  styleUrl: './support-groups-table.component.css'
})

export class SupportGroupsTableComponent implements OnInit{
  displayedColumns: string[] = ['groupName', 'description', 'memberCount', 'action'];
  dataSource= new MatTableDataSource<SupportGroupModel>;
  noGroups= false;
  supportGroupMemberModel: SupportGroupMemberModel = new SupportGroupMemberModel();
  group: SupportGroupName = new SupportGroupName();

  constructor(private supportGroupService: SupportGroupsService,
              private authService: AuthenticationService,
              private snackBar: SnackBarComponent,
              private dialog: MatDialog,
              private router: Router){
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getData();
  }
  getData(){
      this.supportGroupService.getGroups().subscribe((response: SupportGroupModel[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.dataSource.data.length == 0) {
          this.noGroups = true;
        }
      })
    this.noGroups = this.dataSource.data.length == 0 ? true : false;
  }

  joinGroup(groupName: String) {
    this.supportGroupMemberModel.groupName = groupName;
    this.supportGroupMemberModel.email = this.authService.getUserEmail();
    this.supportGroupService.addMember(this.supportGroupMemberModel).subscribe((response: Boolean) => {
      if(response!=null) {
        this.getData();
        this.snackBar.openSnackBar('V-ați alăturat cu succes grupului!','');
      }
      else {
        this.snackBar.openSnackBar('Nu ați putut fi adăugat grupului!','');
      }
    });
  }

  checkRole(): boolean {
    let role = this.authService.getRole();
    return Roles[role] != Roles.User && Roles[role] != Roles.Member;
  }

  onAddMembersClick(groupName: String) {
    const dialogRef: MatDialogRef<ManageMembersComponent> = this.dialog.open(ManageMembersComponent, {
      width: '60%',
      data: groupName
    });
    dialogRef.afterClosed().subscribe(result => {
        this.getData();
    });
  }

  onCreateGroupClick(){
    const dialogRef: MatDialogRef<CreateSupportGroupComponent> = this.dialog.open(CreateSupportGroupComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getData();
      }
    });
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

  deleteGroup(groupName: String) {
    this.group.groupName = groupName;
    this.supportGroupService.deleteGroup(this.group).subscribe((response: Boolean) => {
      if(response) {
        this.getData();
        this.snackBar.openSnackBar('Grupul ' + groupName + ' a fost șters cu succes!','');
      }
      else {
        this.snackBar.openSnackBar('Grupul ' + groupName + ' nu a putut fi șters!','');
      }
    });
  }

  openConfirmationDialog(groupName: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: "Confirmați ștergerea grupului",
        content: "Sunteți sigur/ă că doriți să ștergeți grupul " + groupName + "?<br>Toată postările și activitatea asociate cu acesta vor fi șterse."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteGroup(groupName);
      }
    });
  }

  goToGroup(groupToGo: SupportGroupModel){
    if(groupToGo.isMember) {
      this.router.navigateByUrl('support-group/' + groupToGo.groupName,
        {
          state:
            {
              description: groupToGo.description.toString(),
              members: groupToGo.memberCount.toString()
            }
        });
    }
    else {
      this.snackBar.openSnackBar('Nu sunteți membru al grupului ' + groupToGo.groupName + '!','');
    }
  }
}
