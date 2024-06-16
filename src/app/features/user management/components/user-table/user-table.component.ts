import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from "../../../../core/services/adminService";
import {MatTableDataSource} from "@angular/material/table";
import {TableUser} from "../../types/tableUser";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  ConfirmationDialogComponent
} from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";
import {Roles} from "../../../../core/enums/roles";
import {RejectRequestComponent} from "../../../counseling/components/reject-request/reject-request.component";
import {EditUserComponent} from "../edit-user/edit-user.component";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit{
  noUsers: boolean;
  displayedColumns: string[] = ['Prenume', 'Nume', 'Email', 'EmailConfirmat', 'Rol', 'action'];
  dataSource= new MatTableDataSource<TableUser>;

  constructor(private adminService: AdminService,
              private dialog: MatDialog,
              private snackBar: SnackBarComponent) {
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.adminService.getUsers().subscribe(result =>{
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.dataSource.data.length == 0) {
        this.noUsers = true;
      }
    });
    this.noUsers = this.dataSource.data.length == 0 ? true : false;
  }

  edit(user: TableUser){
    const dialogRef: MatDialogRef<EditUserComponent> = this.dialog.open(EditUserComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        result.initialEmail = user.email;
        result.emailConfirmed = result.emailConfirmed == "true" ? true : false;
        this.adminService.updateUser(result).subscribe(response =>{
          if(response)
          {
            this.snackBar.openSnackBar('Utilizatorul a fost actualizat!','');
            this.getData();
          }
          else
            this.snackBar.openSnackBar('Utilizatorul nu putut fi actualizat!','');
        })
      }
    });
  }
  delete(user : TableUser){
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: "Ștergeți utilizatorul",
        content: "Sunteți sigur/ă că doriți să ștergeți utilizatorul " + user.email + "?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.adminService.deleteUser(user.email).subscribe(result =>{
          if(result)
          {
            this.snackBar.openSnackBar('Utilizatorul a fost șters!','');
            this.getData();
          }
          else
            this.snackBar.openSnackBar('Utilizatorul nu putut fi șters!','');
        })
      }
    });
  }

  protected readonly Roles = Roles;
}
