import {Component, OnInit, ViewChild} from '@angular/core';
import {CounselingRequestService} from "../../../../core/services/counselingRequest.service";
import {CounselingRequestDto} from "../../types/counselingRequestDto";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AcceptRequestComponent} from "../accept-request/accept-request.component";
import {CounselingDate} from "../../types/CounselingDate";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";
import {RequestStatus} from "../../types/requestStatus";
import {RejectRequestComponent} from "../reject-request/reject-request.component";
import {RejectReason} from "../../types/rejectReason";

@Component({
  selector: 'app-counseling-requests-table',
  templateUrl: './counseling-requests-table.component.html',
  styleUrl: './counseling-requests-table.component.css'
})
export class CounselingRequestsTableComponent implements OnInit{
  noRequests: boolean;
  displayedColumns: string[] = ['requesterEmail', 'requesterName', 'description', 'isPersonal', 'availability', 'status', 'action'];
  dataSource= new MatTableDataSource<CounselingRequestDto>;
  constructor(private counselingService: CounselingRequestService,
              private dialog: MatDialog,
              private snackBar: SnackBarComponent) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
   this.getData();
  }

  getData(){
    this.counselingService.getCounselingRequests().subscribe((response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.dataSource.data.length == 0) {
        this.noRequests = true;
      }
    }));
    this.noRequests = this.dataSource.data.length == 0 ? true : false;
  }

  onReject(request: CounselingRequestDto){
    const dialogRef: MatDialogRef<RejectRequestComponent> = this.dialog.open(RejectRequestComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let res = new RejectReason();
        res.reason = result;
        this.counselingService.rejectCounselingRequest(request.id.toString(), res).subscribe(res =>{
          if(res)
          {
            this.snackBar.openSnackBar('Cererea a fost refuzată!','');
            this.getData();
          }
          else
            this.snackBar.openSnackBar('Cererea nu a putut fi refuzată!','');
        });
      }
    });
  }

  onAccept(request: CounselingRequestDto){
    const dialogRef: MatDialogRef<AcceptRequestComponent> = this.dialog.open(AcceptRequestComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let counselingDate = new CounselingDate();
        counselingDate.startTime = new Date(result);
        counselingDate.endTime = new Date(result);
        counselingDate.endTime.setHours(counselingDate.endTime.getHours() + 1);
        this.counselingService.acceptCounselingRequest(request.id.toString(), counselingDate).subscribe(res =>{
          if(res)
          {
            this.snackBar.openSnackBar('Cererea a fost preluată cu succes!','');
            this.getData();
          }
          else
            this.snackBar.openSnackBar('Cererea nu a putut fi preluată!','');
        });
      }
    });
  }

  isNotProcessed(element: CounselingRequestDto): boolean {
    return element.status === RequestStatus.Nepreluată;
  }
}
